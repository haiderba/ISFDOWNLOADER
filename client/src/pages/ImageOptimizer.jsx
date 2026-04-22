import { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Download, Upload } from 'lucide-react';

const ImageOptimizer = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [format, setFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(80);
  const [scale, setScale] = useState(100);
  
  const [originalStats, setOriginalStats] = useState(null);
  const [estimatedSize, setEstimatedSize] = useState(0);

  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      
      const img = imgRef.current;
      img.src = url;
      img.onload = () => {
        setOriginalStats({
          width: img.width,
          height: img.height,
          sizeMb: (file.size / (1024 * 1024)).toFixed(2)
        });
        processCanvas();
      };
    }
  };

  useEffect(() => {
    if (imageSrc) processCanvas();
  }, [format, quality, scale]);

  const processCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc || !originalStats) return;
    
    const ctx = canvas.getContext('2d');
    const targetWidth = Math.floor(originalStats.width * (scale / 100));
    const targetHeight = Math.floor(originalStats.height * (scale / 100));

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.drawImage(imgRef.current, 0, 0, targetWidth, targetHeight);

    // Estimate file size based on new dataURL length
    const dataUrl = canvas.toDataURL(format, quality / 100);
    // Rough Base64 to exact bytes calculation: (Length * (3/4)) - padding
    const bytes = Math.round((dataUrl.length * (3/4)) - (dataUrl.indexOf('=') > 0 ? (dataUrl.length - dataUrl.indexOf('=')) : 0));
    setEstimatedSize((bytes / (1024 * 1024)).toFixed(2));
  };

  const downloadOptimized = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL(format, quality / 100);
    const link = document.createElement('a');
    
    let ext = 'jpg';
    if (format === 'image/png') ext = 'png';
    if (format === 'image/webp') ext = 'webp';

    link.download = `optimized-image.${ext}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="page-container">
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><ImageIcon style={{display: 'inline', marginRight: '10px'}} /> Ultimate Image Optimizer</h1>
        <p className="subtitle">Resize, compress, and convert images entirely in your browser.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center'}}>
        
        {/* Controls */}
        <div style={{flex: 1, minWidth: '300px', maxWidth: '400px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div style={{width: '100%', position: 'relative', overflow: 'hidden'}}>
              <input type="file" accept="image/*" onChange={handleUpload} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10}} />
              <button className="btn btn-secondary" style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', borderStyle: 'dashed'}}>
                <Upload size={18} /> Upload Image
              </button>
            </div>

            {originalStats && (
              <div style={{background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#94a3b8'}}>
                <strong>Original:</strong> {originalStats.width}x{originalStats.height}px ({originalStats.sizeMb} MB)
              </div>
            )}

            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Output Format</label>
              <select className="search-input" value={format} onChange={e => setFormat(e.target.value)} style={{width: '100%', background: 'rgba(0,0,0,0.2)'}}>
                <option value="image/jpeg">JPEG (Good overall)</option>
                <option value="image/png">PNG (Lossless, Transparent)</option>
                <option value="image/webp">WebP (Best Compression)</option>
              </select>
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Scale Dimensions (%)</span>
                <span>{scale}%</span>
              </label>
              <input type="range" min="10" max="100" value={scale} onChange={e => setScale(e.target.value)} style={{width: '100%', accentColor: 'var(--gradient-1)'}}/>
            </div>

            {format !== 'image/png' && (
               <div>
                 <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                   <span>Quality/Compression</span>
                   <span>{quality}%</span>
                 </label>
                 <input type="range" min="1" max="100" value={quality} onChange={e => setQuality(e.target.value)} style={{width: '100%', accentColor: '#10b981'}}/>
               </div>
            )}

            <button className="btn" onClick={downloadOptimized} disabled={!imageSrc} style={{marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem'}}>
              <Download size={18} /> Download ({estimatedSize} MB)
            </button>
          </div>
        </div>

        {/* Live Canvas Comparison Display */}
        <div style={{flex: '1 1 400px'}}>
           <div className="result-card" style={{padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column'}}>
             <h3 style={{marginBottom: '1rem', color: '#cbd5e1'}}>Preview</h3>
             <div style={{
               flex: 1, minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', 
               background: '#e2e8f0', backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px', borderRadius: '12px', overflow: 'hidden'}}
             >
               <canvas ref={canvasRef} style={{maxWidth: '100%', maxHeight: '400px', objectFit: 'contain'}} />
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ImageOptimizer;
