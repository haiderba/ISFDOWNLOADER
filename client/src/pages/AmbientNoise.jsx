import { useState, useRef, useEffect } from 'react';
import { Headphones, CloudRain, Coffee, Flame } from 'lucide-react';

const AmbientNoise = () => {
  const sounds = [
    { id: 'rain', name: 'Rainfall', icon: CloudRain, url: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6ccf3232f.mp3?filename=heavy-rain-nature-sounds-8186.mp3' },
    { id: 'cafe', name: 'Coffee Shop', icon: Coffee, url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_82ebde1e60.mp3?filename=cafe-background-noise-4334.mp3' },
    { id: 'fire', name: 'Fireplace', icon: Flame, url: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_4070a25695.mp3?filename=crackling-fireplace-nature-sounds-8012.mp3' }
  ];

  const [volumes, setVolumes] = useState({'rain': 0, 'cafe': 0, 'fire': 0});
  const audioRefs = useRef({});

  useEffect(() => {
    // initialize audio elements
    sounds.forEach(sound => {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audio.volume = 0;
      audioRefs.current[sound.id] = audio;
      // We don't play immediately due to browser auto-play policies,
      // it plays once volume > 0 and user interacts.
    });

    return () => {
      // cleanup
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const handleVolumeChange = (id, newVolume) => {
    const vol = parseFloat(newVolume);
    setVolumes(prev => ({...prev, [id]: vol}));
    
    const audio = audioRefs.current[id];
    if (audio) {
      audio.volume = vol;
      if (vol > 0 && audio.paused) {
        audio.play().catch(e => console.log('Autoplay blocked until user interaction', e));
      } else if (vol === 0) {
        audio.pause();
      }
    }
  };

  const stopAll = () => {
    setVolumes({'rain': 0, 'cafe': 0, 'fire': 0});
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = 0;
      audio.pause();
    });
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1><Headphones style={{display: 'inline', marginRight: '10px'}} /> Ambient Noise</h1>
        <p className="subtitle">Mix background sounds to create your perfect focus environment.</p>
      </header>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
        {sounds.map((sound) => (
          <div key={sound.id} className="result-card" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem', border: volumes[sound.id] > 0 ? '1px solid var(--gradient-1)' : '1px solid var(--card-border)'}}>
            <div style={{background: volumes[sound.id] > 0 ? 'var(--gradient-1)' : 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', transition: 'all 0.3s'}}>
              <sound.icon size={40} color="white" />
            </div>
            <h3 style={{marginBottom: '1.5rem'}}>{sound.name}</h3>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              value={volumes[sound.id]} 
              onChange={(e) => handleVolumeChange(sound.id, e.target.value)}
              style={{width: '100%', accentColor: 'var(--gradient-1)'}}
            />
          </div>
        ))}
      </div>

      {Object.values(volumes).some(v => v > 0) && (
        <div style={{marginTop: '3rem', textAlign: 'center'}}>
          <button className="btn btn-secondary" onClick={stopAll}>Stop All Sounds</button>
        </div>
      )}
    </div>
  );
};

export default AmbientNoise;
