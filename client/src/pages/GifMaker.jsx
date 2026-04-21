import { useState } from 'react';

const GifMaker = () => {
  const [url, setUrl] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const handleMakeGif = async (e) => {
    e.preventDefault();
    if (!url || loading) return;
    
    setLoading(true);
    setError('');
    setProgress(0);
    setStatus('Preparing GIF...');

    const jobId = crypto.randomUUID();
    const baseUrl = import.meta.env.DEV ? 'http://localhost:3001' : '';
    
    const eventSource = new EventSource(`${baseUrl}/api/progress?jobId=${jobId}`);
    
    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.status === 'connected') return;
      
      if (parsedData.status === 'error') {
        setStatus('Error occurred');
        setLoading(false);
        eventSource.close();
        return;
      }

      if (parsedData.status === 'done') {
        setStatus('GIF Ready!');
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
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
      setLoading(false);
      setStatus('Connection lost');
    };

    try {
      const downloadUrl = `${baseUrl}/api/download-gif?url=${encodeURIComponent(url)}&start=${startTime}&duration=${duration}&jobId=${jobId}`;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'animated.gif';
      a.click();
    } catch (err) {
      setError('Failed to request GIF creation.');
      setLoading(false);
      eventSource.close();
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Video to GIF Maker</h1>
        <p className="subtitle">Convert any short segment of a video into a GIF.</p>
      </header>

      <form className="search-box" style={{flexDirection: 'column', borderRadius: '24px', padding: '1.5rem'}} onSubmit={handleMakeGif}>
        <input 
          type="url" 
          className="search-input" 
          placeholder="Paste video link here..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{width: '100%', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)'}}
        />
        <div style={{display: 'flex', gap: '1rem', width: '100%', marginBottom: '1rem'}}>
          <div style={{flex: 1}}>
            <label style={{display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#94a3b8'}}>Start Time (seconds)</label>
            <input 
              type="number" 
              className="search-input" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              min="0"
              style={{width: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: '8px'}}
            />
          </div>
          <div style={{flex: 1}}>
            <label style={{display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#94a3b8'}}>Duration (max 10s)</label>
            <input 
              type="number" 
              className="search-input" 
              value={duration}
              onChange={(e) => setDuration(Math.min(10, Math.max(1, e.target.value)))}
              min="1"
              max="10"
              style={{width: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: '8px'}}
            />
          </div>
        </div>
        <button type="submit" className="btn" style={{width: '100%'}} disabled={loading}>
          {loading ? 'Processing...' : 'Generate GIF'}
        </button>
      </form>

      {loading && (
        <div className="progress-container" style={{background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--card-border)', marginTop: '1rem'}}>
          <div className="progress-header">
            <span className="progress-status">{status}</span>
            <span className="progress-percent">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {error && <div className="error-message" style={{marginTop: '1rem'}}>{error}</div>}
    </div>
  );
};

export default GifMaker;
