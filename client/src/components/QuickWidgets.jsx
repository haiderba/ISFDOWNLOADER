import { useState } from 'react';
import { Key, Activity, Shield, Calculator, Copy, ArrowRightLeft, DollarSign } from 'lucide-react';

const QuickWidgets = () => {
  // Widget 1: Quick Password
  const [quickPass, setQuickPass] = useState('...');
  
  const generateQuickPass = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setQuickPass(password);
    navigator.clipboard.writeText(password);
  };

  // Widget 2: Quick BMI
  const [bmiSystem, setBmiSystem] = useState('metric'); // 'metric' or 'imperial'
  const [bmiData, setBmiData] = useState({ h: '', w: '', hFt: '', hIn: '' });

  let bmiScore = '0.0';
  if (bmiSystem === 'metric' && bmiData.h && bmiData.w) {
    bmiScore = (parseFloat(bmiData.w) / Math.pow(parseFloat(bmiData.h)/100, 2)).toFixed(1);
  } else if (bmiSystem === 'imperial' && bmiData.w && (bmiData.hFt || bmiData.hIn)) {
    const totalInches = (parseFloat(bmiData.hFt || 0) * 12) + parseFloat(bmiData.hIn || 0);
    if (totalInches > 0) {
      bmiScore = (703 * parseFloat(bmiData.w) / Math.pow(totalInches, 2)).toFixed(1);
    }
  }

  // Widget 5: Quick Currency (Mock Data)
  const [currencyVal, setCurrencyVal] = useState('1');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const exchangeRates = {
    'EUR': 0.92, 'GBP': 0.79, 'JPY': 151.30, 'CAD': 1.36, 'AUD': 1.53, 'INR': 83.35
  };
  const currencyResult = currencyVal ? (parseFloat(currencyVal) * exchangeRates[targetCurrency]).toFixed(2) : '0.00';

  // Widget 3: Quick Base64
  const [b64Text, setB64Text] = useState('');
  let encodedB64 = '';
  try {
    encodedB64 = b64Text ? btoa(b64Text) : '';
  } catch(e) {
    encodedB64 = 'Invalid character';
  }

  // Widget 4: Quick Unit (Kg to Lbs)
  const [unitVal, setUnitVal] = useState('');
  const [unitDir, setUnitDir] = useState('kg2lbs'); // 'kg2lbs' or 'lbs2kg'
  
  const convertedUnit = unitVal ? (
    unitDir === 'kg2lbs' ? (parseFloat(unitVal) * 2.20462).toFixed(2) + ' lbs'
                         : (parseFloat(unitVal) / 2.20462).toFixed(2) + ' kg'
  ) : '0.00';

  return (
    <div style={{marginBottom: '3rem'}}>
      <h2 style={{fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <Activity size={20} color="#f59e0b" /> Quick Tools
      </h2>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem'}}>
        
        {/* Quick Password Widget */}
        <div className="result-card" style={{padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 'bold'}}>
             <Key size={16} /> Instant Password Gen
          </div>
          <div style={{background: 'rgba(0,0,0,0.2)', padding: '0.6rem', borderRadius: '8px', fontSize: '1rem', fontFamily: 'monospace', color: '#34d399', textAlign: 'center', wordBreak: 'break-all'}}>
             {quickPass}
          </div>
          <button className="btn btn-secondary" onClick={generateQuickPass} style={{padding: '0.5rem', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem'}}>
            <Copy size={14} /> Generate & Copy
          </button>
        </div>

        {/* Quick BMI Widget */}
        <div className="result-card" style={{padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 'bold'}}>
               <Shield size={16} /> Quick BMI
            </div>
            <button className="btn btn-secondary" style={{padding: '0.2rem 0.5rem', fontSize: '0.7rem'}} onClick={() => setBmiSystem(s => s === 'metric' ? 'imperial' : 'metric')}>
               {bmiSystem === 'metric' ? 'Metric' : 'Imperial'} <ArrowRightLeft size={10} style={{display: 'inline'}} />
            </button>
          </div>
          
          {bmiSystem === 'metric' ? (
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <input type="number" placeholder="Height (cm)" className="search-input" style={{width: '50%', padding: '0.5rem', fontSize: '0.85rem'}} value={bmiData.h} onChange={e => setBmiData({...bmiData, h: e.target.value})} />
              <input type="number" placeholder="Weight (kg)" className="search-input" style={{width: '50%', padding: '0.5rem', fontSize: '0.85rem'}} value={bmiData.w} onChange={e => setBmiData({...bmiData, w: e.target.value})} />
            </div>
          ) : (
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
              <div style={{display: 'flex', gap: '0.25rem', width: '100%'}}>
                <input type="number" placeholder="Ft" className="search-input" style={{width: '50%', padding: '0.5rem', fontSize: '0.85rem'}} value={bmiData.hFt} onChange={e => setBmiData({...bmiData, hFt: e.target.value})} />
                <input type="number" placeholder="In" className="search-input" style={{width: '50%', padding: '0.5rem', fontSize: '0.85rem'}} value={bmiData.hIn} onChange={e => setBmiData({...bmiData, hIn: e.target.value})} />
              </div>
              <input type="number" placeholder="Weight (lbs)" className="search-input" style={{width: '100%', padding: '0.5rem', fontSize: '0.85rem'}} value={bmiData.w} onChange={e => setBmiData({...bmiData, w: e.target.value})} />
            </div>
          )}
          
          <div style={{background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center'}}>
            <span style={{fontSize: '0.85rem', color: '#94a3b8'}}>Your BMI: </span>
            <strong style={{color: '#38bdf8', fontSize: '1.1rem'}}>{bmiScore}</strong>
          </div>
        </div>

        {/* Quick Base64 Widget */}
        <div className="result-card" style={{padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 'bold'}}>
             <Shield size={16} /> Quick Base64 Encode
          </div>
          <input 
             type="text" 
             placeholder="Type text to encode..." 
             className="search-input" 
             style={{width: '100%', padding: '0.5rem', fontSize: '0.85rem'}}
             value={b64Text}
             onChange={e => setB64Text(e.target.value)}
          />
          <div style={{background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace', color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
            {encodedB64 || '...'}
          </div>
        </div>

        {/* Quick Unit Widget */}
        <div className="result-card" style={{padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 'bold'}}>
             <Calculator size={16} /> Quick Unit (Kg/Lbs)
          </div>
          <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
             <input type="number" placeholder="Value" className="search-input" style={{width: '60%', padding: '0.5rem', fontSize: '0.85rem'}} value={unitVal} onChange={e => setUnitVal(e.target.value)} />
             <button className="btn btn-secondary" onClick={() => setUnitDir(d => d === 'kg2lbs' ? 'lbs2kg' : 'kg2lbs')} style={{padding: '0.5rem', width: '40%', display: 'flex', justifyContent: 'center'}}>
               <ArrowRightLeft size={16} />
             </button>
          </div>
          <div style={{background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center'}}>
            <span style={{fontSize: '0.85rem', color: '#94a3b8'}}>{unitDir === 'kg2lbs' ? 'Kg to Lbs' : 'Lbs to Kg'} = </span>
            <strong style={{color: '#f43f5e', fontSize: '1rem'}}>{convertedUnit}</strong>
          </div>
        </div>

        {/* Quick Currency Widget */}
        <div className="result-card" style={{padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 'bold'}}>
             <DollarSign size={16} /> Currency Converter
          </div>
          <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
             <div style={{width: '60%', position: 'relative'}}>
               <span style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.9rem'}}>$</span>
               <input type="number" placeholder="USD" className="search-input" style={{width: '100%', padding: '0.5rem 0.5rem 0.5rem 1.5rem', fontSize: '0.85rem'}} value={currencyVal} onChange={e => setCurrencyVal(e.target.value)} />
             </div>
             <select className="search-input" style={{width: '40%', padding: '0.5rem', fontSize: '0.85rem'}} value={targetCurrency} onChange={e => setTargetCurrency(e.target.value)}>
               {Object.keys(exchangeRates).map(cur => (
                 <option key={cur} value={cur}>{cur}</option>
               ))}
             </select>
          </div>
          <div style={{background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center'}}>
            <span style={{fontSize: '0.85rem', color: '#94a3b8'}}>Equals: </span>
            <strong style={{color: '#10b981', fontSize: '1rem'}}>{currencyResult} {targetCurrency}</strong>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuickWidgets;
