import { useState } from 'react';
import { Receipt, Trash2, Plus, Users, Calculator } from 'lucide-react';

const ExpenseSplitter = () => {
  const [total, setTotal] = useState('');
  const [tax, setTax] = useState('');
  const [tip, setTip] = useState('');
  const [people, setPeople] = useState([{ name: 'Alice', amountShared: 1 }, { name: 'Bob', amountShared: 1 }]);

  const handleAddPerson = () => {
    setPeople([...people, { name: `Person ${people.length + 1}`, amountShared: 1 }]);
  };

  const handleRemovePerson = (index) => {
    if (people.length > 1) {
      setPeople(people.filter((_, i) => i !== index));
    }
  };

  const updatePerson = (index, field, value) => {
    const newPeople = [...people];
    newPeople[index][field] = value;
    setPeople(newPeople);
  };

  const calculateSplit = () => {
    const baseTotal = parseFloat(total) || 0;
    const taxAmt = parseFloat(tax) || 0;
    const tipAmt = parseFloat(tip) || 0;
    
    // Total parts (some might pay for 2 portions)
    const totalParts = people.reduce((acc, curr) => acc + (parseFloat(curr.amountShared) || 1), 0);
    
    if (totalParts === 0 || baseTotal === 0) return [];
    
    const finalTotal = baseTotal + taxAmt + tipAmt;
    const costPerPart = finalTotal / totalParts;
    
    return people.map(p => ({
      name: p.name,
      amount: (parseFloat(p.amountShared) || 1) * costPerPart
    }));
  };

  const results = calculateSplit();
  const grandTotal = (parseFloat(total) || 0) + (parseFloat(tax) || 0) + (parseFloat(tip) || 0);

  return (
    <div className="page-container">
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Receipt style={{display: 'inline', marginRight: '10px'}} /> Expense Splitter</h1>
        <p className="subtitle">Split the dinner bill instantly, including tax and tip.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Input Form */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '2rem'}}>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1'}}><Calculator size={20}/> Bill Details</h3>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem'}}>
              <div>
                <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Total Bill Amount</label>
                <div style={{position: 'relative'}}>
                  <span style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}>$</span>
                  <input type="number" className="search-input" value={total} onChange={e => setTotal(e.target.value)} style={{width: '100%', paddingLeft: '2rem', background: 'rgba(0,0,0,0.2)'}} placeholder="0.00"/>
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem'}}>
                <div>
                  <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Tax</label>
                  <input type="number" className="search-input" value={tax} onChange={e => setTax(e.target.value)} style={{width: '100%', background: 'rgba(0,0,0,0.2)'}} placeholder="0.00"/>
                </div>
                <div>
                  <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Tip</label>
                  <input type="number" className="search-input" value={tip} onChange={e => setTip(e.target.value)} style={{width: '100%', background: 'rgba(0,0,0,0.2)'}} placeholder="0.00"/>
                </div>
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
              <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1'}}><Users size={20}/> People</h3>
              <button className="btn btn-secondary" onClick={handleAddPerson} style={{padding: '0.4rem 0.8rem', fontSize: '0.9rem'}}><Plus size={16}/> Add Person</button>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {people.map((p, i) => (
                <div key={i} style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                  <input type="text" className="search-input" value={p.name} onChange={e => updatePerson(i, 'name', e.target.value)} style={{flex: 2, background: 'rgba(0,0,0,0.2)', padding: '0.6rem 1rem'}} placeholder="Name"/>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1}}>
                    <span style={{color: '#64748b', fontSize: '0.8rem'}}>Shares:</span>
                    <input type="number" min="0.5" step="0.5" className="search-input" value={p.amountShared} onChange={e => updatePerson(i, 'amountShared', e.target.value)} style={{width: '100%', background: 'rgba(0,0,0,0.2)', padding: '0.6rem'}}/>
                  </div>
                  <button onClick={() => handleRemovePerson(i)} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem'}} disabled={people.length === 1}>
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Block */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '2rem', height: '100%', background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.1), rgba(0,0,0,0.3))'}}>
            <h3 style={{marginBottom: '2rem', color: '#cbd5e1', textAlign: 'center'}}>Final Breakdown</h3>
            
            <div style={{textAlign: 'center', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
              <p style={{color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem'}}>Grand Total</p>
              <h2 style={{fontFamily: 'monospace', fontSize: '3.5rem', color: '#f8fafc', margin: 0}}>${grandTotal.toFixed(2)}</h2>
            </div>
            
            {results.length > 0 ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {results.map((r, i) => (
                  <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '12px'}}>
                    <span style={{fontSize: '1.2rem', fontWeight: '500'}}>{r.name}</span>
                    <span style={{fontFamily: 'monospace', fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold'}}>${r.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{color: '#64748b', textAlign: 'center'}}>Enter bill amount to see breakdown.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSplitter;
