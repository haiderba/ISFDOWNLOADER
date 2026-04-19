import { useState } from 'react';

const VideoCard = ({ data }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const baseUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';
      const downloadUrl = `${baseUrl}/api/download?url=${encodeURIComponent(data.originalUrl)}`;
      
      // Trigger native download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Download failed', error);
      alert('Failed to start download. Please try again.');
    } finally {
      setDownloading(false);
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
              {downloading ? 'Starting...' : 'Download MP4'}
            </button>
            <a href={data.originalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Open Original
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
