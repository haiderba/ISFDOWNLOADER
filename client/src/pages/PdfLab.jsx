import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { FilePlus, Scissors, Download, FileText, X, AlertCircle, Image as ImageIcon, Info, Type, Trash2 } from 'lucide-react';
import ToolHeader from '../components/ToolHeader';

const PdfLab = () => {
  const [activeTab, setActiveTab] = useState('merge');
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    let validFiles = [];

    if (activeTab === 'image-to-pdf') {
      validFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    } else {
      validFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    }

    if (validFiles.length === 0) {
      setError('Please select valid files for this operation.');
      return;
    }
    setError(null);
    setFiles(prev => [...prev, ...validFiles.map(file => ({ file, id: Math.random().toString(36).substr(2, 9) }))]);
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
    setError(null);
    setExtractedText('');
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError('Select at least 2 PDFs to merge.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const item of files) {
        const fileBytes = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfBytes = await mergedPdf.save();
      downloadFile(mergedPdfBytes, 'merged_document.pdf', 'application/pdf');
    } catch (err) {
      setError('Error merging PDFs: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const splitPdf = async (item) => {
    setIsProcessing(true);
    setError(null);
    try {
      const fileBytes = await item.file.arrayBuffer();
      const pdf = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
      const pageCount = pdf.getPageCount();
      
      // We'll only split the first 10 pages to avoid browser blocking multiple downloads
      const limit = Math.min(pageCount, 10);
      for (let i = 0; i < limit; i++) {
        const subPdf = await PDFDocument.create();
        const [copiedPage] = await subPdf.copyPages(pdf, [i]);
        subPdf.addPage(copiedPage);
        const subPdfBytes = await subPdf.save();
        downloadFile(subPdfBytes, `${item.file.name.replace('.pdf', '')}_page_${i + 1}.pdf`, 'application/pdf');
      }
      if (pageCount > 10) {
        setError('Only the first 10 pages were split to prevent browser blocking multiple downloads.');
      }
    } catch (err) {
      setError('Error splitting PDF: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const imagesToPdf = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const item of files) {
        const imgBytes = await item.file.arrayBuffer();
        let img;
        if (item.file.type === 'image/jpeg' || item.file.type === 'image/jpg') {
          img = await pdfDoc.embedJpg(imgBytes);
        } else if (item.file.type === 'image/png') {
          img = await pdfDoc.embedPng(imgBytes);
        } else {
          continue; // Skip unsupported types
        }
        
        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, {
          x: 0,
          y: 0,
          width: img.width,
          height: img.height,
        });
      }
      const pdfBytes = await pdfDoc.save();
      downloadFile(pdfBytes, 'images_to_pdf.pdf', 'application/pdf');
    } catch (err) {
      setError('Error creating PDF from images: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (data, fileName, type) => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <div className="page-container">
      <ToolHeader 
        title="The Lab: PDF & Document Suite" 
        description="Professional-grade PDF tools. Merge, Split, Convert, and Manage locally."
      />

      <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {[
            { id: 'merge', label: 'Merge', icon: FilePlus },
            { id: 'split', label: 'Split', icon: Scissors },
            { id: 'image-to-pdf', label: 'Images to PDF', icon: ImageIcon },
          ].map(tab => (
            <button 
              key={tab.id}
              className={`btn ${activeTab === tab.id ? 'primary' : 'secondary'}`}
              onClick={() => { setActiveTab(tab.id); setFiles([]); setError(null); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
          <button className="btn secondary" onClick={clearAll} style={{ marginLeft: 'auto', color: '#f43f5e' }}>
            <Trash2 size={16} /> Clear
          </button>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.2)', color: '#f43f5e', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertCircle size={20} /> {error}
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '3rem 2rem', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '20px', marginBottom: '2rem', background: 'rgba(255,255,255,0.01)' }}>
          <input 
            type="file" 
            accept={activeTab === 'image-to-pdf' ? "image/jpeg,image/png" : ".pdf"} 
            multiple
            onChange={handleFileChange} 
            id="pdf-upload"
            style={{ display: 'none' }} 
          />
          <label htmlFor="pdf-upload" style={{ cursor: 'pointer' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#3b82f6' }}>
              {activeTab === 'image-to-pdf' ? <ImageIcon size={40} /> : <FilePlus size={40} />}
            </div>
            <h3 style={{ margin: '0 0 0.5rem', color: '#f8fafc' }}>
              {activeTab === 'merge' ? 'Select PDFs to Merge' : activeTab === 'split' ? 'Select a PDF to Split' : 'Select Images to convert to PDF'}
            </h3>
            <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>
              Drag and drop files here or click to browse. Files are processed locally in your secure environment.
            </p>
          </label>
        </div>

        {files.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', color: '#cbd5e1', margin: 0 }}>Queue ({files.length} items)</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {files.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {activeTab === 'image-to-pdf' ? <ImageIcon size={20} color="#f59e0b" /> : <FileText size={20} color="#3b82f6" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.file.name}</p>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>{(item.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {activeTab === 'split' && (
                      <button onClick={() => splitPdf(item)} disabled={isProcessing} className="btn primary" style={{ padding: '0.4rem', borderRadius: '6px' }} title="Split this PDF">
                        <Scissors size={14} />
                      </button>
                    )}
                    <button onClick={() => removeFile(item.id)} style={{ padding: '0.4rem', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && activeTab !== 'split' && (
          <button 
            className="btn primary" 
            onClick={activeTab === 'merge' ? mergePdfs : imagesToPdf} 
            disabled={isProcessing || (activeTab === 'merge' && files.length < 2)}
            style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', borderRadius: '12px' }}
          >
            {isProcessing ? 'Processing...' : (
              <>
                <Download size={22} /> {activeTab === 'merge' ? `Merge ${files.length} PDFs` : `Convert ${files.length} Images to PDF`}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PdfLab;
