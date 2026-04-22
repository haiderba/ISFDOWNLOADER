import { useState } from 'react';
import { Calculator } from 'lucide-react';

const ScientificCalc = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const append = (val) => {
    if (display === '0' || display === 'Error') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const compute = () => {
    try {
      // Safe eval equivalent using Function for basic math strings
      let safeExpr = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(');

      // Handle power ^ logic lazily by assuming clean input or simple replace for standard users
      safeExpr = safeExpr.replace(/\^/g, '**');

      const result = new Function(`return ${safeExpr}`)();
      setEquation(display + ' =');
      
      // limit float precision
      setDisplay(Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(6)).toString());
    } catch (e) {
      setDisplay('Error');
    }
  };

  const btnStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--card-border)',
    color: '#f8fafc',
    fontSize: '1.2rem',
    cursor: 'pointer',
    borderRadius: '12px',
    transition: 'all 0.2s',
    display: 'flex', justifyContent: 'center', alignItems: 'center'
  };

  const Button = ({ label, fn, special, danger }) => (
    <button 
      onClick={fn ? fn : () => append(label)}
      style={{
        ...btnStyle,
        background: special ? 'var(--gradient-1)' : danger ? '#ef4444' : btnStyle.background,
        color: special || danger ? 'white' : btnStyle.color,
        fontWeight: special || danger ? 'bold' : 'normal'
      }}
      onMouseOver={e => e.target.style.background = special ? 'var(--accent-hover)' : danger ? '#dc2626' : 'rgba(255,255,255,0.1)'}
      onMouseOut={e => e.target.style.background = special ? 'var(--gradient-1)' : danger ? '#ef4444' : btnStyle.background}
    >
      {label}
    </button>
  );

  return (
    <div className="page-container" style={{maxWidth: '800px', margin: '0 auto'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Calculator style={{display: 'inline', marginRight: '10px'}} /> Scientific Calculator</h1>
        <p className="subtitle">High-precision mathematics directly in your browser.</p>
      </header>

      <div className="result-card" style={{padding: '2.5rem', background: 'linear-gradient(145deg, #1e293b, #0f172a)'}}>
        
        {/* Screen */}
        <div style={{background: '#020617', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', textAlign: 'right', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.5rem', minHeight: '120px', justifyContent: 'center'}}>
           <div style={{color: '#64748b', fontSize: '1rem', minHeight: '20px'}}>{equation}</div>
           <div style={{color: '#38bdf8', fontSize: '3rem', fontWeight: 'bold', overflowX: 'auto', whiteSpace: 'nowrap'}}>{display}</div>
        </div>

        {/* Keypad */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', height: '400px'}}>
           {/* Scientific Row 1 */}
           <Button label="sin(" />
           <Button label="cos(" />
           <Button label="tan(" />
           <Button label="π" />
           <Button label="C" fn={clear} danger />

           {/* Scientific Row 2 */}
           <Button label="sqrt(" />
           <Button label="^" />
           <Button label="log(" />
           <Button label="(" />
           <Button label=")" />
           
           {/* Numbers & Basic Ops */}
           <Button label="7" />
           <Button label="8" />
           <Button label="9" />
           <Button label="÷" special />
           <Button label="e" />

           <Button label="4" />
           <Button label="5" />
           <Button label="6" />
           <Button label="×" special />
           <Button label="ln(" />

           <Button label="1" />
           <Button label="2" />
           <Button label="3" />
           <Button label="-" special />
           <Button label="00" />

           <Button label="0" />
           <Button label="." />
           <Button label="=" fn={compute} special />
           <Button label="+" special />
           <Button label="Del" fn={() => setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0')} />
        </div>

      </div>
    </div>
  );
};

export default ScientificCalc;
