import { useState } from 'react';
import { AlignLeft, BarChart2 } from 'lucide-react';

const TextAnalyzer = () => {
  const [content, setContent] = useState('');

  const analyze = () => {
    const raw = content.trim();
    if (!raw) return { words: 0, chars: 0, withoutSpaces: 0, readTimeMinutes: 0, topWords: [] };

    const charCount = raw.length;
    const noSpaces = raw.replace(/\s+/g, '').length;
    
    // Split on any non-word characters for pure word density tracking
    const wordTokens = raw.toLowerCase().match(/\b[\w']+\b/g) || [];
    const wordCount = wordTokens.length;
    
    // Avg reading speed is 225 wpm
    const readTime = Math.ceil(wordCount / 225) || 0;

    // Filter out common stop words for the keyword density map
    const stopWords = new Set(["the", "and", "a", "an", "of", "to", "in", "it", "is", "that", "you", "for", "on", "was", "with", "as", "i", "he", "this", "they", "at", "be", "but", "have", "not", "we", "are"]);
    
    const freqMap = {};
    wordTokens.forEach(w => {
      if (!stopWords.has(w) && w.length > 2) { // must be longer than 2 chars to be an interesting keyword
        freqMap[w] = (freqMap[w] || 0) + 1;
      }
    });

    const topWords = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1]) // sort by val descending
      .slice(0, 10); // get top 10

    return {
      words: wordCount,
      chars: charCount,
      withoutSpaces: noSpaces,
      readTimeMinutes: readTime,
      topWords: topWords
    };
  };

  const results = analyze();

  return (
    <div className="page-container" style={{maxWidth: '1200px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><AlignLeft style={{display: 'inline', marginRight: '10px'}} /> Text Analyzer & Density</h1>
        <p className="subtitle">Instant reading metrics and keyword density extraction.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse'}}>
        
        {/* Editor */}
        <div style={{flex: 1.5, minWidth: '350px'}}>
          <div className="result-card" style={{padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '500px'}}>
            <textarea 
              className="search-input"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Paste your essay, article, or document here to analyze..."
              style={{flex: 1, resize: 'none', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6'}}
            ></textarea>
          </div>
        </div>

        {/* Results */}
        <div style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
           
           {/* Top Stats Grid */}
           <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
             <div style={{background: 'var(--card-bg)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center'}}>
                <p style={{color: '#60a5fa', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold'}}>Words</p>
                <h2 style={{margin: 0, fontSize: '2.5rem', color: '#f8fafc'}}>{results.words.toLocaleString()}</h2>
             </div>
             <div style={{background: 'var(--card-bg)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center'}}>
                <p style={{color: '#34d399', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold'}}>Characters</p>
                <h2 style={{margin: 0, fontSize: '2.5rem', color: '#f8fafc'}}>{results.chars.toLocaleString()}</h2>
             </div>
             <div style={{background: 'var(--card-bg)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center'}}>
                <p style={{color: '#a78bfa', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold'}}>Chars (No Space)</p>
                <h2 style={{margin: 0, fontSize: '2.5rem', color: '#f8fafc'}}>{results.withoutSpaces.toLocaleString()}</h2>
             </div>
             <div style={{background: 'var(--card-bg)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center'}}>
                <p style={{color: '#fbbf24', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold'}}>Read Time</p>
                <h2 style={{margin: 0, fontSize: '2.5rem', color: '#f8fafc'}}>{results.readTimeMinutes}<span style={{fontSize: '1rem', color: '#94a3b8', fontWeight: 'normal'}}>{results.readTimeMinutes === 1 ? 'min' : 'mins'}</span></h2>
             </div>
           </div>

           {/* Keyword Density Map */}
           <div className="result-card" style={{padding: '2rem'}}>
             <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem'}}>
               <BarChart2 size={20} /> Keyword Extraction
             </h3>

             {results.topWords.length > 0 ? (
               <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.8rem'}}>
                 {results.topWords.map(([word, freq], idx) => {
                    // scale size based on frequency relative to highest
                    const maxFreq = results.topWords[0][1];
                    const heat = Math.round((freq / maxFreq) * 100);
                    
                    return (
                      <div key={idx} style={{
                        background: `rgba(59, 130, 246, ${Math.max(0.2, heat / 100)})`,
                        border: '1px solid rgba(59, 130, 246, 0.4)',
                        padding: '0.5rem 1rem', borderRadius: '99px',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                      }}>
                         <strong style={{color: 'white'}}>{word}</strong>
                         <span style={{background: 'rgba(0,0,0,0.4)', borderRadius: '99px', padding: '0.1rem 0.5rem', fontSize: '0.8rem', color: '#94a3b8'}}>{freq}</span>
                      </div>
                    )
                 })}
               </div>
             ) : (
               <p style={{color: '#64748b', textAlign: 'center'}}>Paste text to extract semantic keywords.</p>
             )}
           </div>

        </div>

      </div>
    </div>
  );
};

export default TextAnalyzer;
