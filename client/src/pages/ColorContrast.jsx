import { useState, useEffect } from 'react';
import { Eye, ShieldAlert, ShieldCheck } from 'lucide-react';

const ColorContrast = () => {
  const [bgHex, setBgHex] = useState('#ffffff');
  const [textHex, setTextHex] = useState('#000000');
  const [ratio, setRatio] = useState(21);

  // Helper to convert HEX to RGB
  const hexToRgb = (hex) => {
    let raw = hex.replace('#', '');
    if (raw.length === 3) raw = raw.split('').map(c => c + c).join('');
    if (raw.length !== 6) return null;
    return {
      r: parseInt(raw.substring(0, 2), 16),
      g: parseInt(raw.substring(2, 4), 16),
      b: parseInt(raw.substring(4, 6), 16)
    };
  };

  // Helper to calculate relative luminance
  const getLuminance = (r, g, b) => {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  useEffect(() => {
    const bgRgb = hexToRgb(bgHex);
    const textRgb = hexToRgb(textHex);

    if (bgRgb && textRgb) {
      const lum1 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
      const lum2 = getLuminance(textRgb.r, textRgb.g, textRgb.b);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      
      const contrast = (brightest + 0.05) / (darkest + 0.05);
      setRatio(contrast);
    }
  }, [bgHex, textHex]);

  const passesAA_Normal = ratio >= 4.5;
  const passesAA_Large = ratio >= 3.0;
  const passesAAA_Normal = ratio >= 7.0;

  const StatusPill = ({ passed, text }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.5rem', 
      background: passed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
      color: passed ? '#10b981' : '#ef4444',
      padding: '0.5rem 1rem', borderRadius: '8px',
      fontWeight: 'bold', fontSize: '0.9rem'
    }}>
      {passed ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
      {text} - {passed ? 'PASS' : 'FAIL'}
    </div>
  );

  return (
    <div className="page-container" style={{maxWidth: '1000px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Eye style={{display: 'inline', marginRight: '10px'}} /> Contrast & Accessibility Checker</h1>
        <p className="subtitle">Ensure your colors comply with WCAG inclusivity standards.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Controls */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            
            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Background Color</label>
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <input 
                  type="color" 
                  value={bgHex} 
                  onChange={e => setBgHex(e.target.value)}
                  style={{width: '50px', height: '50px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent'}}
                />
                <input 
                  type="text" 
                  className="search-input" 
                  value={bgHex.toUpperCase()} 
                  onChange={e => setBgHex(e.target.value)}
                  style={{flex: 1, background: 'rgba(0,0,0,0.2)', textTransform: 'uppercase'}} 
                />
              </div>
            </div>

            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Text Color</label>
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <input 
                  type="color" 
                  value={textHex} 
                  onChange={e => setTextHex(e.target.value)}
                  style={{width: '50px', height: '50px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent'}}
                />
                <input 
                  type="text" 
                  className="search-input" 
                  value={textHex.toUpperCase()} 
                  onChange={e => setTextHex(e.target.value)}
                  style={{flex: 1, background: 'rgba(0,0,0,0.2)', textTransform: 'uppercase'}} 
                />
              </div>
            </div>

            <div style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem'}}>
               <p style={{color: '#94a3b8', textAlign: 'center', marginBottom: '1rem'}}>WCAG 2.0 Compliance</p>
               <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                 <StatusPill passed={passesAA_Normal} text="AA (Normal Text)" />
                 <StatusPill passed={passesAA_Large} text="AA (Large Text)" />
                 <StatusPill passed={passesAAA_Normal} text="AAA (Strict)" />
               </div>
            </div>

          </div>
        </div>

        {/* Live Preview */}
        <div style={{flex: 1.5, minWidth: '300px'}}>
          <div className="result-card" style={{height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column'}}>
            
            <div style={{
              flex: 1, 
              background: bgHex, 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
              color: textHex,
              textAlign: 'center',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
            }}>
               
               <h2 style={{fontSize: '3.5rem', fontWeight: 'bold', margin: '0 0 1rem 0'}}>
                 {ratio.toFixed(2)} : 1
               </h2>
               
               <p style={{fontSize: '1.2rem', margin: 0, opacity: 0.9, maxWidth: '80%'}}>
                 The quick brown fox jumps over the lazy dog. 
               </p>
               <p style={{fontSize: '0.9rem', marginTop: '1.5rem', opacity: 0.7}}>
                 This is what your body text will look like against this background format.
               </p>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ColorContrast;
