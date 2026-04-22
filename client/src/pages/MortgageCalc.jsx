import { useState } from 'react';
import { Home, PieChart } from 'lucide-react';

const MortgageCalc = () => {
  const [price, setPrice] = useState(350000);
  const [downpaymentPerc, setDownpaymentPerc] = useState(20);
  const [interest, setInterest] = useState(6.5);
  const [years, setYears] = useState(30);

  const calculateMortgage = () => {
    const principal = price - (price * (downpaymentPerc / 100));
    const r = (interest / 100) / 12; // monthly interest rate
    const n = years * 12; // number of payments
    
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
    let monthly = 0;
    if (r > 0) {
      monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      monthly = principal / n;
    }

    const totalPaid = monthly * n;
    const totalInterest = totalPaid - principal;
    const dpAmount = price * (downpaymentPerc / 100);

    return {
      monthly: monthly || 0,
      principal: principal || 0,
      totalInterest: totalInterest || 0,
      totalPaid: totalPaid || 0,
      dpAmount: dpAmount || 0
    };
  };

  const data = calculateMortgage();
  
  // Calculate segments for the visual bar 
  // We compare Principal, Interest, and Downpayment relative to the Total out of pocket (Price + Interest)
  const totalCostOfHome = data.principal + data.totalInterest + data.dpAmount;
  const pPerc = (data.principal / totalCostOfHome) * 100 || 0;
  const iPerc = (data.totalInterest / totalCostOfHome) * 100 || 0;
  const dPerc = (data.dpAmount / totalCostOfHome) * 100 || 0;

  return (
    <div className="page-container">
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Home style={{display: 'inline', marginRight: '10px'}} /> Mortgage Calculator</h1>
        <p className="subtitle">Visualize the true cost of your home loan over time.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Controls */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Home Price</label>
              <div style={{position: 'relative'}}>
                <span style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}>$</span>
                <input type="number" className="search-input" value={price} onChange={e => setPrice(parseFloat(e.target.value) || 0)} style={{width: '100%', paddingLeft: '2.5rem', background: 'rgba(0,0,0,0.2)'}} />
              </div>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Down Payment (%)</span>
                <span>{downpaymentPerc}% (${data.dpAmount.toLocaleString(undefined, {maximumFractionDigits: 0})})</span>
              </label>
              <input type="range" min="0" max="100" value={downpaymentPerc} onChange={e => setDownpaymentPerc(e.target.value)} style={{width: '100%', accentColor: '#10b981'}}/>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Interest Rate (%)</span>
                <span>{interest}%</span>
              </label>
              <input type="range" min="0" max="15" step="0.1" value={interest} onChange={e => setInterest(e.target.value)} style={{width: '100%', accentColor: '#ef4444'}}/>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Loan Term (Years)</span>
                <span>{years} yr</span>
              </label>
              <input type="range" min="5" max="50" step="5" value={years} onChange={e => setYears(e.target.value)} style={{width: '100%', accentColor: '#3b82f6'}}/>
            </div>

          </div>
        </div>

        {/* Results Block */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '3rem 2rem', height: '100%', display: 'flex', flexDirection: 'column'}}>
            
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <p style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Estimated Monthly Payment</p>
              <h2 style={{fontSize: '4rem', margin: 0, color: '#f8fafc', fontWeight: 'bold'}}>${data.monthly.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
              <p style={{color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem'}}>Principal & Interest only. Does not include taxes/insurance.</p>
            </div>

            {/* Breakdown Visual Bar */}
            <div style={{width: '100%', height: '24px', borderRadius: '12px', display: 'flex', overflow: 'hidden', marginBottom: '2rem'}}>
              <div style={{width: `${dPerc}%`, background: '#10b981'}} title={`Down Payment: $${data.dpAmount}`}></div>
              <div style={{width: `${pPerc}%`, background: '#3b82f6'}} title={`Loan Principal: $${data.principal}`}></div>
              <div style={{width: `${iPerc}%`, background: '#ef4444'}} title={`Total Interest: $${data.totalInterest}`}></div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', borderLeft: '4px solid #10b981'}}>
                <span style={{color: '#cbd5e1'}}>Down Payment</span>
                <span style={{fontWeight: 'bold'}}>${data.dpAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.8rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', borderLeft: '4px solid #3b82f6'}}>
                <span style={{color: '#cbd5e1'}}>Principal Loan Amount</span>
                <span style={{fontWeight: 'bold'}}>${data.principal.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444'}}>
                <span style={{color: '#cbd5e1'}}>Total Interest Paid</span>
                <span style={{fontWeight: 'bold'}}>${data.totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '1.2rem 0.8rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '0.5rem', fontWeight: 'bold'}}>
                <span style={{color: '#94a3b8'}}>Total Cost of Home</span>
                <span style={{fontSize: '1.2rem', color: '#f8fafc'}}>${totalCostOfHome.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MortgageCalc;
