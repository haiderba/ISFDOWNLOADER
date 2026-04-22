import { useState } from 'react';
import { Link } from 'react-router-dom';
import QuickWidgets from '../components/QuickWidgets';
import { ALL_TOOLS } from '../constants/tools';
import { Search, Star } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('onetooldeck_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (e, path) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavs = favorites.includes(path) 
      ? favorites.filter(p => p !== path) 
      : [...favorites, path];
    setFavorites(newFavs);
    localStorage.setItem('onetooldeck_favorites', JSON.stringify(newFavs));
  };

  const categories = [
    { title: "Content Downloaders & Files", tools: ALL_TOOLS.filter(t => t.category === 'Media') },
    { title: "Design & UI Tools", tools: ALL_TOOLS.filter(t => t.category === 'Design') },
    { title: "Developer Utilities", tools: ALL_TOOLS.filter(t => t.category === 'Dev') },
    { title: "Focus & Productivity", tools: ALL_TOOLS.filter(t => t.category === 'Productivity') },
    { title: "Finance & Everyday", tools: ALL_TOOLS.filter(t => t.category === 'Utility') }
  ];

  const favoriteTools = ALL_TOOLS.filter(t => favorites.includes(t.path));

  const filteredCategories = categories.map(cat => ({
    ...cat,
    tools: cat.tools.filter(tool => 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.tools.length > 0);

  return (
    <div className="page-container home-dashboard">
      <header className="page-header" style={{marginBottom: '2rem'}}>
        <h1>OneToolDeck Dashboard</h1>
        <p className="subtitle">Choose a tool to begin.</p>
      </header>

      <div style={{position: 'relative', marginBottom: '2rem'}}>
        <Search style={{position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} size={20} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for a tool (e.g. 'pdf', 'image', 'calc')..." 
          style={{width: '100%', padding: '1rem 1rem 1rem 45px', fontSize: '1.1rem'}}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {!searchQuery && <QuickWidgets />}

      {/* Favorites Section */}
      {!searchQuery && favoriteTools.length > 0 && (
        <div style={{marginBottom: '3rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}>
            <Star size={20} color="#f59e0b" fill="#f59e0b" />
            <h2 style={{fontSize: '1.2rem', color: '#cbd5e1', margin: 0}}>Your Favorites</h2>
          </div>
          <div className="tools-grid">
            {favoriteTools.map((tool) => (
              <Link to={tool.path} key={tool.path} className="tool-card" style={{padding: '1.2rem', position: 'relative'}}>
                <button 
                  onClick={(e) => toggleFavorite(e, tool.path)}
                  style={{position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10}}
                >
                  <Star size={18} color="#f59e0b" fill="#f59e0b" />
                </button>
                <div className="tool-icon-wrapper" style={{ color: tool.color, width: '40px', height: '40px' }}>
                  <tool.icon size={24} />
                </div>
                <div>
                  <h3 style={{fontSize: '1.05rem', marginBottom: '0.3rem'}}>{tool.title}</h3>
                  <p style={{fontSize: '0.85rem', color: '#94a3b8'}}>{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}


      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat, idx) => (
          <div key={idx} style={{marginBottom: '3rem'}}>
            <h2 style={{fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}>{cat.title}</h2>
            <div className="tools-grid">
              {cat.tools.map((tool) => (
                <Link to={tool.path} key={tool.path} className="tool-card" style={{padding: '1.2rem', position: 'relative'}}>
                  <button 
                    onClick={(e) => toggleFavorite(e, tool.path)}
                    style={{position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10}}
                  >
                    <Star size={18} color={favorites.includes(tool.path) ? "#f59e0b" : "#64748b"} fill={favorites.includes(tool.path) ? "#f59e0b" : "none"} />
                  </button>
                  <div className="tool-icon-wrapper" style={{ color: tool.color, width: '40px', height: '40px' }}>
                    <tool.icon size={24} />
                  </div>
                  <div>
                    <h3 style={{fontSize: '1.05rem', marginBottom: '0.3rem'}}>{tool.title}</h3>
                    <p style={{fontSize: '0.85rem', color: '#94a3b8'}}>{tool.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div style={{textAlign: 'center', padding: '3rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px'}}>
          <p style={{color: '#94a3b8', fontSize: '1.1rem'}}>No tools found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default Home;
