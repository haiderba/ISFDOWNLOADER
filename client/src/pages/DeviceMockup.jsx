import { useState, useRef, useEffect } from 'react';
import { Smartphone, Download, Upload } from 'lucide-react';

const DeviceMockup = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null);

  // SVG dimensions for an iPhone Mockup
  const frameWidth = 400;
  const frameHeight = 820;
  const screenX = 24;
  const screenY = 24;
  const screenWidth = 352;
  const screenHeight = 772;
  const borderRadius = 40;

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

    // Clear canvas
    ctx.clearRect(0, 0, frameWidth, frameHeight);

    // 1. Draw the user image inside the screen bounds
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        // Save ctx state
        ctx.save();
        
        // Create clipping mask for the rounded screen corners
        ctx.beginPath();
        ctx.moveTo(screenX + borderRadius, screenY);
        ctx.lineTo(screenX + screenWidth - borderRadius, screenY);
        ctx.quadraticCurveTo(screenX + screenWidth, screenY, screenX + screenWidth, screenY + borderRadius);
        ctx.lineTo(screenX + screenWidth, screenY + screenHeight - borderRadius);
        ctx.quadraticCurveTo(screenX + screenWidth, screenY + screenHeight, screenX + screenWidth - borderRadius, screenY + screenHeight);
        ctx.lineTo(screenX + borderRadius, screenY + screenHeight);
        ctx.quadraticCurveTo(screenX, screenY + screenHeight, screenX, screenY + screenHeight - borderRadius);
        ctx.lineTo(screenX, screenY + borderRadius);
        ctx.quadraticCurveTo(screenX, screenY, screenX + borderRadius, screenY);
        ctx.closePath();
        ctx.clip(); // Apply mask

        // Calculate aspect ratio fill (cover)
        const scale = Math.max(screenWidth / img.width, screenHeight / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const drawX = screenX + (screenWidth - drawW) / 2;
        const drawY = screenY + (screenHeight - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // Restore to drop mask
        ctx.restore();
        
        drawDeviceFrame(ctx);
      };
    } else {
      // Draw blank screen if no image
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(screenX, screenY, screenWidth, screenHeight);
      drawDeviceFrame(ctx);
    }

  }, [imageSrc]);

  const drawDeviceFrame = (ctx) => {
     // Frame Bezel
     ctx.save();
     ctx.strokeStyle = '#0f172a';
     ctx.lineWidth = 16;
     ctx.beginPath();
     // Outer frame with slight padding from edge
     ctx.roundRect(8, 8, frameWidth - 16, frameHeight - 16, 50);
     ctx.stroke();
 
     // Inner Bezel gap
     ctx.strokeStyle = '#334155';
     ctx.lineWidth = 4;
     ctx.beginPath();
     ctx.roundRect(14, 14, frameWidth - 28, frameHeight - 28, 45);
     ctx.stroke();

     // iPhone Dynamic Island Notch
     ctx.fillStyle = 'black';
     ctx.beginPath();
     ctx.roundRect((frameWidth / 2) - 60, screenY + 10, 120, 30, 15);
     ctx.fill();

     // Camera Lens
     ctx.fillStyle = '#1e293b';
     ctx.beginPath();
     ctx.arc((frameWidth / 2) + 40, screenY + 25, 6, 0, Math.PI * 2);
     ctx.fill();

     // Glare effect on screen
     ctx.fillStyle = 'rgba(255,255,255,0.03)';
     ctx.beginPath();
     ctx.moveTo(screenX, screenY);
     ctx.lineTo(screenX + screenWidth, screenY);
     ctx.lineTo(screenX, screenY + screenHeight);
     ctx.fill();

     ctx.restore();
  };

  const downloadMockup = () => {
    const link = document.createElement('a');
    link.download = 'device-mockup.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="page-container" style={{maxWidth: '900px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Smartphone style={{display: 'inline', marginRight: '10px'}} /> Device Mockup</h1>
        <p className="subtitle">Wrap your app screenshots in beautiful mobile bezels.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse', justifyContent: 'center'}}>
        
        {/* Controls */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center'}}>
            
            <div style={{width: '100%', position: 'relative', overflow: 'hidden'}}>
              <input type="file" accept="image/*" onChange={handleUpload} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10}} />
              <div className="btn btn-secondary" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '1rem', borderStyle: 'dashed'}}>
                <Upload size={18} /> Upload Screenshot
              </div>
            </div>

            <p style={{color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center'}}>We will automatically crop and fill the screenshot to fit perfectly inside the device screen frame.</p>

            <button className="btn" onClick={downloadMockup} disabled={!imageSrc} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem'}}>
              <Download size={18} /> Download Mockup
            </button>
            <span style={{color: 'transparent', userSelect: 'none'}}>.</span>
          </div>
        </div>

        {/* Canvas Display */}
        <div style={{flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           {/* We draw the canvas at actual size, but scale it down with CSS for preview */}
           <canvas 
             ref={canvasRef} 
             width={frameWidth} 
             height={frameHeight} 
             style={{
               width: '100%', 
               maxWidth: '300px', 
               height: 'auto', 
               filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.5))',
               background: 'transparent'
             }} 
           />
        </div>

      </div>
    </div>
  );
};

export default DeviceMockup;
