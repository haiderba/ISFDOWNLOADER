import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QrGenerator = () => {
  const [text, setText] = useState('');
  const qrRef = useRef(null);

  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = 'qrcode.png';
      a.href = pngFile;
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="page-container qr-page">
      <header className="page-header">
        <h1>QR Code Generator</h1>
        <p className="subtitle">Generate and download QR codes instantly.</p>
      </header>

      <div className="qr-container">
        <textarea
          className="qr-input"
          placeholder="Enter URL or text to generate a QR Code..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
        
        <div className="qr-display" ref={qrRef}>
          {text ? (
            <QRCodeSVG value={text} size={250} level={"H"} includeMargin={true} />
          ) : (
            <div className="qr-placeholder">Your QR Code will appear here</div>
          )}
        </div>
        
        {text && (
          <button className="btn" onClick={downloadQR}>
            Download QR Code (PNG)
          </button>
        )}
      </div>
    </div>
  );
};

export default QrGenerator;
