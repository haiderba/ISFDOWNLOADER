import { useState } from 'react';
import { Calculator } from 'lucide-react';

const FractionCalc = () => {
  const [inputVal, setInputVal] = useState('5/8');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('fracToDec'); // 'fracToDec' | 'decToFrac'

  // Greatest Common Divisor helper
  const gcd = (a, b) => {
    return b ? gcd(b, a % b) : a;
  };

  const convert = () => {
    const val = inputVal.trim();
    if (!val) { setResult(''); return; }

    try {
      if (mode === 'fracToDec') {
        // e.g. "5/8" or "1 3/8"
        const parts = val.split(' ');
        let total = 0;
        
        if (parts.length > 1) {
          total += parseInt(parts[0]);
          const fracParts = parts[1].split('/');
          total += parseInt(fracParts[0]) / parseInt(fracParts[1]);
        } else {
          if (val.includes('/')) {
            const fracParts = val.split('/');
            total = parseInt(fracParts[0]) / parseInt(fracParts[1]);
          } else {
            total = parseFloat(val);
          }
        }
        setResult(total.toString());
      } else {
        // e.g. "1.375" -> "1 3/8"
        const num = parseFloat(val);
        const whole = Math.floor(num);
        const decimal = num - whole;
        
        if (decimal === 0) {
          setResult(whole.toString());
          return;
        }

        const precision = 100000; // round to nearest 100k-th precision
        const numerator = Math.round(decimal * precision);
        const denominator = precision;
        
        const divisor = gcd(numerator, denominator);
        const finalNum = numerator / divisor;
        const finalDen = denominator / divisor;
        
        if (whole > 0) {
          setResult(`${whole} ${finalNum}/${finalDen}`);
        } else {
          setResult(`${finalNum}/${finalDen}`);
        }
      }
    } catch(e) {
      setResult('Invalid Format');
    }
  };

  return (
    <div className="page-container" style={{maxWidth: '800px', margin: '0 auto'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Calculator style={{display: 'inline', marginRight: '10px'}} /> Fraction & Decimal Extractor</h1>
        <p className="subtitle">Instantly convert between complex construction fractions and strict decimals.</p>
      </header>

      <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
        
        {/* Toggle Mode */}
        <div style={{display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '12px', width: 'fit-content', margin: '0 auto'}}>
           <button onClick={() => {setMode('fracToDec'); setInputVal('5/8'); setResult('');}} className={`btn ${mode === 'fracToDec' ? '' : 'btn-secondary'}`} style={{padding: '0.5rem 1.5rem'}}>Fraction to Decimal</button>
           <button onClick={() => {setMode('decToFrac'); setInputVal('0.625'); setResult('');}} className={`btn ${mode === 'decToFrac' ? '' : 'btn-secondary'}`} style={{padding: '0.5rem 1.5rem'}}>Decimal to Fraction</button>
        </div>

        {/* Action Form */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
           <label style={{color: '#94a3b8', fontSize: '1rem'}}>Enter {mode === 'fracToDec' ? 'Fraction (e.g. 1 3/8)' : 'Decimal (e.g. 1.375)'}</label>
           
           <div style={{position: 'relative', width: '100%', maxWidth: '400px'}}>
             <input 
               type="text" 
               value={inputVal}
               onChange={e => setInputVal(e.target.value)}
               className="search-input"
               style={{
                 width: '100%', padding: '1rem 1.5rem', fontSize: '1.5rem', textAlign: 'center', 
                 background: '#020617', border: '2px solid var(--gradient-1)', borderRadius: '16px', color: 'white'
               }}
             />
           </div>

           <button onClick={convert} className="btn" style={{marginTop: '1rem', width: '100%', maxWidth: '400px', padding: '1rem'}}>Force Convert =</button>
        </div>

        {/* Result Area */}
        <div style={{background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--card-border)', marginTop: '1rem'}}>
          <div style={{color: '#64748b', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '0.5rem'}}>Conversion Result</div>
          <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#10b981', minHeight: '60px'}}>{result || '---'}</div>
        </div>

      </div>
    </div>
  );
};

export default FractionCalc;
