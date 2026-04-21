import { useState, useEffect } from 'react';

const VideoCard = ({ data, type = 'video' }) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    setProgress(0);
    setStatus('Preparing download...');

    const jobId = crypto.randomUUID();
    const baseUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';
    
    const eventSource = new EventSource(`${baseUrl}/api/progress?jobId=${jobId}`);
    
    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.status === 'connected') return;
      
      if (parsedData.status === 'error') {
        setStatus('Error occurred');
        setDownloading(false);
        eventSource.close();
        return;
      }

      if (parsedData.status === 'done') {
        setStatus('Finished!');
        setProgress(100);
        setTimeout(() => {
          setDownloading(false);
          setProgress(0);
          setStatus('');
        }, 3000);
        eventSource.close();
        return;
      }
      
      setStatus(parsedData.status);
      if (parsedData.progress !== undefined) {
        setProgress(parsedData.progress);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setDownloading(false);
      setStatus('Connection lost');
    };

    try {
      const downloadUrl = `${baseUrl}/api/download?url=${encodeURIComponent(data.originalUrl)}&type=${type}&jobId=${jobId}`;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = type === 'audio' ? 'audio.mp3' : 'video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed', error);
      setStatus('Failed to start');
      setDownloading(false);
      eventSource.close();
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'Unknown';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-card">
      <div className="video-info">
        {data.thumbnail && (
          <img src={data.thumbnail} alt="Video Thumbnail" className="video-thumbnail" />
        )}
        <div className="video-details">
          <h2 className="video-title">{data.title || 'Video found'}</h2>
          <div className="video-meta">
            {data.extractor && <span className="badge">{data.extractor}</span>}
            {data.duration && <span>{formatDuration(data.duration)}</span>}
          </div>
          
          <div className="action-buttons">
            <button className="btn" onClick={handleDownload} disabled={downloading}>
              {downloading ? 'Processing...' : (type === 'audio' ? 'Download MP3' : 'Download MP4')}
            </button>
            <a href={data.originalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Open Original
            </a>
          </div>

          {downloading && (
            <div className="progress-container">
              <div className="progress-header">
                <span className="progress-status">{status}</span>
                <span className="progress-percent">{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
