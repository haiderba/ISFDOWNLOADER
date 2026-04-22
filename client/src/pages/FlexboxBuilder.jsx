import { useState } from 'react';
import { Layout, Copy } from 'lucide-react';

const FlexboxBuilder = () => {
  const [styles, setStyles] = useState({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '20'
  });

  const [itemCount, setItemCount] = useState(4);

  const updateStyle = (key, value) => {
    setStyles({ ...styles, [key]: value });
  };

  const cssCode = `.container {
  display: flex;
  flex-direction: ${styles.flexDirection};
  justify-content: ${styles.justifyContent};
  align-items: ${styles.alignItems};
  flex-wrap: ${styles.flexWrap};
  gap: ${styles.gap}px;
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    alert('CSS copied to clipboard!');
  };

  // Select input helper
  const SelectControl = ({ label, propKey, options }) => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <label style={{color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold'}}>{label}</label>
      <select 
        value={styles[propKey]} 
        onChange={e => updateStyle(propKey, e.target.value)}
        className="search-input"
        style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer', appearance: 'menulist'}}
      >
        {options.map(opt => <option key={opt} value={opt} style={{background: '#0f172a', color: 'white'}}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <div className="page-container" style={{maxWidth: '1200px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Layout style={{display: 'inline', marginRight: '10px'}} /> Flexbox Builder</h1>
        <p className="subtitle">Visually build and export CSS Flexbox layouts instantly.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Controls Sidebar */}
        <div className="result-card" style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem'}}>
           
           <SelectControl label="Flex Direction" propKey="flexDirection" options={['row', 'row-reverse', 'column', 'column-reverse']} />
           <SelectControl label="Justify Content" propKey="justifyContent" options={['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']} />
           <SelectControl label="Align Items" propKey="alignItems" options={['stretch', 'flex-start', 'flex-end', 'center', 'baseline']} />
           <SelectControl label="Flex Wrap" propKey="flexWrap" options={['nowrap', 'wrap', 'wrap-reverse']} />

           <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
             <label style={{color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold'}}>Gap ({styles.gap}px)</label>
             <input type="range" min="0" max="100" value={styles.gap} onChange={e => updateStyle('gap', e.target.value)} style={{width: '100%'}} />
           </div>

           <hr style={{borderColor: 'var(--card-border)', margin: '1rem 0', opacity: 0.5}} />
           
           <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
             <label style={{color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold'}}>Number of Items: {itemCount}</label>
             <input type="range" min="1" max="12" value={itemCount} onChange={e => setItemCount(parseInt(e.target.value))} style={{width: '100%'}} />
           </div>

        </div>

        {/* Live Preview & Output */}
        <div style={{flex: 2, minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
           
           <div className="result-card" style={{padding: '1.5rem', background: '#020617', border: '1px dashed var(--gradient-1)', position: 'relative'}}>
             <div style={{position: 'absolute', top: '-12px', left: '20px', background: 'var(--gradient-1)', padding: '0.2rem 0.8rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'}}>Live Container Preview</div>
             <div 
               style={{
                 width: '100%', minHeight: '300px', display: 'flex', transition: 'all 0.3s ease',
                 flexDirection: styles.flexDirection,
                 justifyContent: styles.justifyContent,
                 alignItems: styles.alignItems,
                 flexWrap: styles.flexWrap,
                 gap: `${styles.gap}px`,
                 overflow: 'auto'
               }}
             >
                {Array.from({length: itemCount}).map((_, idx) => (
                  <div key={idx} style={{
                    minWidth: '80px', minHeight: '80px', background: 'var(--card-bg)', 
                    border: '2px solid var(--card-border)', borderRadius: '12px', 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    fontSize: '1.5rem', fontWeight: 'bold', color: '#cbd5e1',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)', transition: 'all 0.3s'
                  }}>
                    {idx + 1}
                  </div>
                ))}
             </div>
           </div>

           <div className="result-card" style={{padding: 0, overflow: 'hidden'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--card-border)'}}>
               <span style={{color: '#cbd5e1', fontWeight: 'bold'}}>CSS Code</span>
               <button onClick={copyToClipboard} className="btn" style={{padding: '0.4rem 1rem', fontSize: '0.85rem'}}><Copy size={16} /> Copy</button>
             </div>
             <pre style={{
               margin: 0, padding: '1.5rem', background: '#0f172a', color: '#38bdf8', 
               fontFamily: 'monospace', fontSize: '1rem', overflowX: 'auto'
             }}>
               {cssCode}
             </pre>
           </div>

        </div>
      </div>
    </div>
  );
};

export default FlexboxBuilder;
