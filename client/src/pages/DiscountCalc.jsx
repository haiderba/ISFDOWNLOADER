import { useState } from 'react';
import { Tag, ShoppingCart } from 'lucide-react';

const DiscountCalc = () => {
  const [originalPrice, setOriginalPrice] = useState(100);
  const [discountPerc, setDiscountPerc] = useState(20);
  const [taxPerc, setTaxPerc] = useState(8.5);

  const calculate = () => {
    const price = originalPrice || 0;
    const dp = discountPerc || 0;
    const tp = taxPerc || 0;

    const discountAmount = price * (dp / 100);
    const priceAfterDiscount = price - discountAmount;
    
    // Tax is usually applied AFTER the discount in retail
    const taxAmount = priceAfterDiscount * (tp / 100);
    const finalPrice = priceAfterDiscount + taxAmount;

    return {
      discountAmount,
      priceAfterDiscount,
      taxAmount,
      finalPrice,
      totalSaved: price + (price * (tp / 100)) - finalPrice // Total gap between original+tax vs discounted+tax
    };
  };

  const data = calculate();

  return (
    <div className="page-container">
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Tag style={{display: 'inline', marginRight: '10px'}} /> Discount & Sales Tax Calculator</h1>
        <p className="subtitle">Find exactly how much you are paying (and saving) at the register.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Controls */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Original Price</label>
              <div style={{position: 'relative'}}>
                <span style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}>$</span>
                <input type="number" min="0" className="search-input" value={originalPrice} onChange={e => setOriginalPrice(parseFloat(e.target.value) || 0)} style={{width: '100%', paddingLeft: '2.5rem', background: 'rgba(0,0,0,0.2)'}} />
              </div>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Discount (%)</span>
                <span>{discountPerc}%</span>
              </label>
              <input type="range" min="0" max="100" value={discountPerc} onChange={e => setDiscountPerc(e.target.value)} style={{width: '100%', accentColor: '#10b981'}}/>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Sales Tax (%)</span>
                <span>{taxPerc}%</span>
              </label>
              <input type="range" min="0" max="25" step="0.1" value={taxPerc} onChange={e => setTaxPerc(e.target.value)} style={{width: '100%', accentColor: '#ef4444'}}/>
            </div>

          </div>
        </div>

        {/* Results Block */}
        <div style={{flex: 1.5, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '3rem 2rem', height: '100%', display: 'flex', flexDirection: 'column'}}>
            
            <div style={{textAlign: 'center', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
              <p style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Final Checkout Price</p>
              <h2 style={{fontSize: '5rem', margin: 0, color: '#f8fafc', fontWeight: 'bold'}}>${data.finalPrice.toFixed(2)}</h2>
              {data.discountAmount > 0 && (
                <div style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.5rem 1rem', borderRadius: '99px', marginTop: '1rem', fontWeight: 'bold'}}>
                  <ShoppingCart size={18} /> You saved ${data.totalSaved.toFixed(2)}
                </div>
              )}
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8'}}>
                <span>Original Price</span>
                <span>${originalPrice.toFixed(2)}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 'bold'}}>
                <span>Discount Deduction</span>
                <span>- ${data.discountAmount.toFixed(2)}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', color: '#ef4444'}}>
                <span>Sales Tax Added</span>
                <span>+ ${data.taxAmount.toFixed(2)}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DiscountCalc;
