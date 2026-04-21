const express = require('express');
const cors = require('cors');
const path = require('path');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const crypto = require('crypto');
const os = require('os');
const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// SSE Progress Mapping
const progressClients = new Map();

const sendProgress = (jobId, data) => {
  const client = progressClients.get(jobId);
  if (client) {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
    if (data.status === 'done' || data.status === 'error') {
      client.end();
      progressClients.delete(jobId);
    }
  }
};

app.get('/api/progress', (req, res) => {
  const { jobId } = req.query;
  if (!jobId) return res.status(400).end();

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  progressClients.set(jobId, res);
  // Send initial connection ACK
  res.write(`data: ${JSON.stringify({ status: 'connected' })}\n\n`);

  req.on('close', () => {
    progressClients.delete(jobId);
  });
});

// Helper to monitor yt-dlp progress logs
const monitorProgress = (subprocess, jobId, stepName = 'Downloading') => {
  if (!jobId) return;
  const regex = /\[download\]\s+(\d+\.\d+)%/;
  
  subprocess.stderr.on('data', (data) => {
    const output = data.toString();
    const match = output.match(regex);
    if (match) {
      sendProgress(jobId, { status: stepName, progress: parseFloat(match[1]) });
    }
  });

  // some builds output to stdout instead
  subprocess.stdout.on('data', (data) => {
    const output = data.toString();
    const match = output.match(regex);
    if (match) {
      sendProgress(jobId, { status: stepName, progress: parseFloat(match[1]) });
    }
  });
};

// Helper to clean up temp files
const cleanUpTempFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      console.error(`Failed to delete temp file ${filePath}`, e);
    }
  }
};

app.get('/api/video-info', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const output = await youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com']
    });
    
    res.json({
      title: output.title,
      thumbnail: output.thumbnail,
      duration: output.duration,
      extractor: output.extractor,
      formats: output.formats,
      subtitles: output.subtitles || {}
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video information' });
  }
});

app.get('/api/download', async (req, res) => {
  const { url, type, jobId } = req.query;
  if (!url) return res.status(400).send('URL is required');

  if (type === 'audio') {
    const tempId = crypto.randomUUID();
    const tempFile = path.join(os.tmpdir(), `${tempId}.mp3`);
    try {
      const subprocess = youtubedl.exec(url, {
        o: path.join(os.tmpdir(), `${tempId}.%(ext)s`),
        x: true,
        audioFormat: 'mp3',
        noCheckCertificates: true,
        noWarnings: true
      });
      
      monitorProgress(subprocess, jobId, 'Extracting Audio');
      
      subprocess.on('close', (code) => {
        if (code === 0) {
          sendProgress(jobId, { status: 'done', progress: 100 });
          res.download(tempFile, 'audio.mp3', () => cleanUpTempFile(tempFile));
        } else {
          sendProgress(jobId, { status: 'error' });
          cleanUpTempFile(tempFile);
          if (!res.headersSent) res.status(500).send('Extraction failed');
        }
      });
    } catch (err) {
      sendProgress(jobId, { status: 'error' });
      cleanUpTempFile(tempFile);
      if (!res.headersSent) res.status(500).send('Audio extraction failed');
    }
    return;
  }

  // Regular Video Download
  res.header('Content-Disposition', 'attachment; filename="downloaded_video.mp4"');
  res.header('Content-Type', 'video/mp4');
  try {
    const subprocess = youtubedl.exec(url, {
      o: '-', 
      f: 'best',
      noCheckCertificates: true,
      noWarnings: true,
      addHeader: ['referer:youtube.com']
    });
    
    monitorProgress(subprocess, jobId, 'Downloading Video');
    
    subprocess.on('close', () => {
      sendProgress(jobId, { status: 'done', progress: 100 });
    });

    subprocess.stdout.pipe(res);
  } catch (error) {
    sendProgress(jobId, { status: 'error' });
    if (!res.headersSent) res.status(500).send('Download failed');
  }
});

app.get('/api/download-image', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL required' });
  
  try {
    const response = await axios({ method: 'GET', url: url, responseType: 'stream' });
    res.header('Content-Disposition', 'attachment; filename="thumbnail.jpg"');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download image' });
  }
});

app.get('/api/download-gif', async (req, res) => {
  const { url, start = 0, duration = 5, jobId } = req.query;
  if (!url) return res.status(400).send('URL is required');

  const tempId = crypto.randomUUID();
  const tempVid = path.join(os.tmpdir(), `${tempId}.mp4`);
  const tempGif = path.join(os.tmpdir(), `${tempId}.gif`);

  try {
    // 1. Download video first
    const subprocess = youtubedl.exec(url, { o: tempVid, f: 'best', noWarnings: true });
    monitorProgress(subprocess, jobId, 'Downloading Video (Step 1/2)');
    
    subprocess.on('close', (code) => {
      if (code !== 0) {
         sendProgress(jobId, { status: 'error' });
         return res.status(500).send('Video download failed');
      }
      
      sendProgress(jobId, { status: 'Converting GIF (Step 2/2)', progress: 0 });

      // 2. Convert to GIF using ffmpeg
      ffmpeg(tempVid)
        .setStartTime(start)
        .setDuration(duration)
        .size('480x?')
        .output(tempGif)
        .on('progress', (progress) => {
          // progress.percent is sometimes provided by fluent-ffmpeg, otherwise fake it
          let p = progress.percent ? Math.min(Math.floor(progress.percent), 99) : 50;
          sendProgress(jobId, { status: 'Converting GIF (Step 2/2)', progress: p });
        })
        .on('end', () => {
          sendProgress(jobId, { status: 'done', progress: 100 });
          res.download(tempGif, 'animated.gif', () => {
            cleanUpTempFile(tempVid);
            cleanUpTempFile(tempGif);
          });
        })
        .on('error', (err) => {
          console.error(err);
          cleanUpTempFile(tempVid);
          cleanUpTempFile(tempGif);
          sendProgress(jobId, { status: 'error' });
          res.status(500).send('GIF conversion failed');
        })
        .run();
    });
  } catch (err) {
    cleanUpTempFile(tempVid);
    sendProgress(jobId, { status: 'error' });
    if (!res.headersSent) res.status(500).send('Failed to prepare GIF');
  }
});

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use((req, res) => { res.sendFile(path.join(__dirname, '../client/dist/index.html')); });
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
