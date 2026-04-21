import { useState } from 'react';
import { Key } from 'lucide-react';

const PasswordGen = () => {
  const [length, setLength] = useState(16);
  const [incUpper, setIncUpper] = useState(true);
  const [incLower, setIncLower] = useState(true);
  const [incNumbers, setIncNumbers] = useState(true);
  const [incSymbols, setIncSymbols] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let validChars = '';
    if (incUpper) validChars += upperChars;
    if (incLower) validChars += lowerChars;
    if (incNumbers) validChars += numberChars;
    if (incSymbols) validChars += symbolChars;

    if (!validChars && !keyword) {
      setPassword('Please select at least one option.');
      return;
    }

    let genPass = keyword;
    const remainingLength = Math.max(0, length - keyword.length);

    for (let i = 0; i < remainingLength; i++) {
        if (validChars) {
            const randomIndex = Math.floor(Math.random() * validChars.length);
            genPass += validChars[randomIndex];
        } else {
            // fallback if only keyword is used but length is longer
            genPass += '!';
        }
    }

    // Shuffle if keyword is used so it's not always at the front (optional, but requested "generate with keyword")
    // Simple shuffle logic avoiding the keyword being broken:
    // Better logic: generate random string, insert keyword at random position.
    
    let finalPass = '';
    if (keyword && validChars) {
        let randStr = '';
        for (let i = 0; i < remainingLength; i++) randStr += validChars[Math.floor(Math.random() * validChars.length)];
        const insertPos = Math.floor(Math.random() * (randStr.length + 1));
        finalPass = randStr.slice(0, insertPos) + keyword + randStr.slice(insertPos);
    } else if (validChars) {
        let randStr = '';
        for (let i = 0; i < length; i++) randStr += validChars[Math.floor(Math.random() * validChars.length)];
        finalPass = randStr;
    } else {
        finalPass = keyword;
    }

    setPassword(finalPass);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1><Key style={{display: 'inline', marginRight: '10px'}} /> Password Generator</h1>
        <p className="subtitle">Create highly secure, custom passwords instantly.</p>
      </header>

      <div className="result-card">
        
        {/* Output */}
        <div style={{background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--card-border)', marginBottom: '2rem', textAlign: 'center', position: 'relative'}}>
          <h2 style={{fontFamily: 'monospace', letterSpacing: '2px', wordBreak: 'break-all', fontSize: '2rem', minHeight: '3rem', color: password.includes('Please') ? '#ef4444' : '#f8fafc'}}>
            {password || 'Click Generate'}
          </h2>
          {password && !password.includes('Please') && (
            <button className="btn btn-secondary" style={{position: 'absolute', top: '10px', right: '10px', padding: '0.5rem'}} onClick={() => { navigator.clipboard.writeText(password); alert('Copied!'); }}>
              Copy
            </button>
          )}
        </div>

        {/* Controls */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div>
            <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '1rem', marginBottom: '1rem'}}>
              <span>Password Length</span>
              <span style={{fontWeight: 'bold', color: 'white'}}>{length}</span>
            </label>
            <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(e.target.value)} style={{width: '100%', accentColor: 'var(--gradient-1)'}} />
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px'}}>
              <input type="checkbox" checked={incUpper} onChange={e => setIncUpper(e.target.checked)} style={{width: '20px', height: '20px'}}/>
              Uppercase (A-Z)
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px'}}>
              <input type="checkbox" checked={incLower} onChange={e => setIncLower(e.target.checked)} style={{width: '20px', height: '20px'}}/>
              Lowercase (a-z)
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px'}}>
              <input type="checkbox" checked={incNumbers} onChange={e => setIncNumbers(e.target.checked)} style={{width: '20px', height: '20px'}}/>
              Numbers (0-9)
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px'}}>
              <input type="checkbox" checked={incSymbols} onChange={e => setIncSymbols(e.target.checked)} style={{width: '20px', height: '20px'}}/>
              Symbols (!@#$)
            </label>
          </div>

          <div style={{marginTop: '1rem'}}>
            <label style={{color: '#94a3b8', fontSize: '1rem', marginBottom: '0.5rem', display: 'block'}}>Include Custom Keyword (Optional)</label>
            <input type="text" className="search-input" placeholder="e.g. Apple" value={keyword} onChange={e => setKeyword(e.target.value)} style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '12px'}} />
          </div>

          <button className="btn" style={{marginTop: '1rem'}} onClick={generatePassword}>Generate Password</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGen;
