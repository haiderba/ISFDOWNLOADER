import { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

const PomodoroTimer = () => {
  const [mode, setMode] = useState('focus'); // 'focus' or 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Play sound and switch
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play();
      if (mode === 'focus') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }

    // Update Document Title
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.title = `${m}:${s.toString().padStart(2, '0')} - ${mode === 'focus' ? 'Focus' : 'Break'} | ISFVD`;

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  // Clean up title on unmount
  useEffect(() => {
    return () => { document.title = 'ISFVD Toolkit'; };
  }, []);

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Progress Ring Calc
  const totalSeconds = mode === 'focus' ? 25 * 60 : 5 * 60;
  const percentage = (timeLeft / totalSeconds) * 100;
  
  const ringColor = mode === 'focus' ? '#ef4444' : '#10b981';

  return (
    <div className="page-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '3rem'}}>
        <h1><Clock style={{display: 'inline', marginRight: '10px'}} /> Pomodoro Timer</h1>
        <p className="subtitle">Stay focused with time-boxed working sessions.</p>
      </header>

      <div style={{display: 'flex', gap: '1rem', marginBottom: '3rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '99px'}}>
        <button 
          onClick={() => switchMode('focus')}
          style={{padding: '0.6rem 2rem', borderRadius: '99px', border: 'none', background: mode === 'focus' ? '#ef4444' : 'transparent', color: mode === 'focus' ? 'white' : '#94a3b8', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s'}}
        >
          Focus (25m)
        </button>
        <button 
          onClick={() => switchMode('break')}
          style={{padding: '0.6rem 2rem', borderRadius: '99px', border: 'none', background: mode === 'break' ? '#10b981' : 'transparent', color: mode === 'break' ? 'white' : '#94a3b8', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s'}}
        >
          Break (5m)
        </button>
      </div>

      <div style={{position: 'relative', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {/* SVG Ring */}
        <svg style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)'}}>
          <circle cx="150" cy="150" r="140" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
          <circle cx="150" cy="150" r="140" stroke={ringColor} strokeWidth="12" fill="none" strokeDasharray="879.64" strokeDashoffset={879.64 - (percentage / 100) * 879.64} style={{transition: 'stroke-dashoffset 1s linear'}} strokeLinecap="round" />
        </svg>

        <h2 style={{fontFamily: 'monospace', fontSize: '5rem', fontWeight: 'bold', margin: 0, color: 'white', zIndex: 1}}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </h2>
      </div>

      <div style={{display: 'flex', gap: '1.5rem', marginTop: '4rem'}}>
        <button 
          className="btn" 
          onClick={() => setIsRunning(!isRunning)} 
          style={{background: 'white', color: '#0f172a', padding: '1rem', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          {isRunning ? <Pause size={32} /> : <Play size={32} style={{marginLeft: '4px'}} />}
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => { setIsRunning(false); setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60); }} 
          style={{padding: '1rem', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          <RotateCcw size={28} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
