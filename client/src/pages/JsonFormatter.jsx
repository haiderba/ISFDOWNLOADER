import { useState } from 'react';
import { Code } from 'lucide-react';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 4);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="page-container" style={{maxWidth: '1200px'}}>
      <header className="page-header">
        <h1><Code style={{display: 'inline', marginRight: '10px'}} /> JSON Formatter & Validator</h1>
        <p className="subtitle">Format, beautify, and validate your JSON data.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem'}}>
        {/* Input */}
        <div style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <h3 style={{color: '#cbd5e1'}}>Input JSON</h3>
            <button className="btn" onClick={formatJson} style={{padding: '0.4rem 1rem', fontSize: '0.9rem'}}>Format</button>
          </div>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"paste": "your messy json here"}'
            style={{flex: 1, minHeight: '500px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '1rem', color: '#f8fafc', fontFamily: 'monospace', resize: 'vertical'}}
          />
        </div>

        {/* Output */}
        <div style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <h3 style={{color: '#cbd5e1'}}>Output</h3>
            <button className="btn btn-secondary" onClick={copyToClipboard} disabled={!output} style={{padding: '0.4rem 1rem', fontSize: '0.9rem'}}>Copy</button>
          </div>
          
          <div style={{flex: 1, minHeight: '500px', background: 'rgba(0,0,0,0.5)', border: error ? '1px solid #ef4444' : '1px solid var(--card-border)', borderRadius: '12px', padding: '1rem', overflowY: 'auto', position: 'relative'}}>
            {error ? (
              <div style={{color: '#fca5a5', fontFamily: 'monospace', whiteSpace: 'pre-wrap'}}>
                <strong>Invalid JSON:</strong><br/>{error}
              </div>
            ) : (
              <pre style={{color: '#6ee7b7', fontFamily: 'monospace', margin: 0}}>{output}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
