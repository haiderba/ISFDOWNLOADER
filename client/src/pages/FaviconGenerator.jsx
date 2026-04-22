import { useState, useRef } from 'react';
import { ImageIcon, Upload, Download } from 'lucide-react';

const FaviconGenerator = () => {
  const [sourceImg, setSourceImg] = useState(null);
  const [outputImages, setOutputImages] = useState([]);
  const canvasRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setSourceImg(img.src);
        generateFavicons(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const generateFavicons = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const sizes = [16, 32, 180, 512]; // standard favicon sizes
    const generated = [];

    sizes.forEach(size => {
      canvas.width = size;
      canvas.height = size;
      // Clear and draw resized
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      
      generated.push({
        size: `${size}x${size}`,
        name: size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`,
        dataUrl: canvas.toDataURL('image/png')
      });
    });

    setOutputImages(generated);
  };

  const downloadFavicon = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-container" style={{maxWidth: '900px'}}>
      
      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} style={{display: 'none'}}></canvas>

      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><ImageIcon style={{display: 'inline', marginRight: '10px'}} /> Favicon Generator</h1>
        <p className="subtitle">Upload a square logo to instantly generate perfectly sized Favicons for web and iOS.</p>
      </header>

      <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
        
        {/* Upload Zone */}
        <div style={{width: '100%', position: 'relative', overflow: 'hidden'}}>
          <input type="file" accept="image/*" onChange={handleUpload} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10}} />
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', padding: '3rem', border: '2px dashed var(--card-border)', borderRadius: '16px', background: 'rgba(0,0,0,0.2)'}}>
            <Upload size={32} color="#f59e0b" />
            <h3 style={{margin: 0, color: '#f8fafc'}}>Upload your Logo (PNG/JPG)</h3>
            <p style={{margin: 0, color: '#64748b', fontSize: '0.9rem'}}>A perfect square logo yields the best results.</p>
          </div>
        </div>

        {sourceImg && (
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
             <h3 style={{color: '#cbd5e1', textAlign: 'center', margin: 0}}>Generated Favicons</h3>
             
             <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
               {outputImages.map(img => (
                 <div key={img.size} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: '#0f172a', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--card-border)', minWidth: '150px'}}>
                   
                   <div style={{width: '64px', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px dashed #64748b'}}>
                     <img src={img.dataUrl} alt={img.name} style={{maxWidth: '100%', maxHeight: '100%', imageRendering: img.size === '16x16' ? 'pixelated' : 'auto'}} />
                   </div>
                   
                   <div style={{textAlign: 'center'}}>
                     <div style={{fontWeight: 'bold', color: '#f8fafc'}}>{img.size}</div>
                     <div style={{fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0.8rem 0'}}>{img.name}</div>
                   </div>

                   <button onClick={() => downloadFavicon(img.dataUrl, img.name)} className="btn btn-secondary" style={{padding: '0.5rem 1rem', fontSize: '0.85rem', width: '100%'}}>
                     <Download size={16} /> Save
                   </button>
                 </div>
               ))}
             </div>
             
             <div style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #3b82f6'}}>
               <p style={{margin: 0, fontSize: '0.85rem', color: '#cbd5e1'}}><strong>How to use:</strong> Add <code style={{color: '#f59e0b'}}>&lt;link rel="icon" href="/favicon-32x32.png" sizes="32x32"&gt;</code> into the &lt;head&gt; of your website html file.</p>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FaviconGenerator;
