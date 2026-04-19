const express = require('express');
const cors = require('cors');
const path = require('path');
const youtubedl = require('youtube-dl-exec');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/video-info', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log(`Fetching info for: ${url}`);
    const output = await youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      ]
    });
    
    res.json({
      title: output.title,
      thumbnail: output.thumbnail,
      duration: output.duration,
      extractor: output.extractor,
      formats: output.formats
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: 'Failed to fetch video information', details: error.message });
  }
});

app.get('/api/download', (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  res.header('Content-Disposition', 'attachment; filename="downloaded_video.mp4"');
  res.header('Content-Type', 'video/mp4');
  
  try {
    console.log(`Starting download for: ${url}`);
    const subprocess = youtubedl.exec(url, {
      o: '-', // output to stdout
      f: 'best', // For broad compatibility across TikTok/IG/Facebook, selecting best single file format is often safer than merging for stdout streaming
      noCheckCertificates: true,
      noWarnings: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      ]
    });

    subprocess.stdout.pipe(res);
    
    subprocess.stderr.on('data', (data) => {
      console.error(`yt-dlp stderr: ${data}`);
    });
  } catch (error) {
    console.error('Error downloading video:', error);
    if (!res.headersSent) {
      res.status(500).send('Download failed');
    }
  }
});

// Serve frontend in production environments
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all for React router (compatible with Express 5)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
