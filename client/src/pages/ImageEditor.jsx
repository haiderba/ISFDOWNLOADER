import { useState, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Image as ImageIcon, Sliders, Layers, Maximize } from 'lucide-react';
import ToolHeader from '../components/ToolHeader';

const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    hueRotate: 0
  });
  
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imgRef.current.src = event.target.result;
        imgRef.current.onload = () => {
          setImage(imgRef.current.src);
          applyFilters();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const applyFilters = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match image
    canvas.width = imgRef.current.width;
    canvas.height = imgRef.current.height;
    
    // Apply filters
    ctx.filter = `
      brightness(${filters.brightness}%)
      contrast(${filters.contrast}%)
      saturate(${filters.saturate}%)
      blur(${filters.blur}px)
      grayscale(${filters.grayscale}%)
      sepia(${filters.sepia}%)
      hue-rotate(${filters.hueRotate}deg)
    `;
    
    ctx.drawImage(imgRef.current, 0, 0);
  };

  useEffect(() => {
    if (image) {
      applyFilters();
    }
  }, [filters, image]);

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({ ...prev, [filter]: value }));
  };

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturate: 100,
      blur: 0,
      grayscale: 0,
      sepia: 0,
      hueRotate: 0
    });
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'edited_image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="page-container">
      <ToolHeader 
        title="Pro Image Editor" 
        description="Canvas-powered local image editing with pro-grade filters."
      />

      <div style={{ display: 'grid', gridTemplateColumns: image ? '1fr 320px' : '1fr', gap: '2rem' }}>
        
        {/* Main Canvas Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '500px', background: '#020617', border: '1px solid rgba(255,255,255,0.05)' }}>
          {!image ? (
            <div style={{ textAlign: 'center' }}>
              <input type="file" accept="image/*" onChange={handleImageUpload} id="img-upload" style={{ display: 'none' }} />
              <label htmlFor="img-upload" className="btn primary" style={{ cursor: 'pointer', padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Upload size={24} /> Upload Image
              </label>
              <p style={{ marginTop: '1rem', color: '#64748b' }}>Supports JPEG, PNG, WEBP</p>
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }} />
            </div>
          )}
        </div>

        {/* Sidebar Controls */}
        {image && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#0f172a' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1rem', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <Sliders size={18} color="#3b82f6" /> Adjustments
              </h3>
              <button onClick={resetFilters} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <RotateCcw size={14} /> Reset
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'brightness', label: 'Brightness', min: 0, max: 200 },
                { name: 'contrast', label: 'Contrast', min: 0, max: 200 },
                { name: 'saturate', label: 'Saturation', min: 0, max: 200 },
                { name: 'blur', label: 'Blur', min: 0, max: 10 },
                { name: 'grayscale', label: 'Grayscale', min: 0, max: 100 },
                { name: 'sepia', label: 'Sepia', min: 0, max: 100 },
                { name: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360 }
              ].map(f => (
                <div key={f.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{f.label}</label>
                    <span style={{ fontSize: '0.8rem', color: '#3b82f6' }}>{filters[f.name]}</span>
                  </div>
                  <input 
                    type="range" 
                    min={f.min} 
                    max={f.max} 
                    value={filters[f.name]} 
                    onChange={(e) => handleFilterChange(f.name, e.target.value)}
                    style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', outline: 'none' }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn primary" onClick={downloadImage} style={{ width: '100%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Download size={18} /> Export Image
              </button>
              <label htmlFor="img-upload" className="btn secondary" style={{ width: '100%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <ImageIcon size={18} /> New Image
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
