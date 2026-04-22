import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const ToolHeader = ({ title, subtitle, icon: Icon, path }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('onetooldeck_favorites') || '[]');
    setIsFavorite(favs.includes(path));
  }, [path]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('onetooldeck_favorites') || '[]');
    let newFavs;
    if (favs.includes(path)) {
      newFavs = favs.filter(p => p !== path);
      setIsFavorite(false);
    } else {
      newFavs = [...favs, path];
      setIsFavorite(true);
    }
    localStorage.setItem('onetooldeck_favorites', JSON.stringify(newFavs));
  };

  return (
    <header className="page-header" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {Icon && <Icon size={32} style={{ color: 'var(--gradient-1)' }} />} {title}
        </h1>
        <button 
          onClick={toggleFavorite}
          style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '50%', 
            width: '40px', 
            height: '40px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            color: isFavorite ? '#f59e0b' : '#64748b'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <Star size={20} fill={isFavorite ? '#f59e0b' : 'none'} />
        </button>
      </div>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </header>
  );
};

export default ToolHeader;
