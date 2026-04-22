import { useState } from 'react';
import { Calendar } from 'lucide-react';

const AgeDateCalc = () => {
  const [tab, setTab] = useState('age'); // 'age' or 'diff'
  const [dob, setDob] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 25);
    return d.toISOString().split('T')[0];
  });
  const [date1, setDate1] = useState(new Date().toISOString().split('T')[0]);
  const [date2, setDate2] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });

  const calcAge = () => {
    if (!dob) return null;
    const birth = new Date(dob);
    const now = new Date();
    
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // get days in previous month
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    return { years, months, days, totalDays };
  };

  const calcDiff = () => {
    if (!date1 || !date2) return null;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let years = Math.floor(diffDays / 365);
    let remainingDays = diffDays % 365;
    let months = Math.floor(remainingDays / 30);
    let days = remainingDays % 30;

    return { years, months, days, totalDays: diffDays };
  };

  const ageData = tab === 'age' ? calcAge() : calcDiff();

  return (
    <div className="page-container">
      <header className="page-header">
        <h1><Calendar /> Age & Date Calculator</h1>
        <p className="subtitle">Find your exact age down to the day, or diff two dates.</p>
      </header>

      <div>
        <button 
          onClick={() => setTab('age')}
          className="btn"
          style={{background: tab === 'age' ? 'var(--gradient-1)' : 'rgba(0,0,0,0.3)', padding: '0.8rem 2rem'}}
        >Age Calculator</button>
        <button 
          onClick={() => setTab('diff')}
          className="btn"
          style={{background: tab === 'diff' ? 'var(--gradient-1)' : 'rgba(0,0,0,0.3)', padding: '0.8rem 2rem'}}
        >Date Difference</button>
      </div>

      <div className="result-card" style={{padding: '3rem 2rem'}}>
        
        {/* Inputs */}
        {tab === 'age' && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem'}}>
            <label style={{color: '#94a3b8', marginBottom: '0.5rem'}}>Enter your Date of Birth</label>
            <input 
              type="date" 
              className="search-input" 
              value={dob} 
              onChange={e => setDob(e.target.value)} 
              style={{background: 'rgba(0,0,0,0.4)', fontSize: '1.5rem', padding: '1rem', width: '100%', maxWidth: '300px', appearance: 'none', colorScheme: 'dark'}}
            />
          </div>
        )}

        {tab === 'diff' && (
          <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap'}}>
            <div>
              <label style={{color: '#94a3b8', marginBottom: '0.5rem', display: 'block'}}>Start Date</label>
              <input type="date" className="search-input" value={date1} onChange={e => setDate1(e.target.value)} style={{background: 'rgba(0,0,0,0.4)', fontSize: '1.2rem', padding: '0.8rem', colorScheme: 'dark'}} />
            </div>
            <div>
              <label style={{color: '#94a3b8', marginBottom: '0.5rem', display: 'block'}}>End Date</label>
              <input type="date" className="search-input" value={date2} onChange={e => setDate2(e.target.value)} style={{background: 'rgba(0,0,0,0.4)', fontSize: '1.2rem', padding: '0.8rem', colorScheme: 'dark'}} />
            </div>
          </div>
        )}

        {/* Results */}
        {ageData && (
          <div style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', textAlign: 'center'}}>
            
            <h2 style={{fontSize: '3rem', margin: '0 0 1rem 0', color: '#f8fafc'}}>
              {ageData.years} <span style={{fontSize: '1rem', color: '#64748b', fontWeight: 'normal', textTransform: 'uppercase', marginRight: '1rem'}}>Years</span>
              {ageData.months} <span style={{fontSize: '1rem', color: '#64748b', fontWeight: 'normal', textTransform: 'uppercase', marginRight: '1rem'}}>Months</span>
              {ageData.days} <span style={{fontSize: '1rem', color: '#64748b', fontWeight: 'normal', textTransform: 'uppercase'}}>Days</span>
            </h2>

            {tab === 'age' && (
              <p style={{fontSize: '1.2rem', color: '#10b981'}}>You are exactly <strong>{ageData.totalDays.toLocaleString()}</strong> days old!</p>
            )}
            {tab === 'diff' && (
              <p style={{fontSize: '1.2rem', color: '#3b82f6'}}>The difference is exactly <strong>{ageData.totalDays.toLocaleString()}</strong> days.</p>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default AgeDateCalc;
