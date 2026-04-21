import { useState, useEffect } from 'react';
import { Globe, Plus, Trash2 } from 'lucide-react';

const COMMON_ZONES = [
  { label: 'New York (EST/EDT)', tz: 'America/New_York' },
  { label: 'San Francisco (PST/PDT)', tz: 'America/Los_Angeles' },
  { label: 'London (GMT/BST)', tz: 'Europe/London' },
  { label: 'Paris (CET/CEST)', tz: 'Europe/Paris' },
  { label: 'Dubai (GST)', tz: 'Asia/Dubai' },
  { label: 'India (IST)', tz: 'Asia/Kolkata' },
  { label: 'Tokyo (JST)', tz: 'Asia/Tokyo' },
  { label: 'Sydney (AEST/AEDT)', tz: 'Australia/Sydney' }
];

const TimeZonePlanner = () => {
  const [zones, setZones] = useState([
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Europe/London',
    'Asia/Tokyo'
  ]);
  const [newZone, setNewZone] = useState('');

  // Generate 24 hour blocks (0-23) based on local browser time
  const localHours = Array.from({length: 24}, (_, i) => {
    const d = new Date();
    d.setHours(i, 0, 0, 0); // Start of local hour
    return d;
  });

  const getFormat = (date, tz) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: 'numeric',
      hour12: true
    }).format(date);
  };

  const getHourNumber = (date, tz) => {
    return parseInt(new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: 'numeric',
      hour12: false
    }).format(date), 10);
  };

  const isBusinessHour = (h) => {
    return h >= 9 && h < 18; // 9 AM to 6 PM mapping
  };

  const addZone = () => {
    if (newZone && !zones.includes(newZone)) {
      setZones([...zones, newZone]);
      setNewZone('');
    }
  };

  const removeZone = (idx) => {
    setZones(zones.filter((_, i) => i !== idx));
  };

  return (
    <div className="page-container" style={{maxWidth: '1200px', margin: '0 auto'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Globe style={{display: 'inline', marginRight: '10px'}} /> Time Zone Meeting Planner</h1>
        <p className="subtitle">Find overlap between international business hours (9 AM - 6 PM green zones).</p>
      </header>

      <div className="result-card" style={{padding: '2rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
        <select className="search-input" value={newZone} onChange={e => setNewZone(e.target.value)} style={{flex: 1, background: 'rgba(0,0,0,0.2)'}}>
          <option value="" disabled>Add a Time Zone...</option>
          {COMMON_ZONES.map(z => (
            <option key={z.tz} value={z.tz}>{z.label}</option>
          ))}
        </select>
        <button className="btn" onClick={addZone} disabled={!newZone || zones.length >= 6} style={{padding: '0.8rem 2rem'}}><Plus size={18} /> Add</button>
      </div>

      <div style={{overflowX: 'auto', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid var(--card-border)'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          
          {zones.map((tz, idx) => (
            <div key={idx} style={{display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative'}}>
              {/* Sticky Row Header */}
              <div style={{minWidth: '200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--card-bg)', position: 'sticky', left: 0, zIndex: 10, borderRight: '1px solid rgba(255,255,255,0.1)'}}>
                <div style={{fontWeight: 'bold', color: '#f8fafc', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                  {tz.split('/').pop().replace('_', ' ')}
                  {idx === 0 && <span style={{display: 'block', fontSize: '0.75rem', color: '#64748b', fontWeight: 'normal'}}>Your Local Time</span>}
                </div>
                {idx !== 0 && (
                  <button onClick={() => removeZone(idx)} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem'}}><Trash2 size={16} /></button>
                )}
              </div>

              {/* Hourly Blocks */}
              <div style={{display: 'flex'}}>
                {localHours.map((dateObj, i) => {
                  const hourStr = getFormat(dateObj, tz);
                  const hNum = getHourNumber(dateObj, tz);
                  const isBiz = isBusinessHour(hNum);
                  
                  return (
                    <div key={i} style={{
                      minWidth: '70px',
                      height: '60px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRight: '1px solid rgba(255,255,255,0.05)',
                      background: isBiz ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                      color: isBiz ? '#10b981' : '#94a3b8',
                      fontSize: '0.85rem',
                      fontWeight: isBiz ? 'bold' : 'normal'
                    }}>
                      {hourStr}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default TimeZonePlanner;
