import { useState } from 'react';

const ThumbnailGrabber = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  const fetchVideoInfo = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError('');
    setVideoData(null);

    try {
      const baseUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';
      const response = await fetch(`${baseUrl}/api/video-info?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch video');
      setVideoData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!videoData?.thumbnail) return;
    setDownloading(true);
    const baseUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';
    const downloadUrl = `${baseUrl}/api/download-image?url=${encodeURIComponent(videoData.thumbnail)}`;
    
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'thumbnail.jpg';
    a.click();
    setDownloading(false);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Thumbnail Grabber</h1>
        <p className="subtitle">Download high-res thumbnails safely.</p>
      </header>

      <form className="search-box" onSubmit={fetchVideoInfo}>
        <input 
          type="url" 
          className="search-input" 
          placeholder="Paste video/profile link here..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Searching...' : 'Get Thumbnail'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {videoData && videoData.thumbnail && (
        <div className="video-card result-card">
          <img src={videoData.thumbnail} alt="Thumbnail Preview" className="full-thumbnail" />
          <div className="action-buttons">
            <button className="btn" onClick={handleDownload} disabled={downloading}>
              {downloading ? 'Downloading...' : 'Download Image'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailGrabber;
