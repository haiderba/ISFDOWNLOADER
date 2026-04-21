import { useState } from 'react';
import { Files, Upload, Download, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

const PdfMerger = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validPdfs = files.filter(f => f.type === 'application/pdf');
    
    if (validPdfs.length > 0) {
      const newItems = validPdfs.map(f => ({
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
        file: f,
        name: f.name
      }));
      setPdfFiles(prev => [...prev, ...newItems]);
    }
  };

  const moveItem = (index, dir) => {
    const newItems = [...pdfFiles];
    if (dir === 'up' && index > 0) {
      [newItems[index], newItems[index-1]] = [newItems[index-1], newItems[index]];
    } else if (dir === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index+1]] = [newItems[index+1], newItems[index]];
    }
    setPdfFiles(newItems);
  };

  const removeItem = (id) => {
    setPdfFiles(prev => prev.filter(p => p.id !== id));
  };

  const mergePdfs = async () => {
    if (pdfFiles.length < 2) return;
    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();
      let totalPagesAdded = 0;

      for (const item of pdfFiles) {
        // Read file using FileReader for maximum browser compatibility
        const buffer = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsArrayBuffer(item.file);
        });

        // Load into pdf-lib
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        
        const indices = pdfDoc.getPageIndices();
        if (indices.length === 0) {
           console.warn(`File ${item.name} has no pages or is unreadable.`);
           continue;
        }

        // Copy all pages
        const copiedPages = await mergedPdf.copyPages(pdfDoc, indices);
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        totalPagesAdded += copiedPages.length;
      }

      if (totalPagesAdded === 0) {
        throw new Error("No readable pages were found across any of the selected documents.");
      }

      // Save and Download
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged_document.pdf';
      document.body.appendChild(link); // Required for some browsers
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (e) {
      console.error(e);
      alert('Error merging PDFs. Ensure all files are valid PDFs and not heavily encrypted.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="page-container" style={{maxWidth: '800px', margin: '0 auto'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Files style={{display: 'inline', marginRight: '10px'}} /> PDF Merger</h1>
        <p className="subtitle">Merge multiple PDF files securely right in your browser. Files never leave your device.</p>
      </header>

      <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
        
        {/* Upload Block */}
        <div style={{width: '100%', position: 'relative', overflow: 'hidden'}}>
          <input type="file" multiple accept="application/pdf" onChange={handleFileUpload} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10}} />
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', padding: '3rem', border: '2px dashed var(--card-border)', borderRadius: '16px', background: 'rgba(0,0,0,0.2)'}}>
            <Upload size={32} color="#94a3b8" />
            <h3 style={{margin: 0, color: '#f8fafc'}}>Drag & Drop PDFs here</h3>
            <p style={{margin: 0, color: '#64748b', fontSize: '0.9rem'}}>Or click to browse your files</p>
          </div>
        </div>

        {/* File List */}
        {pdfFiles.length > 0 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px'}}>
            <h3 style={{color: '#cbd5e1', fontSize: '1rem', marginBottom: '0.5rem'}}>Document Order</h3>
            
            {pdfFiles.map((file, idx) => (
              <div key={file.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px'}}>
                <span style={{color: '#f8fafc', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '1rem'}}>{file.name}</span>
                
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <button className="btn btn-secondary" disabled={idx === 0} onClick={() => moveItem(idx, 'up')} style={{padding: '0.4rem'}}><ArrowUp size={16} /></button>
                  <button className="btn btn-secondary" disabled={idx === pdfFiles.length - 1} onClick={() => moveItem(idx, 'down')} style={{padding: '0.4rem'}}><ArrowDown size={16} /></button>
                  <button className="btn btn-secondary" onClick={() => removeItem(file.id)} style={{padding: '0.4rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)'}}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            <button className="btn" onClick={mergePdfs} disabled={isProcessing || pdfFiles.length < 2} style={{marginTop: '1.5rem', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'}}>
               {isProcessing ? 'Merging PDFs...' : <><Download size={18} /> Merge & Download</>}
            </button>
            {pdfFiles.length < 2 && <p style={{color: '#ef4444', textAlign: 'center', fontSize: '0.85rem', marginTop: '0.5rem'}}>Please upload at least 2 PDFs to merge.</p>}
          </div>
        )}

      </div>
    </div>
  );
};

export default PdfMerger;
