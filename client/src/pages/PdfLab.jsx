import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FilePlus, Scissors, Download, FileText, X, AlertCircle } from 'lucide-react';
import ToolHeader from '../components/ToolHeader';

const PdfLab = () => {
  const [activeTab, setActiveTab] = useState('merge');
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
    if (selectedFiles.length === 0) {
      setError('Please select valid PDF files.');
      return;
    }
    setError(null);
    setFiles(prev => [...prev, ...selectedFiles.map(file => ({ file, id: Math.random().toString(36).substr(2, 9) }))]);
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
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
      downloadBlob(mergedPdfBytes, 'merged_document.pdf');
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

      for (let i = 0; i < pageCount; i++) {
        const subPdf = await PDFDocument.create();
        const [copiedPage] = await subPdf.copyPages(pdf, [i]);
        subPdf.addPage(copiedPage);
        const subPdfBytes = await subPdf.save();
        downloadBlob(subPdfBytes, `${item.file.name.replace('.pdf', '')}_page_${i + 1}.pdf`);
      }
    } catch (err) {
      setError('Error splitting PDF: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadBlob = (bytes, fileName) => {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <div className="page-container">
      <ToolHeader 
        title="The Lab: PDF Suite" 
        description="Merge, Split, and Organize your PDF files locally."
      />

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <button 
            className={`btn ${activeTab === 'merge' ? 'primary' : 'secondary'}`}
            onClick={() => setActiveTab('merge')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <FilePlus size={18} /> Merge PDFs
          </button>
          <button 
            className={`btn ${activeTab === 'split' ? 'primary' : 'secondary'}`}
            onClick={() => setActiveTab('split')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Scissors size={18} /> Split PDF
          </button>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.2)', color: '#f43f5e', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertCircle size={20} /> {error}
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '2rem', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '16px', marginBottom: '2rem' }}>
          <input 
            type="file" 
            accept=".pdf" 
            multiple={activeTab === 'merge'}
            onChange={handleFileChange} 
            id="pdf-upload"
            style={{ display: 'none' }} 
          />
          <label htmlFor="pdf-upload" style={{ cursor: 'pointer' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#3b82f6' }}>
              <FilePlus size={32} />
            </div>
            <p style={{ margin: 0, color: '#cbd5e1', fontWeight: '500' }}>
              {activeTab === 'merge' ? 'Click to select multiple PDFs' : 'Select a PDF to split into single pages'}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>Files are processed 100% locally in your browser</p>
          </label>
        </div>

        {files.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '1rem' }}>Selected Files ({files.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {files.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <FileText size={20} color="#3b82f6" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.file.name}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{(item.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  {activeTab === 'merge' ? (
                    <button onClick={() => removeFile(item.id)} style={{ padding: '0.5rem', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                      <X size={18} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => splitPdf(item)}
                      disabled={isProcessing}
                      className="btn primary" 
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                    >
                      {isProcessing ? 'Processing...' : 'Split into Pages'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'merge' && files.length > 0 && (
          <button 
            className="btn primary" 
            onClick={mergePdfs} 
            disabled={isProcessing || files.length < 2}
            style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
          >
            {isProcessing ? 'Merging...' : (
              <>
                <Download size={20} /> Merge {files.length} PDFs
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PdfLab;
