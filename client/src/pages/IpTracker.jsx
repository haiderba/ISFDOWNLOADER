import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

const IpTracker = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://ipinfo.io/json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => {
        if (json.error) throw new Error(json.error.message || 'Unknown error');
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message === 'Failed to fetch' ? 'Request blocked by browser (ad-blocker or privacy shield). Try disabling it for localhost.' : err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1><Globe style={{display: 'inline', marginRight: '10px'}} /> IP & Geolocation Tracker</h1>
        <p className="subtitle">Instantly discover your public IP address and location details.</p>
      </header>

      <div className="result-card" style={{position: 'relative'}}>
        {loading ? (
          <div style={{padding: '3rem', textAlign: 'center', color: '#cbd5e1'}}>Locating...</div>
        ) : error ? (
          <div style={{color: '#ef4444', textAlign: 'center', padding: '2rem'}}>Failed to fetch IP details: {error}</div>
        ) : data && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            <div style={{background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--card-border)'}}>
              <p style={{color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem'}}>Your Public IP</p>
              <h2 style={{fontFamily: 'monospace', fontSize: '3rem', color: '#f8fafc', margin: 0}}>{data.ip}</h2>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
              <div style={{background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px'}}>
                <span style={{color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase'}}>ISP</span>
                <p style={{fontSize: '1.1rem', fontWeight: '500'}}>{data.org || 'Unknown'}</p>
              </div>
              <div style={{background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px'}}>
                <span style={{color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase'}}>Location</span>
                <p style={{fontSize: '1.1rem', fontWeight: '500'}}>{data.city}, {data.region}</p>
              </div>
              <div style={{background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px'}}>
                <span style={{color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase'}}>Country Code</span>
                <p style={{fontSize: '1.1rem', fontWeight: '500'}}>{data.country}</p>
              </div>
              <div style={{background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px'}}>
                <span style={{color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase'}}>Timezone</span>
                <p style={{fontSize: '1.1rem', fontWeight: '500'}}>{data.timezone}</p>
              </div>
            </div>
            
            {data.loc && (
              <button className="btn" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${data.loc}`, '_blank')} style={{width: '100%', padding: '1rem', marginTop: '1rem'}}>
                View on Google Maps
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IpTracker;
