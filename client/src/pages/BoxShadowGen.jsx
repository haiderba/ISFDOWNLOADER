import { useState } from 'react';
import { Layers } from 'lucide-react';

const BoxShadowGen = () => {
  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(25);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState('rgba(0,0,0,0.5)');
  const [inset, setInset] = useState(false);

  // Fallback hex to rgba logic if color picker is used
  const hexToRgba = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const boxShadowString = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`;
  const cssCode = `box-shadow: ${boxShadowString};\n-webkit-box-shadow: ${boxShadowString};\n-moz-box-shadow: ${boxShadowString};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="page-container" style={{maxWidth: '1000px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Layers style={{display: 'inline', marginRight: '10px'}} /> Box Shadow Generator</h1>
        <p className="subtitle">Visually build and export CSS box shadows.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse'}}>
        
        {/* Controls */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Horizontal Offset</span>
                <span>{hOffset}px</span>
              </label>
              <input type="range" min="-100" max="100" value={hOffset} onChange={e => setHOffset(e.target.value)} style={{width: '100%', accentColor: 'var(--gradient-1)'}}/>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Vertical Offset</span>
                <span>{vOffset}px</span>
              </label>
              <input type="range" min="-100" max="100" value={vOffset} onChange={e => setVOffset(e.target.value)} style={{width: '100%', accentColor: 'var(--gradient-1)'}}/>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Blur Radius</span>
                <span>{blur}px</span>
              </label>
              <input type="range" min="0" max="150" value={blur} onChange={e => setBlur(e.target.value)} style={{width: '100%', accentColor: 'var(--gradient-1)'}}/>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Spread Radius</span>
                <span>{spread}px</span>
              </label>
              <input type="range" min="-50" max="50" value={spread} onChange={e => setSpread(e.target.value)} style={{width: '100%', accentColor: 'var(--gradient-1)'}}/>
            </div>

            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <label style={{color: '#94a3b8', fontSize: '0.9rem'}}>Color (RGBA or Hex)</label>
              <input type="text" className="search-input" value={color} onChange={e => setColor(e.target.value)} style={{flex: 1, background: 'rgba(0,0,0,0.2)', padding: '0.5rem'}} />
            </div>

            <label style={{display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', marginTop: '0.5rem'}}>
              <input type="checkbox" checked={inset} onChange={e => setInset(e.target.checked)} style={{width: '20px', height: '20px'}}/>
              Inset Shadow
            </label>

          </div>
        </div>

        {/* Preview & Code */}
        <div style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          <div className="result-card" style={{height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#e2e8f0', backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
             <div style={{
               width: '150px', height: '150px', background: '#3b82f6', borderRadius: '16px',
               boxShadow: boxShadowString
             }}></div>
          </div>

          <div className="result-card" style={{padding: '1.5rem', background: 'rgba(0,0,0,0.4)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
              <h3 style={{fontSize: '1rem', color: '#cbd5e1'}}>CSS Code</h3>
              <button className="btn btn-secondary" style={{padding: '0.4rem 0.8rem', fontSize: '0.85rem'}} onClick={copyToClipboard}>Copy</button>
            </div>
            <pre style={{margin: 0, color: '#6ee7b7', fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '0.9rem'}}>{cssCode}</pre>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BoxShadowGen;
