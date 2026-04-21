import { useState, useRef, useEffect } from 'react';
import { Type, Download, Image as ImageIcon } from 'lucide-react';

const MemeGenerator = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(40);
  const canvasRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        // Resize canvas to match image aspect ratio, capped at 600px width
        const maxWidth = 600;
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawText(ctx, canvas);
      };
    } else {
      // Default blank canvas
      canvas.width = 500;
      canvas.height = 500;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, 500, 500);
      drawText(ctx, canvas);
    }
  }, [imageSrc, topText, bottomText, fontSize]);

  const drawText = (ctx, canvas) => {
    ctx.font = `bold ${fontSize}px Impact, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = fontSize / 10; // Outline thickness relative to font size

    const x = canvas.width / 2;
    
    if (topText) {
      ctx.textBaseline = 'top';
      const y = 20;
      ctx.strokeText(topText.toUpperCase(), x, y);
      ctx.fillText(topText.toUpperCase(), x, y);
    }

    if (bottomText) {
      ctx.textBaseline = 'bottom';
      const y = canvas.height - 20;
      ctx.strokeText(bottomText.toUpperCase(), x, y);
      ctx.fillText(bottomText.toUpperCase(), x, y);
    }
  };

  const downloadMeme = () => {
    const link = document.createElement('a');
    link.download = 'meme.jpg';
    link.href = canvasRef.current.toDataURL('image/jpeg', 0.9);
    link.click();
  };

  return (
    <div className="page-container" style={{maxWidth: '1000px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Type style={{display: 'inline', marginRight: '10px'}} /> Meme Generator</h1>
        <p className="subtitle">Classic impact-font meme creation.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center'}}>
        
        {/* Editor Controls */}
        <div style={{flex: 1, minWidth: '300px', maxWidth: '400px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div style={{width: '100%', position: 'relative', overflow: 'hidden'}}>
              <input type="file" accept="image/*" onChange={handleUpload} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10}} />
              <button className="btn btn-secondary" style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem'}}>
                <ImageIcon size={18} /> Choose Image
              </button>
            </div>

            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Top Text</label>
              <input type="text" className="search-input" value={topText} onChange={e => setTopText(e.target.value)} placeholder="TOP TEXT" style={{width: '100%', background: 'rgba(0,0,0,0.2)'}} />
            </div>

            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Bottom Text</label>
              <input type="text" className="search-input" value={bottomText} onChange={e => setBottomText(e.target.value)} placeholder="BOTTOM TEXT" style={{width: '100%', background: 'rgba(0,0,0,0.2)'}} />
            </div>

            <div>
              <label style={{display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
                <span>Font Size</span>
                <span>{fontSize}px</span>
              </label>
              <input type="range" min="20" max="120" value={fontSize} onChange={e => setFontSize(e.target.value)} style={{width: '100%', accentColor: 'var(--gradient-1)'}}/>
            </div>

            <button className="btn" onClick={downloadMeme} disabled={!imageSrc} style={{marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem'}}>
              <Download size={18} /> Download Meme
            </button>
          </div>
        </div>

        {/* Canvas Display */}
        <div style={{flex: '1 1 500px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--card-border)'}}>
           <canvas 
             ref={canvasRef} 
             style={{
               maxWidth: '100%', 
               height: 'auto',
               boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
               background: '#black'
             }} 
           />
        </div>

      </div>
    </div>
  );
};

export default MemeGenerator;
