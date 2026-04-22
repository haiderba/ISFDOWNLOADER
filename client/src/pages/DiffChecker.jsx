import { useState } from 'react';
import { GitCompare } from 'lucide-react';

const DiffChecker = () => {
  const [original, setOriginal] = useState('This is an example document.\nIt contains multiple lines.\nSome lines will be changed.\nOthers remain the same.');
  const [modified, setModified] = useState('This is an example document.\nIt contains a few new lines.\nSome lines will be changed quickly.\nThis line was completely added.');

  // A basic, purely native line-diffing algorithm. 
  // Native JS doesn't have Myers Diff built-in, so we approximate a line-by-line comparison.
  const computeDiff = () => {
    const origLines = original.split('\n');
    const modLines = modified.split('\n');
    
    const results = [];
    let i = 0; // orig index
    let j = 0; // mod index

    // Extremely basic consecutive diff check
    while (i < origLines.length || j < modLines.length) {
      if (origLines[i] === modLines[j]) {
        if (origLines[i] !== undefined) {
          results.push({ type: 'unchanged', val: origLines[i] });
        }
        i++; j++;
      } else {
        // Line changed or added/removed
        // If modified line exists in original ahead, then it's a deletion
        // Very basic lookahead
        const futureOrigIndex = origLines.indexOf(modLines[j], i + 1);
        const futureModIndex = modLines.indexOf(origLines[i], j + 1);

        if (futureOrigIndex !== -1 && (futureModIndex === -1 || futureOrigIndex - i < futureModIndex - j)) {
          results.push({ type: 'removed', val: origLines[i] });
          i++;
        } else if (futureModIndex !== -1) {
          results.push({ type: 'added', val: modLines[j] });
          j++;
        } else {
          // both changed inline
          if (origLines[i] !== undefined) results.push({ type: 'removed', val: origLines[i] });
          if (modLines[j] !== undefined) results.push({ type: 'added', val: modLines[j] });
          i++; j++;
        }
      }
    }
    
    return results;
  };

  const diffResult = original || modified ? computeDiff() : [];

  return (
    <div className="page-container" style={{maxWidth: '1200px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><GitCompare style={{display: 'inline', marginRight: '10px'}} /> Text Diff Checker</h1>
        <p className="subtitle">Visually compare two text blocks. Identifies added and deleted lines instantly.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem'}}>
        <div style={{flex: 1, minWidth: '300px'}}>
          <label style={{color: '#94a3b8', marginBottom: '0.5rem', display: 'block'}}>Original Text (Version A)</label>
          <textarea 
            className="search-input"
            value={original}
            onChange={e => setOriginal(e.target.value)}
            style={{width: '100%', height: '200px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '12px', resize: 'vertical'}}
          ></textarea>
        </div>
        <div style={{flex: 1, minWidth: '300px'}}>
          <label style={{color: '#94a3b8', marginBottom: '0.5rem', display: 'block'}}>Modified Text (Version B)</label>
          <textarea 
            className="search-input"
            value={modified}
            onChange={e => setModified(e.target.value)}
            style={{width: '100%', height: '200px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '12px', resize: 'vertical'}}
          ></textarea>
        </div>
      </div>

      <div className="result-card" style={{padding: 0, overflow: 'hidden'}}>
        <div style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderBottom: '1px solid var(--card-border)'}}>
           <h3 style={{margin: 0, fontSize: '1rem', color: '#cbd5e1'}}>Comparison Output</h3>
        </div>
        
        <div style={{background: '#0f172a', fontFamily: 'monospace', fontSize: '0.95rem', overflowX: 'auto', minHeight: '200px', padding: '1rem 0'}}>
          {diffResult.length === 0 && <p style={{textAlign: 'center', color: '#64748b'}}>Provide text to compare.</p>}
          
          {diffResult.map((line, idx) => {
            let bg = 'transparent';
            let color = '#94a3b8';
            let prefix = '  ';

            if (line.type === 'added') {
              bg = 'rgba(16, 185, 129, 0.15)';
              color = '#10b981';
              prefix = '+ ';
            } else if (line.type === 'removed') {
              bg = 'rgba(239, 68, 68, 0.15)';
              color = '#ef4444';
              prefix = '- ';
            }

            return (
              <div key={idx} style={{display: 'flex', background: bg, color: color, padding: '0.1rem 1rem'}}>
                <span style={{userSelect: 'none', opacity: 0.5, marginRight: '1rem', minWidth: '20px'}}>{prefix}</span>
                <span style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>{line.val}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default DiffChecker;
