import { useState } from 'react';
import { Type } from 'lucide-react';

const CaseConverter = () => {
  const [text, setText] = useState('');

  const toCamelCase = () => {
    return text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return ""; 
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    }).replace(/\s+/g, '');
  };

  const toSnakeCase = () => {
    return text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '';
  };

  const toTitleCase = () => {
    return text.toLowerCase().split(' ').map(word => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  };

  const toAlternating = () => {
    return text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1><Type style={{display: 'inline', marginRight: '10px'}} /> Text Case Converter</h1>
        <p className="subtitle">Transform your text into any casing format instantly.</p>
      </header>

      <div className="result-card">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          style={{width: '100%', minHeight: '200px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '1.5rem', color: '#f8fafc', fontSize: '1.1rem', resize: 'vertical', marginBottom: '2rem'}}
        />

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem'}}>
          <button className="btn btn-secondary" onClick={() => setText(text.toUpperCase())}>UPPERCASE</button>
          <button className="btn btn-secondary" onClick={() => setText(text.toLowerCase())}>lowercase</button>
          <button className="btn btn-secondary" onClick={() => setText(toTitleCase())}>Title Case</button>
          <button className="btn btn-secondary" onClick={() => setText(toCamelCase())}>camelCase</button>
          <button className="btn btn-secondary" onClick={() => setText(toSnakeCase())}>snake_case</button>
          <button className="btn btn-secondary" onClick={() => setText(text.replace(/\s+/g, '-').toLowerCase())}>kebab-case</button>
          <button className="btn btn-secondary" onClick={() => setText(toAlternating())}>sPoNgEbOb cAsE</button>
          <button className="btn" onClick={() => { navigator.clipboard.writeText(text); alert('Text copied!'); }}>Copy Result</button>
        </div>
        
        <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem'}}>
          <span>Character Count: {text.length}</span>
          <span>Word Count: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;
