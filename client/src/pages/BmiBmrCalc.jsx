import { useState } from 'react';
import { Activity, Droplet } from 'lucide-react';

const BmiBmrCalc = () => {
  const [system, setSystem] = useState('metric'); // metric or imperial
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70); // kg or lbs
  const [heightMode, setHeightMode] = useState('cm'); // cm or ft/in
  const [heightCm, setHeightCm] = useState(175);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);

  const calculate = () => {
    let wKg = weight;
    let hCm = heightCm;

    if (system === 'imperial') {
      wKg = weight * 0.453592;
      hCm = (heightFt * 30.48) + (heightIn * 2.54);
    }

    if (wKg <= 0 || hCm <= 0 || age <= 0) return null;

    // BMI Calculation: kg / (m^2)
    const hM = hCm / 100;
    const bmi = wKg / (hM * hM);

    // BMR Calculation (Mifflin-St Jeor)
    let bmr = (10 * wKg) + (6.25 * hCm) - (5 * age);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    // Water Calculation (avg 35ml per kg of body weight)
    const waterLitres = (wKg * 35) / 1000;
    const waterOz = waterLitres * 33.814;

    return { bmi, bmr, waterLitres, waterOz };
  };

  const data = calculate();

  const getBmiStatus = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: '#3b82f6' };
    if (bmi < 25) return { label: 'Normal Weight', color: '#10b981' };
    if (bmi < 30) return { label: 'Overweight', color: '#f59e0b' };
    return { label: 'Obese', color: '#ef4444' };
  };

  const status = data ? getBmiStatus(data.bmi) : null;

  return (
    <div className="page-container">
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Activity style={{display: 'inline', marginRight: '10px'}} /> Health Calculator (BMI & BMR)</h1>
        <p className="subtitle">Find your Body Mass Index, resting metabolic rate, and daily hydration needs.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Controls */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem', background: 'rgba(0,0,0,0.3)', padding: '0.4rem', borderRadius: '12px'}}>
              <button 
                onClick={() => setSystem('metric')}
                style={{flex: 1, padding: '0.5rem', borderRadius: '8px', border: 'none', background: system === 'metric' ? 'var(--gradient-1)' : 'transparent', color: system === 'metric' ? 'white' : '#94a3b8', cursor: 'pointer', fontWeight: 'bold'}}
              >Metric (kg, cm)</button>
              <button 
                onClick={() => setSystem('imperial')}
                style={{flex: 1, padding: '0.5rem', borderRadius: '8px', border: 'none', background: system === 'imperial' ? 'var(--gradient-1)' : 'transparent', color: system === 'imperial' ? 'white' : '#94a3b8', cursor: 'pointer', fontWeight: 'bold'}}
              >Imperial (lbs, ft)</button>
            </div>

            <div style={{display: 'flex', gap: '1rem'}}>
               <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                 <input type="radio" checked={gender === 'male'} onChange={() => setGender('male')} /> Male
               </label>
               <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                 <input type="radio" checked={gender === 'female'} onChange={() => setGender('female')} /> Female
               </label>
            </div>

            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Age (Years)</label>
              <input type="number" min="1" max="120" className="search-input" value={age} onChange={e => setAge(parseInt(e.target.value) || 0)} style={{width: '100%', background: 'rgba(0,0,0,0.2)'}} />
            </div>

            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Weight ({system === 'metric' ? 'kg' : 'lbs'})</label>
              <input type="number" min="1" max="500" className="search-input" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} style={{width: '100%', background: 'rgba(0,0,0,0.2)'}} />
            </div>

            {system === 'metric' ? (
              <div>
                <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Height (cm)</label>
                <input type="number" min="1" max="300" className="search-input" value={heightCm} onChange={e => setHeightCm(parseFloat(e.target.value) || 0)} style={{width: '100%', background: 'rgba(0,0,0,0.2)'}} />
              </div>
            ) : (
              <div style={{display: 'flex', gap: '1rem'}}>
                <div style={{flex: 1}}>
                   <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Feet</label>
                   <input type="number" min="1" max="8" className="search-input" value={heightFt} onChange={e => setHeightFt(parseInt(e.target.value) || 0)} style={{width: '100%', background: 'rgba(0,0,0,0.2)'}} />
                </div>
                <div style={{flex: 1}}>
                   <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Inches</label>
                   <input type="number" min="0" max="11" className="search-input" value={heightIn} onChange={e => setHeightIn(parseInt(e.target.value) || 0)} style={{width: '100%', background: 'rgba(0,0,0,0.2)'}} />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Results Block */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '3rem 2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            
            {data ? (
              <>
                <div style={{textAlign: 'center', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                  <p style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Body Mass Index (BMI)</p>
                  <h2 style={{fontSize: '4rem', margin: 0, color: status.color, fontWeight: 'bold'}}>{data.bmi.toFixed(1)}</h2>
                  <div style={{display: 'inline-block', background: `${status.color}33`, color: status.color, padding: '0.4rem 1rem', borderRadius: '99px', marginTop: '0.5rem', fontWeight: 'bold'}}>{status.label}</div>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                  <div style={{background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center'}}>
                    <Activity size={24} color="#3b82f6" style={{margin: '0 auto 0.5rem auto'}} />
                    <p style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem'}}>BMR (Calories/Day)</p>
                    <h3 style={{color: '#3b82f6', fontSize: '1.8rem', margin: 0}}>{Math.round(data.bmr).toLocaleString()}</h3>
                  </div>

                  <div style={{background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center'}}>
                    <Droplet size={24} color="#10b981" style={{margin: '0 auto 0.5rem auto'}} />
                    <p style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Daily Water Req.</p>
                    <h3 style={{color: '#10b981', fontSize: '1.8rem', margin: 0}}>{system === 'metric' ? `${data.waterLitres.toFixed(1)} L` : `${Math.round(data.waterOz)} oz`}</h3>
                  </div>
                </div>
              </>
            ) : (
              <p style={{textAlign: 'center', color: '#64748b', marginTop: '4rem'}}>Please enter valid values to see your health calculation.</p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default BmiBmrCalc;
