import { useState } from 'react';
import VideoCard from './components/VideoCard';
import './index.css';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState('');

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
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch video');
      }
      
      setVideoData({
        ...data,
        originalUrl: url
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>ISFVD Downloader</h1>
        <p className="subtitle">Download videos without watermarks from TikTok, Instagram, Facebook, and more.</p>
      </header>

      <form className="search-box" onSubmit={fetchVideoInfo}>
        <input 
          type="url" 
          className="search-input" 
          placeholder="Paste your video link here..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? (
            <>
              <div className="loader"></div>
              <span>Searching...</span>
            </>
          ) : (
            'Get Video'
          )}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {videoData && (
        <VideoCard data={videoData} />
      )}
    </div>
  );
}

export default App;
