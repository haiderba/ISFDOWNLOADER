import { useState } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(250);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(7); // annual %

  const calculate = () => {
    let totalBal = principal || 0;
    let totalContributed = principal || 0;
    const rate = (interestRate || 0) / 100 / 12; // monthly rate
    const months = (years || 0) * 12;

    for (let i = 0; i < months; i++) {
        // add interest to balance, then add the new monthly contribution at end of month
        totalBal += (totalBal * rate);
        totalBal += monthlyContribution;
        totalContributed += monthlyContribution;
    }

    const totalInterest = totalBal - totalContributed;

    return { totalBal, totalContributed, totalInterest };
  };

  const data = calculate();

  // For visual bar relative widths
  const contributedPerc = (data.totalContributed / data.totalBal) * 100 || 0;
  const interestPerc = (data.totalInterest / data.totalBal) * 100 || 0;

  return (
    <div className="page-container">
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><TrendingUp style={{display: 'inline', marginRight: '10px'}} /> Investment & Compound Interest</h1>
        <p className="subtitle">See how your money snowballs over time with regular contributions.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Controls */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Initial Deposit</label>
              <div style={{position: 'relative'}}>
                <span style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}>$</span>
                <input type="number" min="0" className="search-input" value={principal} onChange={e => setPrincipal(parseFloat(e.target.value) || 0)} style={{width: '100%', paddingLeft: '2.5rem', background: 'rgba(0,0,0,0.2)'}} />
              </div>
            </div>

            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Monthly Contribution</label>
              <div style={{position: 'relative'}}>
                <span style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}>$</span>
                <input type="number" min="0" className="search-input" value={monthlyContribution} onChange={e => setMonthlyContribution(parseFloat(e.target.value) || 0)} style={{width: '100%', paddingLeft: '2.5rem', background: 'rgba(0,0,0,0.2)'}} />
              </div>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Expected Return Rate (%)</span>
                <span>{interestRate}%</span>
              </label>
              <input type="range" min="1" max="15" step="0.5" value={interestRate} onChange={e => setInterestRate(e.target.value)} style={{width: '100%', accentColor: 'var(--gradient-1)'}}/>
              <p style={{fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem'}}>S&P 500 historical average is ~7-10%.</p>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Years to Grow</span>
                <span>{years} Years</span>
              </label>
              <input type="range" min="1" max="50" value={years} onChange={e => setYears(e.target.value)} style={{width: '100%', accentColor: '#3b82f6'}}/>
            </div>

          </div>
        </div>

        {/* Results Visualiser */}
        <div style={{flex: 1.5, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '3rem 2rem', height: '100%', display: 'flex', flexDirection: 'column'}}>
            
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <p style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Future Portfolio Value</p>
              <h2 style={{fontSize: '4.5rem', margin: 0, color: '#f8fafc', fontWeight: 'bold'}}>${data.totalBal.toLocaleString(undefined, {maximumFractionDigits: 0})}</h2>
            </div>
            
            <h3 style={{fontSize: '1rem', color: '#cbd5e1', marginBottom: '1rem'}}>Portfolio Breakdown</h3>
            
            {/* Visual Bar */}
            <div style={{width: '100%', height: '30px', borderRadius: '12px', display: 'flex', overflow: 'hidden', marginBottom: '2rem'}}>
              <div style={{width: `${contributedPerc}%`, background: '#3b82f6', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem', fontSize: '0.8rem', color: 'white', fontWeight: 'bold'}} title="Total Out of Pocket">
                 {contributedPerc > 15 ? 'Your Deposits' : ''}
              </div>
              <div style={{width: `${interestPerc}%`, background: '#10b981', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem', fontSize: '0.8rem', color: 'white', fontWeight: 'bold'}} title="Total Interest Gained">
                 {interestPerc > 15 ? 'Interest Gained' : ''}
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', borderLeft: '4px solid #3b82f6'}}>
                <span style={{color: '#cbd5e1'}}>Total Amount Deposited</span>
                <span style={{fontWeight: 'bold'}}>${data.totalContributed.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', borderLeft: '4px solid #10b981'}}>
                <span style={{color: '#cbd5e1'}}>Total Interest Gained <TrendingUp size={14} style={{display: 'inline'}}/></span>
                <span style={{color: '#10b981', fontWeight: 'bold'}}>+ ${data.totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CompoundInterest;
