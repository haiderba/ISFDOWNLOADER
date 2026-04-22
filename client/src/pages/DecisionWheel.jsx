import { useState } from 'react';
import { Dices, Trash2 } from 'lucide-react';

const DecisionWheel = () => {
  const [items, setItems] = useState(['Pizza', 'Burgers', 'Sushi', 'Tacos', 'Salad']);
  const [newItem, setNewItem] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);

  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e'];

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const spin = () => {
    if (items.length < 2 || spinning) return;
    
    setSpinning(true);
    setWinner(null);
    
    // Pick a random winner
    const winnerIndex = Math.floor(Math.random() * items.length);
    const sliceAngle = 360 / items.length;
    
    // Calculate the perfect rotation to land on winner
    // Randomize slightly within the slice
    const offset = Math.floor(Math.random() * (sliceAngle - 10)) + 5;
    
    // Current rotation + 5 full spins + perfect landing angle
    const newRotation = rotation + (360 * 5) + (360 - (winnerIndex * sliceAngle)) - rotation % 360 - offset;
    
    setRotation(newRotation);
    
    setTimeout(() => {
      setSpinning(false);
      setWinner(items[winnerIndex]);
    }, 4000); // Wait for CSS transition (4s)
  };

  // Build conic-gradient for the wheel
  const getGradient = () => {
    if (items.length === 0) return 'gray';
    const angle = 100 / items.length;
    let gradientParts = [];
    let currentPercent = 0;
    
    items.forEach((item, index) => {
      const color = colors[index % colors.length];
      gradientParts.push(`${color} ${currentPercent}% ${currentPercent + angle}%`);
      currentPercent += angle;
    });
    
    return `conic-gradient(${gradientParts.join(', ')})`;
  };

  return (
    <div className="page-container">
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Dices style={{display: 'inline', marginRight: '10px'}} /> Decision Wheel</h1>
        <p className="subtitle">Let fate decide. Add your choices and spin the wheel.</p>
      </header>

      <div style={{display: 'flex', gap: '4rem', flexWrap: 'wrap-reverse', justifyContent: 'center'}}>
        
        {/* Editor */}
        <div style={{flex: 1, minWidth: '300px', maxWidth: '400px'}}>
          <div className="result-card" style={{padding: '1.5rem'}}>
            <h3 style={{marginBottom: '1rem', color: '#cbd5e1'}}>Choices</h3>
            
            <form onSubmit={handleAddItem} style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem'}}>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Add a new choice..." 
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                style={{flex: 1, background: 'rgba(0,0,0,0.2)', borderRadius: '8px'}}
              />
              <button type="submit" className="btn" style={{padding: '0.5rem 1rem'}}>+</button>
            </form>

            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto'}}>
              {items.map((item, index) => (
                <div key={index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1rem', borderRadius: '8px', borderLeft: `4px solid ${colors[index % colors.length]}`}}>
                  <span style={{fontWeight: '500'}}>{item}</span>
                  <button onClick={() => handleRemoveItem(index)} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem'}}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {items.length === 0 && <p style={{color: '#64748b', textAlign: 'center'}}>No items added.</p>}
            </div>
            
            <button className="btn" style={{width: '100%', marginTop: '1.5rem'}} onClick={() => setItems([])}>Clear All</button>
          </div>
        </div>

        {/* Wheel View */}
        <div style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{position: 'relative', width: '350px', height: '350px', marginBottom: '2rem'}}>
            {/* Pointer */}
            <div style={{position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: '30px solid white', zIndex: 10}}></div>
            
            {/* Safe zone for pointer indicator visual */}
            <div style={{position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '4px', height: '20px', background: 'rgba(0,0,0,0.2)', zIndex: 9}}></div>

            {/* The actual wheel */}
            <div 
              style={{
                width: '100%', 
                height: '100%', 
                borderRadius: '50%', 
                background: getGradient(), 
                border: '4px solid white',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                transition: 'transform 4s cubic-bezier(0.1, 0.9, 0.2, 1)',
                transform: `rotate(${rotation}deg)`
              }}
            ></div>
            
            {/* Center Peg */}
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', background: 'white', borderRadius: '50%', border: '4px solid #0f172a', zIndex: 8}}></div>
          </div>

          <button className="btn" onClick={spin} disabled={spinning || items.length < 2} style={{fontSize: '1.5rem', padding: '1rem 4rem', borderRadius: '99px', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)'}}>
            {spinning ? 'Spinning...' : 'SPIN'}
          </button>
          
          <div style={{height: '60px', marginTop: '1.5rem', display: 'flex', alignItems: 'center'}}>
            {winner && (
              <div style={{animation: 'slideUp 0.5s ease', textAlign: 'center'}}>
                <span style={{color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px'}}>Winner</span>
                <h2 style={{color: '#10b981', fontSize: '2.5rem', margin: 0}}>{winner}! 🎉</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionWheel;
