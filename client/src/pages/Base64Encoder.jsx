import { useState } from 'react';
import { HardDrive, Upload, Copy } from 'lucide-react';

const Base64Encoder = () => {
  const [base64, setBase64] = useState('');
  const [fileData, setFileData] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileData({ name: file.name, size: (file.size / 1024).toFixed(2), type: file.type || 'Unknown' });

    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    if (base64) {
      navigator.clipboard.writeText(base64);
      alert('Base64 string copied to clipboard!');
    }
  };

  return (
    <div className="page-container" style={{maxWidth: '900px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><HardDrive style={{display: 'inline', marginRight: '10px'}} /> Base64 Data Encoder</h1>
        <p className="subtitle">Convert any physical file into a copyable data string for HTML/CSS embedding.</p>
      </header>

      <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
        
        {/* Upload Zone */}
        <div style={{width: '100%', position: 'relative', overflow: 'hidden'}}>
          <input type="file" onChange={handleUpload} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10}} />
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', padding: '3rem', border: '2px dashed var(--card-border)', borderRadius: '16px', background: 'rgba(0,0,0,0.2)'}}>
            <Upload size={32} color="#3b82f6" />
            <h3 style={{margin: 0, color: '#f8fafc'}}>Drag & Drop any file here</h3>
            <p style={{margin: 0, color: '#64748b', fontSize: '0.9rem'}}>Images, Fonts, PDF, SVG, etc (Max ~5MB recommended for performance)</p>
          </div>
        </div>

        {fileData && (
          <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
            <div className="result-card" style={{flex: 1, padding: '1.5rem', background: 'var(--card-bg)'}}>
               <h3 style={{color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem'}}>File Properties</h3>
               <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '1rem'}}>
                 <div><strong>Name:</strong> {fileData.name}</div>
                 <div><strong>Type:</strong> {fileData.type}</div>
                 <div><strong>Size:</strong> {fileData.size} KB</div>
               </div>
            </div>

            <div className="result-card" style={{flex: 2, padding: 0, display: 'flex', flexDirection: 'column', maxHeight: '400px'}}>
               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--card-border)'}}>
                 <span style={{color: '#cbd5e1', fontWeight: 'bold'}}>Base64 Raw Data DataURI</span>
                 <button onClick={copyToClipboard} className="btn" style={{padding: '0.4rem 1rem', fontSize: '0.9rem'}}><Copy size={16} /> Copy All</button>
               </div>
               <textarea 
                 readOnly 
                 value={base64} 
                 style={{flex: 1, padding: '1rem', background: 'transparent', border: 'none', color: '#10b981', fontFamily: 'monospace', fontSize: '0.85rem', resize: 'none', outline: 'none'}}
               />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Base64Encoder;
