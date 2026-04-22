import { useState, useEffect } from 'react';
import { Calculator, ArrowRightLeft, Activity, Scale, Ruler, DollarSign } from 'lucide-react';
import ToolHeader from '../components/ToolHeader';

const conversionChart = {
  length: {
    icon: Ruler,
    base: 'meters',
    units: {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      millimeters: 1000,
      miles: 0.000621371,
      yards: 1.09361,
      feet: 3.28084,
      inches: 39.3701
    }
  },
  weight: {
    icon: Scale,
    base: 'kg',
    units: {
      kg: 1,
      grams: 1000,
      mg: 1000000,
      lbs: 2.20462,
      oz: 35.274,
      tonnes: 0.001
    }
  },
  temperature: { icon: Activity },
  currency: { icon: DollarSign }
};

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [val1, setVal1] = useState(1);
  const [unit1, setUnit1] = useState('meters');
  const [unit2, setUnit2] = useState('feet');
  const [val2, setVal2] = useState(3.28084);

  // Currency state
  const [currencyRates, setCurrencyRates] = useState({});
  const [loadingCurrency, setLoadingCurrency] = useState(false);

  useEffect(() => {
    if (category === 'length') { setUnit1('meters'); setUnit2('feet'); }
    if (category === 'weight') { setUnit1('kg'); setUnit2('lbs'); }
    if (category === 'temperature') { setUnit1('c'); setUnit2('f'); }
    if (category === 'currency') { 
      setUnit1('USD'); setUnit2('EUR'); 
      if (Object.keys(currencyRates).length === 0) fetchCurrency();
    }
  }, [category]);

  const fetchCurrency = async () => {
    setLoadingCurrency(true);
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();
      setCurrencyRates(data.rates);
    } catch(e) {
      console.error(e);
    }
    setLoadingCurrency(false);
  };

  const handleConvert = (sourceVal, u1, u2, direction) => {
    if (sourceVal === '') {
      if (direction === 1) setVal2(''); else setVal1('');
      return;
    }
    
    let res = 0;
    const v = parseFloat(sourceVal);

    if (category === 'temperature') {
      if (u1 === 'c' && u2 === 'f') res = (v * 9/5) + 32;
      else if (u1 === 'f' && u2 === 'c') res = (v - 32) * 5/9;
      else if (u1 === 'c' && u2 === 'k') res = v + 273.15;
      else if (u1 === 'k' && u2 === 'c') res = v - 273.15;
      else if (u1 === 'f' && u2 === 'k') res = (v - 32) * 5/9 + 273.15;
      else if (u1 === 'k' && u2 === 'f') res = (v - 273.15) * 9/5 + 32;
      else res = v;
    } 
    else if (category === 'currency') {
      if (!currencyRates[u1] || !currencyRates[u2]) return;
      const baseUSD = v / currencyRates[u1];
      res = baseUSD * currencyRates[u2];
    }
    else {
      const map = conversionChart[category].units;
      const baseValue = v / map[u1];
      res = baseValue * map[u2];
    }

    // Smart formatting to avoid crazy decimals
    const formattedRes = res % 1 === 0 ? res.toString() : res.toFixed(4).replace(/\.?0+$/, '');
    
    if (direction === 1) setVal2(formattedRes);
    else setVal1(formattedRes);
  };

  const onUpdate1 = (v) => { setVal1(v); handleConvert(v, unit1, unit2, 1); };
  const onUpdate2 = (v) => { setVal2(v); handleConvert(v, unit2, unit1, 2); };
  const onUnit1Change = (u) => { setUnit1(u); handleConvert(val1, u, unit2, 1); };
  const onUnit2Change = (u) => { setUnit2(u); handleConvert(val1, unit1, u, 1); };

  const handleSwap = () => {
    const tempUnit = unit1;
    setUnit1(unit2);
    setUnit2(tempUnit);
    handleConvert(val1, unit2, tempUnit, 1);
  };

  const getOptions = () => {
    if (category === 'temperature') return Object.entries({'c': 'Celsius', 'f': 'Fahrenheit', 'k': 'Kelvin'});
    if (category === 'currency') return Object.keys(currencyRates).map(k => [k, k]);
    return Object.keys(conversionChart[category].units).map(u => [u, u]);
  };

  return (
    <div className="page-container">
      <ToolHeader 
        title="Universal Converter" 
        subtitle="Length, weight, temperature, and live foreign exchange rates." 
        icon={Calculator}
        path="/converter"
      />

      {/* Category Selection Tabs */}
      <div>
        {Object.entries(conversionChart).map(([cat, config]) => {
          const Icon = config.icon;
          const isActive = category === cat;
          return (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', 
                borderRadius: '16px', border: 'none',
                background: isActive ? 'linear-gradient(135deg, var(--gradient-1) 0%, var(--gradient-2) 100%)' : 'rgba(255,255,255,0.05)',
                color: isActive ? 'white' : '#94a3b8',
                cursor: 'pointer', textTransform: 'capitalize', fontWeight: isActive ? '600' : '400',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 10px 20px -5px rgba(59, 130, 246, 0.4)' : 'none'
              }}
            >
              <Icon size={18} /> {cat}
            </button>
          );
        })}
      </div>

      <div className="result-card" style={{padding: '3rem 2rem', position: 'relative', overflow: 'hidden'}}>
        
        {/* Subtle background glow */}
        <div style={{position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, rgba(0,0,0,0) 70%)', zIndex: 0, pointerEvents: 'none'}}></div>

        <div style={{position: 'relative', zIndex: 1}}>
          {category === 'currency' && loadingCurrency && <div style={{textAlign: 'center', marginBottom: '2rem', color: '#60a5fa'}}>🚀 Fetching live exchange rates...</div>}
          
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            
            {/* Box 1 */}
            <div style={{flex: '1 1 250px', background: 'rgba(0,0,0,0.4)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'}}>
              <select 
                value={unit1} 
                onChange={e => onUnit1Change(e.target.value)}
                style={{width: '100%', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', textTransform: 'capitalize', outline: 'none', cursor: 'pointer', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}
              >
                {getOptions().map(([val, label]) => <option key={val} value={val} style={{color: 'black'}}>{label}</option>)}
              </select>
              <input 
                type="number" 
                value={val1} 
                onChange={e => onUpdate1(e.target.value)} 
                style={{width: '100%', background: 'transparent', border: 'none', fontSize: '3.5rem', fontWeight: 'bold', color: '#f8fafc', outline: 'none', padding: 0}}
                placeholder="0"
              />
            </div>

            {/* Swap Button */}
            <button 
              onClick={handleSwap}
              style={{
                width: '60px', height: '60px', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--card-border)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 10, alignSelf: 'center', margin: '0 auto'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(180deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
            >
              <ArrowRightLeft size={24} color="#60a5fa" />
            </button>

            {/* Box 2 */}
            <div style={{flex: '1 1 250px', background: 'rgba(0,0,0,0.4)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'}}>
              <select 
                value={unit2} 
                onChange={e => onUnit2Change(e.target.value)}
                style={{width: '100%', background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', textTransform: 'capitalize', outline: 'none', cursor: 'pointer', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}
              >
                {getOptions().map(([val, label]) => <option key={val} value={val} style={{color: 'black'}}>{label}</option>)}
              </select>
              <input 
                type="number" 
                value={val2} 
                onChange={e => onUpdate2(e.target.value)} 
                style={{width: '100%', background: 'transparent', border: 'none', fontSize: '3.5rem', fontWeight: 'bold', color: '#f8fafc', outline: 'none', padding: 0}}
                placeholder="0"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
