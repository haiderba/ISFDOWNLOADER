import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, X } from 'lucide-react';
import { ALL_TOOLS } from '../constants/tools';

const CommandDeck = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredTools = ALL_TOOLS.filter(tool => 
    tool.title.toLowerCase().includes(query.toLowerCase()) || 
    tool.desc.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredTools.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredTools.length) % filteredTools.length);
    } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
      handleSelect(filteredTools[selectedIndex].path);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(2, 6, 23, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '15vh',
      zIndex: 1000,
      animation: 'fadeIn 0.2s ease'
    }} onClick={() => setIsOpen(false)}>
      
      <div style={{
        width: '100%',
        maxWidth: '640px',
        background: '#0f172a',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <Search size={20} color="#94a3b8" style={{ marginRight: '1rem' }} />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Type a tool name or command..."
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#f8fafc', 
              fontSize: '1.1rem', 
              width: '100%',
              outline: 'none'
            }}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={onKeyDown}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', color: '#64748b' }}>
            <Command size={12} /> K
          </div>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '0.5rem' }}>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, idx) => {
              const Icon = tool.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div 
                  key={tool.path}
                  onClick={() => handleSelect(tool.path)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', 
                    background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.03)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '1rem',
                    color: tool.color
                  }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: isSelected ? '#3b82f6' : '#f8fafc' }}>{tool.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{tool.desc}</div>
                  </div>
                  {isSelected && (
                    <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 'bold' }}>⏎</div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              No tools found for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span><kbd style={{ background: '#1e293b', padding: '2px 4px', borderRadius: '4px' }}>↑↓</kbd> to navigate</span>
            <span><kbd style={{ background: '#1e293b', padding: '2px 4px', borderRadius: '4px' }}>⏎</kbd> to select</span>
          </div>
          <span><kbd style={{ background: '#1e293b', padding: '2px 4px', borderRadius: '4px' }}>esc</kbd> to close</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        kbd { font-family: sans-serif; border: 1px solid #334155; }
      `}</style>
    </div>
  );
};

export default CommandDeck;
