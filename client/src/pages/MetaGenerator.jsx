import { useState } from 'react';
import { LayoutTemplate, Copy } from 'lucide-react';

const MetaGenerator = () => {
  const [data, setData] = useState({
    title: 'My Awesome Website',
    description: 'The best website ever built.',
    keywords: 'web, tool, fast',
    url: 'https://example.com',
    image: 'https://example.com/cover.jpg',
    author: 'John Doe'
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const generateTags = () => {
    return `<!-- Primary Meta Tags -->
<title>${data.title}</title>
<meta name="title" content="${data.title}">
<meta name="description" content="${data.description}">
<meta name="keywords" content="${data.keywords}">
<meta name="author" content="${data.author}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${data.url}">
<meta property="og:title" content="${data.title}">
<meta property="og:description" content="${data.description}">
<meta property="og:image" content="${data.image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${data.url}">
<meta property="twitter:title" content="${data.title}">
<meta property="twitter:description" content="${data.description}">
<meta property="twitter:image" content="${data.image}">`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTags());
    alert('Meta tags copied to clipboard!');
  };

  return (
    <div className="page-container">
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><LayoutTemplate style={{display: 'inline', marginRight: '10px'}} /> Meta & OpenGraph Generator</h1>
        <p className="subtitle">Instantly generate perfect HTML meta tags for SEO and link previews.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Editor */}
        <div className="result-card" style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem'}}>
           <h3 style={{color: '#94a3b8', fontSize: '1rem', marginTop: 0}}>Site Details</h3>
           
           <div>
             <label style={{color: '#64748b', fontSize: '0.85rem', marginBottom: '0.2rem', display: 'block'}}>Title</label>
             <input name="title" value={data.title} onChange={handleChange} className="search-input" style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.6rem 1rem'}} />
           </div>

           <div>
             <label style={{color: '#64748b', fontSize: '0.85rem', marginBottom: '0.2rem', display: 'block'}}>Description</label>
             <textarea name="description" value={data.description} onChange={handleChange} className="search-input" style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.6rem 1rem', resize: 'vertical', height: '80px'}} />
           </div>
           
           <div>
             <label style={{color: '#64748b', fontSize: '0.85rem', marginBottom: '0.2rem', display: 'block'}}>Keywords</label>
             <input name="keywords" value={data.keywords} onChange={handleChange} className="search-input" style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.6rem 1rem'}} />
           </div>

           <div>
             <label style={{color: '#64748b', fontSize: '0.85rem', marginBottom: '0.2rem', display: 'block'}}>Canonical URL</label>
             <input name="url" value={data.url} onChange={handleChange} className="search-input" style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.6rem 1rem'}} />
           </div>

           <div>
             <label style={{color: '#64748b', fontSize: '0.85rem', marginBottom: '0.2rem', display: 'block'}}>Preview Image URL</label>
             <input name="image" value={data.image} onChange={handleChange} className="search-input" style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.6rem 1rem'}} />
           </div>

           <div>
             <label style={{color: '#64748b', fontSize: '0.85rem', marginBottom: '0.2rem', display: 'block'}}>Author</label>
             <input name="author" value={data.author} onChange={handleChange} className="search-input" style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.6rem 1rem'}} />
           </div>
        </div>

        {/* Output */}
        <div style={{flex: 1, minWidth: '400px', display: 'flex', flexDirection: 'column'}}>
           <div className="result-card" style={{padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--card-border)'}}>
               <span style={{color: '#cbd5e1', fontWeight: 'bold'}}>Generated HTML &lt;head&gt; Code</span>
               <button onClick={copyToClipboard} className="btn" style={{padding: '0.4rem 1rem', fontSize: '0.85rem'}}><Copy size={16} /> Copy</button>
             </div>
             
             <textarea 
               readOnly
               value={generateTags()}
               style={{
                 flex: 1, background: '#020617', border: 'none', padding: '1.5rem', 
                 color: '#34d399', fontFamily: 'monospace', fontSize: '0.9rem', 
                 resize: 'none', outline: 'none'
               }}
             />
           </div>
        </div>

      </div>
    </div>
  );
};

export default MetaGenerator;
