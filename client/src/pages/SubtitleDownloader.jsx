import { useState } from 'react';

const SubtitleDownloader = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [subtitles, setSubtitles] = useState({});
  const [error, setError] = useState('');

  const fetchVideoInfo = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError('');
    setSubtitles({});

    try {
      const baseUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';
      const response = await fetch(`${baseUrl}/api/video-info?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch video');
      
      if (!data.subtitles || Object.keys(data.subtitles).length === 0) {
        throw new Error('No subtitles found for this video.');
      }
      
      setSubtitles(data.subtitles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadSubtitle = (lang, subData) => {
    // subData is usually an array of formats. We'll grab the first one that is json3 or srv1, or let user download the json.
    // For simplicity, yt-dlp usually provides URLs to the sub format.
    const bestSub = subData.find(s => s.ext === 'srt' || s.ext === 'vtt') || subData[0];
    if (bestSub && bestSub.url) {
      window.open(bestSub.url, '_blank');
    } else {
      alert('Could not find a direct download link for this subtitle format.');
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Subtitle Downloader</h1>
        <p className="subtitle">Download captions and subtitles natively.</p>
      </header>

      <form className="search-box" onSubmit={fetchVideoInfo}>
        <input 
          type="url" 
          className="search-input" 
          placeholder="Paste video link here..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Searching...' : 'Find Subs'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {Object.keys(subtitles).length > 0 && (
        <div className="result-card" style={{marginTop: '2rem', background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px'}}>
          <h2 style={{marginBottom: '1rem'}}>Available Subtitles</h2>
          <div className="subtitle-grid" style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
            {Object.entries(subtitles).map(([lang, formatData]) => (
              <button key={lang} className="btn btn-secondary" onClick={() => downloadSubtitle(lang, formatData)}>
                {lang.toUpperCase()} Subtitles
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubtitleDownloader;
