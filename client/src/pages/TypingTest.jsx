import { useState, useEffect, useRef } from 'react';
import { Keyboard, RotateCcw } from 'lucide-react';

const COMMON_WORDS = "the be to of and a in that have i it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us".split(" ");

const generateWords = (count) => {
  return Array.from({length: count}, () => COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]);
};

const TypingTest = () => {
  const [words, setWords] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charStatus, setCharStatus] = useState([]); // array of "correct" | "incorrect" for past words
  
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, correctChars: 0, incorrectChars: 0 });

  const inputRef = useRef(null);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      finishGame();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const resetGame = () => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(60);
    setWords(generateWords(100)); // generate 100 words queue
    setWordIndex(0);
    setInputVal('');
    setCharStatus([]);
    if (inputRef.current) inputRef.current.focus();
  };

  const finishGame = () => {
    setIsActive(false);
    setIsFinished(true);
    
    let totalCorrect = 0;
    let totalIncorrect = 0;

    // Standard WPM calculation: (total correct characters / 5) / time in minutes
    // Time is 60s, so time in minutes = 1
    charStatus.forEach((wordTokens) => {
      wordTokens.forEach(status => {
        if (status === 'correct') totalCorrect++;
        else totalIncorrect++;
      });
      totalCorrect++; // count the space bar as a correct character for finished words
    });

    const wpm = Math.round(totalCorrect / 5);
    const accuracy = ((totalCorrect / (totalCorrect + totalIncorrect)) * 100) || 0;

    setStats({ wpm, accuracy: Math.round(accuracy), correctChars: totalCorrect, incorrectChars: totalIncorrect });
  };

  const handleInput = (e) => {
    if (isFinished) return;
    if (!isActive && e.target.value.length > 0) {
      setIsActive(true);
    }

    const val = e.target.value;
    
    // Space bar pressed
    if (val.endsWith(' ')) {
      const typedWord = val.trim();
      const targetWord = words[wordIndex];
      
      const newStatus = [...charStatus];
      let wordResult = [];
      
      // Calculate correctness for the word
      for (let i = 0; i < Math.max(typedWord.length, targetWord.length); i++) {
        if (typedWord[i] === targetWord[i]) wordResult.push('correct');
        else wordResult.push('incorrect');
      }
      
      newStatus[wordIndex] = wordResult;
      setCharStatus(newStatus);
      
      setWordIndex(wordIndex + 1);
      setInputVal('');

      // Add more words if getting close to end
      if (wordIndex > words.length - 20) {
        setWords([...words, ...generateWords(50)]);
      }
    } else {
      setInputVal(val);
    }
  };

  // Render the current active word dynamically styling each letter
  const renderActiveWord = () => {
    const targetWord = words[wordIndex] || '';
    return targetWord.split('').map((char, i) => {
      let color = '#64748b'; // default future letter
      if (i < inputVal.length) {
        color = inputVal[i] === char ? '#f8fafc' : '#ef4444'; // white if correct, red if wrong
      }
      return <span key={i} style={{color, background: inputVal[i] !== char && i < inputVal.length ? 'rgba(239,68,68,0.2)' : 'transparent'}}>{char}</span>;
    });
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1><Keyboard style={{display: 'inline', marginRight: '10px'}} /> Typing Speed Test</h1>
        <p className="subtitle">Test your Words Per Minute (WPM) speed against the clock.</p>
      </header>

      <div className="result-card">
        
        {/* Top Bar */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold'}}>
          <div style={{color: timeLeft <= 10 ? '#ef4444' : '#60a5fa'}}>{timeLeft}s</div>
          <button className="btn btn-secondary" onClick={resetGame} style={{padding: '0.5rem', borderRadius: '50%'}}>
            <RotateCcw size={20} />
          </button>
        </div>

        {isFinished ? (
          <div style={{textAlign: 'center', animation: 'slideUp 0.5s ease'}}>
            <h2 style={{color: '#10b981', fontSize: '5rem', margin: 0}}>{stats.wpm} <span style={{fontSize: '1.5rem', color: '#64748b'}}>WPM</span></h2>
            <p style={{fontSize: '1.2rem', marginBottom: '2rem'}}>Accuracy: <span style={{color: '#f8fafc', fontWeight: 'bold'}}>{stats.accuracy}%</span></p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
              <span style={{color: '#10b981'}}>Correct keys: {stats.correctChars}</span>
              <span style={{color: '#ef4444'}}>Incorrect keys: {stats.incorrectChars}</span>
            </div>
            <button className="btn" onClick={resetGame} style={{marginTop: '3rem', padding: '1rem 3rem'}}>Test Again</button>
          </div>
        ) : (
          <>
            {/* Word Display Box */}
            <div style={{fontSize: '1.8rem', fontFamily: 'monospace', lineHeight: '2.5', height: '150px', overflow: 'hidden', position: 'relative', userSelect: 'none', color: '#64748b'}}>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', opacity: isActive ? 1 : 0.5, transition: 'opacity 0.3s'}}>
                
                {/* Render Past Words (last 10 so it doesn't overflow) */}
                {words.slice(Math.max(0, wordIndex - 10), wordIndex).map((word, wId) => {
                  const absoluteIdx = Math.max(0, wordIndex - 10) + wId;
                  const statues = charStatus[absoluteIdx];
                  const hasError = statues && statues.includes('incorrect');
                  return (
                    <span key={`past-${absoluteIdx}`} style={{color: hasError ? '#ef4444' : '#10b981'}}>
                      {word}
                    </span>
                  );
                })}

                {/* Render Current Active Word */}
                <span style={{borderBottom: '2px solid #60a5fa'}}>
                  {renderActiveWord()}
                </span>

                {/* Render Future Words */}
                {words.slice(wordIndex + 1, wordIndex + 15).map((word, i) => (
                  <span key={`future-${i}`}>{word}</span>
                ))}

              </div>
            </div>

            {/* Input Overlay */}
            <input 
              ref={inputRef}
              type="text" 
              value={inputVal}
              onChange={handleInput}
              disabled={isFinished}
              placeholder={isActive ? "" : "Start typing to begin..."}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              style={{
                width: '100%', padding: '1.5rem', background: 'var(--card-bg)', border: '2px solid var(--gradient-1)', 
                borderRadius: '12px', fontSize: '1.5rem', color: '#f8fafc', outline: 'none', textAlign: 'center',
                boxShadow: isActive ? '0 0 20px rgba(59, 130, 246, 0.3)' : 'none',
                transition: 'box-shadow 0.3s', marginTop: '2rem'
              }}
            />
          </>
        )}

      </div>
    </div>
  );
};

export default TypingTest;
