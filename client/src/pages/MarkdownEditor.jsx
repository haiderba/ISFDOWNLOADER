import { useState, useEffect } from 'react';
import { FileEdit } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('# Hello Markdown\n\nWrite your *markdown* here.\n\n- It\n- Renders\n- **Live!**\n\n[Visit OpenAI](https://openai.com)');
  const [html, setHtml] = useState('');

  useEffect(() => {
    const rawHtml = marked.parse(markdown);
    const safeHtml = DOMPurify.sanitize(rawHtml);
    setHtml(safeHtml);
  }, [markdown]);

  return (
    <div className="page-container" style={{maxWidth: '1200px'}}>
      <header className="page-header">
        <h1><FileEdit style={{display: 'inline', marginRight: '10px'}} /> Markdown Editor</h1>
        <p className="subtitle">Live preview of your markdown formatting.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem'}}>
        {/* Editor */}
        <div style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column'}}>
          <div style={{marginBottom: '1rem'}}><h3 style={{color: '#cbd5e1'}}>Markdown</h3></div>
          <textarea 
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            style={{flex: 1, minHeight: '600px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '1rem', color: '#f8fafc', fontFamily: 'monospace', fontSize: '1rem', resize: 'vertical'}}
          />
        </div>

        {/* Preview Container */}
        <div style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column'}}>
          <div style={{marginBottom: '1rem'}}><h3 style={{color: '#cbd5e1'}}>Live Preview</h3></div>
          
          <div 
            className="markdown-preview"
            style={{flex: 1, minHeight: '600px', background: 'white', color: '#1e293b', border: 'none', borderRadius: '12px', padding: '2rem', overflowY: 'auto'}}
            dangerouslySetInnerHTML={{__html: html}}
          />
        </div>
      </div>
      
      {/* We add basic markdown styles so the preview looks like normal HTML, since our global styles are dark mode */}
      <style>{`
        .markdown-preview h1 { border-bottom: 1px solid #cbd5e1; padding-bottom: 0.5rem; margin-bottom: 1rem; color: #0f172a; }
        .markdown-preview h2 { margin-top: 1.5rem; margin-bottom: 1rem; color: #1e293b; }
        .markdown-preview p { margin-bottom: 1rem; line-height: 1.6; }
        .markdown-preview ul { margin-left: 1.5rem; margin-bottom: 1rem; list-style-type: disc; }
        .markdown-preview a { color: #2563eb; text-decoration: underline; }
        .markdown-preview strong { font-weight: bold; }
        .markdown-preview em { font-style: italic; }
      `}</style>
    </div>
  );
};

export default MarkdownEditor;
