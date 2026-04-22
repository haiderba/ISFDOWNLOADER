import { useState } from 'react';
import { Database, Download, Copy, RefreshCw } from 'lucide-react';

const UuidGenerator = () => {
  const [count, setCount] = useState(10);
  const [uuids, setUuids] = useState([]);

  const generate = () => {
    const res = [];
    const clamp = Math.min(Math.max(count || 1, 1), 10000); // cap at 10k logic
    setCount(clamp);

    for (let i = 0; i < clamp; i++) {
       // crypto.randomUUID is widely supported in modern browsers
       res.push(crypto.randomUUID ? crypto.randomUUID() : 'Unsupported_Browser_Requires_HTTPS_' + Math.random());
    }
    setUuids(res);
  };

  const copyToClipboard = () => {
    if (uuids.length > 0) {
      navigator.clipboard.writeText(uuids.join('\n'));
      alert('Copied to clipboard');
    }
  };

  const downloadText = () => {
    if (uuids.length === 0) return;
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated_uuids.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1><Database /> Bulk UUID / GUID Generator</h1>
        <p className="subtitle">Instantly generate cryptographically secure unique identifiers for your database.</p>
      </header>

      <div className="result-card">
        
        {/* Controls */}
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap'}}>
           <div style={{flex: 1, minWidth: '200px'}}>
             <label style={{color: '#94a3b8', marginBottom: '0.5rem', display: 'block'}}>How many to generate? (Max 10k)</label>
             <input 
               type="number" 
               min="1" max="10000"
               value={count} 
               onChange={e => setCount(parseInt(e.target.value) || 1)}
               className="search-input" 
               style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px'}}
             />
           </div>
           
           <button onClick={generate} className="btn" style={{marginTop: '1.5rem', padding: '1rem 2rem'}}><RefreshCw size={18} /> Generate UUIDs</button>
        </div>

        {/* Output Area */}
        <div style={{display: 'flex', flexDirection: 'column', border: '1px solid var(--card-border)', borderRadius: '12px', overflow: 'hidden'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--card-border)'}}>
             <span style={{color: '#cbd5e1', fontWeight: 'bold'}}>{uuids.length} Generated Keys (v4 Mode)</span>
             <div style={{display: 'flex', gap: '0.5rem'}}>
               <button onClick={copyToClipboard} className="btn btn-secondary" style={{padding: '0.4rem 0.8rem', fontSize: '0.85rem'}}><Copy size={16}/> Copy</button>
               <button onClick={downloadText} className="btn btn-secondary" style={{padding: '0.4rem 0.8rem', fontSize: '0.85rem'}}><Download size={16}/> Save .TXT</button>
             </div>
          </div>
          
          <textarea 
            readOnly
            value={uuids.join('\n')}
            placeholder="Generated keys will appear here..."
            style={{
               width: '100%', height: '300px', background: 'transparent', border: 'none', 
               padding: '1rem', color: '#10b981', fontFamily: 'monospace', 
               fontSize: '1rem', resize: 'vertical', outline: 'none'
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default UuidGenerator;
