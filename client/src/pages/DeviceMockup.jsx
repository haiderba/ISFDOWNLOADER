import { useState, useRef, useEffect } from 'react';
import { Smartphone, Monitor, Tablet, Download, Upload, Maximize, Minimize } from 'lucide-react';

const DeviceMockup = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [deviceType, setDeviceType] = useState('phone');
  const [objectFit, setObjectFit] = useState('contain');
  const canvasRef = useRef(null);

  const devices = {
    phone: { cw: 400, ch: 820, sx: 24, sy: 24, sw: 352, sh: 772, br: 40, outerRadius: 50, hasNotch: true, type: 'phone' },
    tablet: { cw: 800, ch: 1100, sx: 40, sy: 40, sw: 720, sh: 1020, br: 10, outerRadius: 30, hasNotch: false, type: 'tablet' },
    laptop: { cw: 1200, ch: 850, sx: 40, sy: 40, sw: 1120, sh: 720, br: 5, outerRadius: 20, hasNotch: false, type: 'laptop' }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const device = devices[deviceType];
    const { cw, ch, sx, sy, sw, sh, br } = device;

    // Reset canvas dimensions to trigger clear and resize
    canvasRef.current.width = cw;
    canvasRef.current.height = ch;

    // Clear canvas
    ctx.clearRect(0, 0, cw, ch);

    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        ctx.save();
        
        // Create clipping mask for the rounded screen corners
        ctx.beginPath();
        ctx.moveTo(sx + br, sy);
        ctx.lineTo(sx + sw - br, sy);
        ctx.quadraticCurveTo(sx + sw, sy, sx + sw, sy + br);
        ctx.lineTo(sx + sw, sy + sh - br);
        ctx.quadraticCurveTo(sx + sw, sy + sh, sx + sw - br, sy + sh);
        ctx.lineTo(sx + br, sy + sh);
        ctx.quadraticCurveTo(sx, sy + sh, sx, sy + sh - br);
        ctx.lineTo(sx, sy + br);
        ctx.quadraticCurveTo(sx, sy, sx + br, sy);
        ctx.closePath();
        ctx.clip();
        
        // Fill background behind image (for contain mode)
        ctx.fillStyle = '#020617';
        ctx.fillRect(sx, sy, sw, sh);

        // Calculate aspect ratio fill
        let scale;
        if (objectFit === 'cover') {
          scale = Math.max(sw / img.width, sh / img.height);
        } else {
          scale = Math.min(sw / img.width, sh / img.height);
        }
        
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const drawX = sx + (sw - drawW) / 2;
        const drawY = sy + (sh - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.restore();
        
        drawDeviceFrame(ctx, device);
      };
    } else {
      // Draw blank screen if no image
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(sx, sy, sw, sh);
      drawDeviceFrame(ctx, device);
    }

  }, [imageSrc, deviceType, objectFit]);

  const drawDeviceFrame = (ctx, device) => {
     const { cw, ch, sx, sy, sw, sh, outerRadius, hasNotch, type } = device;
     
     ctx.save();
     
     if (type === 'laptop') {
       // Laptop Screen Bezel
       ctx.strokeStyle = '#0f172a';
       ctx.lineWidth = 24;
       ctx.beginPath();
       ctx.roundRect(20, 20, 1160, 760, 20);
       ctx.stroke();
       
       // Inner bezel
       ctx.strokeStyle = '#334155';
       ctx.lineWidth = 4;
       ctx.beginPath();
       ctx.roundRect(30, 30, 1140, 740, 15);
       ctx.stroke();

       // Laptop Keyboard Base
       ctx.fillStyle = '#1e293b';
       ctx.beginPath();
       ctx.roundRect(0, 780, 1200, 40, 10);
       ctx.fill();
       
       // Laptop Trackpad indent
       ctx.fillStyle = '#0f172a';
       ctx.fillRect(cw/2 - 80, 790, 160, 10);

     } else {
       // Phone & Tablet Bezel
       ctx.strokeStyle = '#0f172a';
       ctx.lineWidth = 16;
       ctx.beginPath();
       ctx.roundRect(8, 8, cw - 16, ch - 16, outerRadius);
       ctx.stroke();
   
       // Inner Bezel gap
       ctx.strokeStyle = '#334155';
       ctx.lineWidth = 4;
       ctx.beginPath();
       ctx.roundRect(14, 14, cw - 28, ch - 28, outerRadius - 5);
       ctx.stroke();

       if (hasNotch) {
         // iPhone Dynamic Island Notch
         ctx.fillStyle = 'black';
         ctx.beginPath();
         ctx.roundRect((cw / 2) - 60, sy + 10, 120, 30, 15);
         ctx.fill();

         // Camera Lens
         ctx.fillStyle = '#1e293b';
         ctx.beginPath();
         ctx.arc((cw / 2) + 40, sy + 25, 6, 0, Math.PI * 2);
         ctx.fill();
       }
     }

     // Glare effect on screen
     ctx.fillStyle = 'rgba(255,255,255,0.03)';
     ctx.beginPath();
     ctx.moveTo(sx, sy);
     ctx.lineTo(sx + sw, sy);
     ctx.lineTo(sx, sy + sh);
     ctx.fill();

     ctx.restore();
  };

  const downloadMockup = () => {
    const link = document.createElement('a');
    link.download = `${deviceType}-mockup.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="page-container">
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Smartphone style={{display: 'inline', marginRight: '10px'}} /> Device Mockups</h1>
        <p className="subtitle">Wrap your app screenshots in beautiful hardware frames.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse', justifyContent: 'center'}}>
        
        {/* Controls */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '320px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div style={{width: '100%', position: 'relative', overflow: 'hidden'}}>
              <input type="file" accept="image/*" onChange={handleUpload} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10}} />
              <div className="btn btn-secondary" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '1rem', borderStyle: 'dashed'}}>
                <Upload size={18} /> Upload Screenshot
              </div>
            </div>

            {/* Device Selector */}
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <label style={{color: '#94a3b8', fontSize: '0.85rem'}}>Select Device Frame</label>
              <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                <button onClick={() => setDeviceType('phone')} className={`btn ${deviceType === 'phone' ? '' : 'btn-secondary'}`} style={{flex: 1, display: 'flex', justifyContent: 'center', gap: '0.3rem', padding: '0.6rem', fontSize: '0.9rem'}}>
                  <Smartphone size={16} /> Phone
                </button>
                <button onClick={() => setDeviceType('tablet')} className={`btn ${deviceType === 'tablet' ? '' : 'btn-secondary'}`} style={{flex: 1, display: 'flex', justifyContent: 'center', gap: '0.3rem', padding: '0.6rem', fontSize: '0.9rem'}}>
                  <Tablet size={16} /> Tablet
                </button>
                <button onClick={() => setDeviceType('laptop')} className={`btn ${deviceType === 'laptop' ? '' : 'btn-secondary'}`} style={{flex: 1, display: 'flex', justifyContent: 'center', gap: '0.3rem', padding: '0.6rem', fontSize: '0.9rem'}}>
                  <Monitor size={16} /> Laptop
                </button>
              </div>
            </div>

            {/* Object Fit Selector */}
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <label style={{color: '#94a3b8', fontSize: '0.85rem'}}>Image Fit Strategy</label>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button onClick={() => setObjectFit('contain')} className={`btn ${objectFit === 'contain' ? '' : 'btn-secondary'}`} style={{flex: 1, display: 'flex', justifyContent: 'center', gap: '0.3rem', padding: '0.6rem', fontSize: '0.9rem'}}>
                  <Minimize size={16} /> Fit Entire
                </button>
                <button onClick={() => setObjectFit('cover')} className={`btn ${objectFit === 'cover' ? '' : 'btn-secondary'}`} style={{flex: 1, display: 'flex', justifyContent: 'center', gap: '0.3rem', padding: '0.6rem', fontSize: '0.9rem'}}>
                  <Maximize size={16} /> Crop Fill
                </button>
              </div>
            </div>

            <button className="btn" onClick={downloadMockup} disabled={!imageSrc} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', marginTop: '0.5rem'}}>
              <Download size={18} /> Download Mockup
            </button>
          </div>
        </div>

        {/* Canvas Display */}
        <div style={{flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '2rem'}}>
           <canvas 
             ref={canvasRef} 
             style={{
               width: '100%', 
               maxWidth: deviceType === 'laptop' ? '600px' : deviceType === 'tablet' ? '400px' : '300px', 
               height: 'auto', 
               filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.5))',
               background: 'transparent',
               transition: 'max-width 0.3s ease'
             }} 
           />
        </div>

      </div>
    </div>
  );
};

export default DeviceMockup;
