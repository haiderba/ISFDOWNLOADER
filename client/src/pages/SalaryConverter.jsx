import { useState } from 'react';
import { Briefcase, CreditCard } from 'lucide-react';

const SalaryConverter = () => {
  const [baseVal, setBaseVal] = useState(75000);
  const [baseType, setBaseType] = useState('year'); // year, month, week, hour
  const [hoursPerWeek, setHoursPerWeek] = useState(40);

  // Sync function: convert input to yearly, then derive everything else
  const calculateAll = () => {
    let yearly = 0;
    const v = baseVal || 0;
    const hpw = hoursPerWeek || 40;
    
    // Normalization assumptions: 52 weeks a year.
    if (baseType === 'year') yearly = v;
    else if (baseType === 'month') yearly = v * 12;
    else if (baseType === 'week') yearly = v * 52;
    else if (baseType === 'hour') yearly = v * hpw * 52;

    return {
      yearly: yearly,
      monthly: yearly / 12,
      weekly: yearly / 52,
      daily: (yearly / 52) / 5, // assuming 5 work days
      hourly: (yearly / 52) / hpw
    };
  };

  const data = calculateAll();

  // Handle Input Change and Auto-Sync
  const handleInput = (val, type) => {
    setBaseVal(parseFloat(val) || 0);
    setBaseType(type);
  };

  // Rough Tax Estimate (assuming flat ~22% for demo purposes, UI emphasizes it is an estimate)
  const estTaxRate = 0.22;
  const takeHomeAnnual = data.yearly * (1 - estTaxRate);

  return (
    <div className="page-container" style={{maxWidth: '900px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Briefcase style={{display: 'inline', marginRight: '10px'}} /> Salary & Hourly Wage Converter</h1>
        <p className="subtitle">Type into any field to instantly convert your wages. (Assuming 52 work weeks)</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Sync Controls */}
        <div style={{flex: 1.5, minWidth: '350px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div style={{marginBottom: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Hours Worked per Week</span>
                <span style={{color: '#60a5fa', fontWeight: 'bold'}}>{hoursPerWeek} hrs</span>
              </label>
              <input type="range" min="10" max="80" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} style={{width: '100%', accentColor: 'var(--gradient-1)'}}/>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
               
               <div>
                  <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Annual Salary (Yearly)</label>
                  <div style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}>$</span>
                    <input type="number" className="search-input" value={baseType === 'year' ? baseVal : data.yearly.toFixed(2)} onChange={e => handleInput(e.target.value, 'year')} style={{width: '100%', paddingLeft: '2.5rem', background: 'rgba(0,0,0,0.2)', fontSize: '1.2rem', fontWeight: 'bold'}} />
                  </div>
               </div>

               <div>
                  <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Monthly Wage</label>
                  <div style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}>$</span>
                    <input type="number" className="search-input" value={baseType === 'month' ? baseVal : data.monthly.toFixed(2)} onChange={e => handleInput(e.target.value, 'month')} style={{width: '100%', paddingLeft: '2.5rem', background: 'rgba(0,0,0,0.2)', fontSize: '1.2rem'}} />
                  </div>
               </div>

               <div>
                  <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Weekly Wage</label>
                  <div style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}>$</span>
                    <input type="number" className="search-input" value={baseType === 'week' ? baseVal : data.weekly.toFixed(2)} onChange={e => handleInput(e.target.value, 'week')} style={{width: '100%', paddingLeft: '2.5rem', background: 'rgba(0,0,0,0.2)', fontSize: '1.2rem'}} />
                  </div>
               </div>

               <div>
                  <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Hourly Rate</label>
                  <div style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}>$</span>
                    <input type="number" className="search-input" value={baseType === 'hour' ? baseVal : data.hourly.toFixed(2)} onChange={e => handleInput(e.target.value, 'hour')} style={{width: '100%', paddingLeft: '2.5rem', background: 'rgba(0,0,0,0.2)', fontSize: '1.2rem', color: '#10b981', fontWeight: 'bold'}} />
                  </div>
               </div>

            </div>
          </div>
        </div>

        {/* Take-Home Visualizer */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '3rem 2rem', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(145deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))'}}>
             
             <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <CreditCard size={40} color="#60a5fa" style={{margin: '0 auto 1rem auto'}} />
                <p style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Estimated Take-Home (Yearly)</p>
                <h2 style={{fontSize: '3rem', margin: 0, color: '#f8fafc', fontWeight: 'bold'}}>${takeHomeAnnual.toLocaleString(undefined, {maximumFractionDigits: 0})}</h2>
                <p style={{fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem'}}>Assumes ~22% flat tax rate deduction. Varies heavily by location.</p>
             </div>

             <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8'}}>
                  <span>Pre-Tax Gross</span>
                  <span>${data.yearly.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', color: '#ef4444'}}>
                  <span>Estimated Taxes</span>
                  <span>- ${(data.yearly - takeHomeAnnual).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SalaryConverter;
