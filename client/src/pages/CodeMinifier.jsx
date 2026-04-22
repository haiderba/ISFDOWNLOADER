import { useState } from 'react';
import { FileEdit, Minimize, Maximize } from 'lucide-react';

const CodeMinifier = () => {
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('css');
  const [error, setError] = useState('');

  const minify = () => {
    setError('');
    let output = code;
    try {
      if (mode === 'json') {
        output = JSON.stringify(JSON.parse(code));
      } else if (mode === 'css') {
        output = code
          .replace(/\/\*.*?\*\//g, '') // remove comments
          .replace(/\s+/g, ' ') // collapse heavy whitespace
          .replace(/\{\s+/g, '{')
          .replace(/\s+\}/g, '}')
          .replace(/;\s+/g, ';')
          .replace(/:\s+/g, ':')
          .replace(/\s*,\s*/g, ',')
          .trim();
      }
      setCode(output);
    } catch (e) {
      setError('Invalid format. Cannot process input.');
    }
  };

  const beautify = () => {
    setError('');
    let output = code;
    try {
      if (mode === 'json') {
        output = JSON.stringify(JSON.parse(code), null, 2);
      } else if (mode === 'css') {
        // very basic reliable CSS beautifier algorithm 
        output = code
          .replace(/\s+/g, ' ')
          .replace(/\{\s*/g, ' {\n  ')
          .replace(/;\s*/g, ';\n  ')
          .replace(/\}\s*/g, '\n}\n\n')
          .trim();
      }
      setCode(output);
    } catch(e) {
      setError('Invalid format. Cannot process input.');
    }
  };

  return (
    <div className="page-container">
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><FileEdit style={{display: 'inline', marginRight: '10px'}} /> Code Minifier</h1>
        <p className="subtitle">Clean, compress, or beautify CSS and JSON strings instantly.</p>
      </header>

      <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        {error && <div className="error-message">{error}</div>}

        <div style={{display: 'flex', gap: '1rem', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <div style={{display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '12px'}}>
             <button onClick={() => setMode('css')} className={`btn ${mode === 'css' ? '' : 'btn-secondary'}`} style={{padding: '0.5rem 1.5rem'}}>CSS</button>
             <button onClick={() => setMode('json')} className={`btn ${mode === 'json' ? '' : 'btn-secondary'}`} style={{padding: '0.5rem 1.5rem'}}>JSON</button>
          </div>
          
          <div style={{display: 'flex', gap: '0.5rem'}}>
             <button onClick={minify} className="btn" style={{padding: '0.5rem 1.5rem'}}><Minimize size={18} /> Minify (Compress)</button>
             <button onClick={beautify} className="btn btn-secondary" style={{padding: '0.5rem 1.5rem'}}><Maximize size={18} /> Beautify (Format)</button>
          </div>
        </div>

        <textarea 
          placeholder={`Paste your ${mode.toUpperCase()} code here...`}
          value={code}
          onChange={e => { setCode(e.target.value); setError(''); }}
          style={{
            width: '100%', height: '400px', background: '#020617', border: '1px solid var(--card-border)', 
            borderRadius: '12px', padding: '1.5rem', color: '#f8fafc', fontFamily: 'monospace', 
            fontSize: '0.95rem', resize: 'vertical', outline: 'none'
          }}
        />

        <div style={{color: '#64748b', fontSize: '0.85rem', textAlign: 'right'}}>
           {code.length} Characters | {(new Blob([code]).size / 1024).toFixed(2)} KB
        </div>

      </div>
    </div>
  );
};

export default CodeMinifier;
