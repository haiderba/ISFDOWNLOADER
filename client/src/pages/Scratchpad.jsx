import { useState, useEffect } from 'react';
import { PenTool, Trash2, CheckCircle2 } from 'lucide-react';

const Scratchpad = () => {
  const [content, setContent] = useState('');
  const [showSavedData, setShowSavedData] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('onetooldeck_scratchpad');
    if (saved) {
      setContent(saved);
    }
  }, []);

  // Save to local storage on change
  const handleChange = (e) => {
    const val = e.target.value;
    setContent(val);
    localStorage.setItem('onetooldeck_scratchpad', val);
    
    // flash the saved indicator
    setShowSavedData(true);
    setTimeout(() => setShowSavedData(false), 2000);
  };

  const clearPad = () => {
    if (window.confirm('Are you sure you want to clear your scratchpad?')) {
      setContent('');
      localStorage.removeItem('onetooldeck_scratchpad');
    }
  };

  const getWordCount = () => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  };

  return (
    <div className="page-container" style={{maxWidth: '1200px', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '1rem'}}>
        <h1><PenTool style={{display: 'inline', marginRight: '10px'}} /> Auto-Saving Scratchpad</h1>
        <p className="subtitle">Everything you type here is permanently saved to your browser automatically.</p>
      </header>

      <div className="result-card" style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0}}>
        
        {/* Tool bar */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid var(--card-border)'}}>
          
          <div style={{display: 'flex', gap: '1.5rem', color: '#94a3b8', fontSize: '0.85rem'}}>
             <span>{getWordCount()} words</span>
             <span>{content.length} chars</span>
          </div>

          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
             <span style={{
               color: '#10b981', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem',
               opacity: showSavedData ? 1 : 0, transition: 'opacity 0.2s', fontWeight: 'bold'
             }}><CheckCircle2 size={14} /> Saved internally</span>
             
             <button onClick={clearPad} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
               <Trash2 size={16} /> <span style={{fontSize: '0.8rem', fontWeight: 'bold'}}>Clear List</span>
             </button>
          </div>

        </div>

        {/* Text Area */}
        <textarea 
          value={content}
          onChange={handleChange}
          placeholder="Start typing... Feel free to close the tab, your text will be here when you get back."
          style={{
            flex: 1, width: '100%', resize: 'none', background: 'transparent',
            border: 'none', padding: '2rem', color: '#f8fafc', fontSize: '1.2rem',
            lineHeight: '1.6', fontFamily: 'inherit', outline: 'none'
          }}
        />

      </div>
    </div>
  );
};

export default Scratchpad;
