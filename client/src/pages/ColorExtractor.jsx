import { useState, useRef } from 'react';
import { Palette } from 'lucide-react';

const ColorExtractor = () => {
  const [colors, setColors] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgUrl = URL.createObjectURL(file);
    setImageUrl(imgUrl);
    
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const rgbCounts = {};
      
      // Sample pixels to save time (every 100th pixel)
      for (let i = 0; i < imageData.length; i += 400) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        if (a < 128) continue; // Skip transparent
        
        // Quantize colors to reduce too many unique variants (round to nearest 10)
        const qR = Math.round(r / 20) * 20;
        const qG = Math.round(g / 20) * 20;
        const qB = Math.round(b / 20) * 20;
        const rgb = `${qR},${qG},${qB}`;
        
        rgbCounts[rgb] = (rgbCounts[rgb] || 0) + 1;
      }

      // Sort by frequency
      const sortedColors = Object.entries(rgbCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5) // Top 5 colors
        .map(([rgbStr]) => {
          const [r, g, b] = rgbStr.split(',').map(Number);
          return rgbToHex(r, g, b);
        });

      setColors(sortedColors);
    };
  };

  const rgbToHex = (r, g, b) => {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1><Palette style={{display: 'inline', marginRight: '10px'}} /> Color Extractor</h1>
        <p className="subtitle">Extract the dominant color palette from any image.</p>
      </header>

      <div className="result-card">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          style={{marginBottom: '2rem', display: 'block', width: '100%', padding: '1rem', border: '2px dashed var(--card-border)', borderRadius: '12px', background: 'rgba(0,0,0,0.2)'}}
        />

        <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
          {imageUrl && (
            <div style={{flex: 1, minWidth: '300px'}}>
              <img src={imageUrl} alt="Uploaded" className="full-thumbnail" style={{maxHeight: '300px', objectFit: 'contain', background: 'rgba(0,0,0,0.5)'}} />
            </div>
          )}
          
          {colors.length > 0 && (
            <div style={{flex: 1, minWidth: '300px'}}>
              <h3 style={{marginBottom: '1rem'}}>Extracted Palette</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {colors.map((hex, i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '12px'}}>
                    <div style={{width: '50px', height: '50px', backgroundColor: hex, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'}}></div>
                    <span style={{fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold'}}>{hex}</span>
                    <button className="btn btn-secondary" style={{padding: '0.4rem 1rem', marginLeft: 'auto'}} onClick={() => navigator.clipboard.writeText(hex)}>
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>
    </div>
  );
};

export default ColorExtractor;
