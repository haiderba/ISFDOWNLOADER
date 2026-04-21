import { useState } from 'react';
import { PaintBucket } from 'lucide-react';

const CssGradient = () => {
  const [color1, setColor1] = useState('#3b82f6');
  const [color2, setColor2] = useState('#8b5cf6');
  const [angle, setAngle] = useState(90);

  const gradientString = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  const cssCode = `background: ${gradientString};\n/* CSS Standard */`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    alert('Copied to clipboard!');
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1><PaintBucket style={{display: 'inline', marginRight: '10px'}} /> Gradient Builder</h1>
        <p className="subtitle">Visually build and export CSS background gradients.</p>
      </header>

      <div className="result-card">
        {/* Preview Area */}
        <div 
          style={{
            width: '100%', 
            height: '250px', 
            borderRadius: '16px', 
            background: gradientString,
            marginBottom: '2rem',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
          }}
        ></div>

        {/* Controls */}
        <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem'}}>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <label style={{color: '#94a3b8', fontSize: '0.9rem'}}>Color 1</label>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} style={{width: '50px', height: '50px', border: 'none', borderRadius: '8px', background: 'transparent', cursor: 'pointer'}} />
              <input type="text" className="search-input" value={color1} onChange={(e) => setColor1(e.target.value)} style={{background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '0.5rem 1rem'}} />
            </div>
          </div>
          
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <label style={{color: '#94a3b8', fontSize: '0.9rem'}}>Color 2</label>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} style={{width: '50px', height: '50px', border: 'none', borderRadius: '8px', background: 'transparent', cursor: 'pointer'}} />
              <input type="text" className="search-input" value={color2} onChange={(e) => setColor2(e.target.value)} style={{background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '0.5rem 1rem'}} />
            </div>
          </div>
        </div>

        <div style={{marginBottom: '2rem'}}>
          <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem'}}>
            <span>Angle</span>
            <span>{angle}°</span>
          </label>
          <input 
            type="range" 
            min="0" max="360" 
            value={angle} 
            onChange={(e) => setAngle(e.target.value)}
            style={{width: '100%', accentColor: 'var(--gradient-1)'}}
          />
        </div>

        {/* Output */}
        <div style={{background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--card-border)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <h3 style={{fontSize: '1rem', color: '#cbd5e1'}}>CSS Code</h3>
            <button className="btn btn-secondary" style={{padding: '0.5rem 1rem', fontSize: '0.9rem'}} onClick={copyToClipboard}>Copy Code</button>
          </div>
          <pre style={{margin: 0, color: '#a78bfa', fontFamily: 'monospace', whiteSpace: 'pre-wrap'}}>{cssCode}</pre>
        </div>
      </div>
    </div>
  );
};

export default CssGradient;
