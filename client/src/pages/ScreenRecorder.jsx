import { useState, useRef, useEffect } from 'react';
import { Video, StopCircle, Download as DownloadIcon } from 'lucide-react';

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [fileExt, setFileExt] = useState('webm');
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const videoRef = useRef(null);

  // Auto-play the video preview when videoUrl is set
  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  const getSupportedMimeType = () => {
    const types = [
      'video/mp4',
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm'
    ];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return '';
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' },
        audio: true
      });

      const mimeType = getSupportedMimeType();
      const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
      setFileExt(ext);

      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedMimeType = mediaRecorder.mimeType || mimeType || 'video/webm';
        const blob = new Blob(chunksRef.current, { type: recordedMimeType });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        
        // Stop all tracks to clean up browser permissions
        stream.getTracks().forEach(track => track.stop());
      };

      // Pass a timeslice to ensure data available events fire regularly (fixes some browser playback issues)
      mediaRecorder.start(1000);
      setRecording(true);
      setVideoUrl(null);

      // Handle user stopping stream from native browser UI
      stream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };

    } catch (err) {
      console.error('Error starting screen record:', err);
      if (err.name !== 'NotAllowedError') {
         alert('Failed to start recording. Please ensure screen recording permissions are granted.');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  return (
    <div className="page-container" style={{maxWidth: '800px', margin: '0 auto'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '3rem'}}>
        <h1><Video style={{display: 'inline', marginRight: '10px'}} /> Screen Recorder</h1>
        <p className="subtitle">Record your desktop or specific browser tabs natively without any software.</p>
      </header>

      <div className="result-card" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem', border: recording ? '2px solid #ef4444' : '1px solid var(--card-border)'}}>
        
        {!recording && !videoUrl && (
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <div style={{background: 'rgba(59, 130, 246, 0.2)', padding: '2rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1rem'}}>
              <Video size={64} color="#3b82f6" />
            </div>
            <h3 style={{color: '#f8fafc', marginBottom: '0.5rem'}}>Ready to Record</h3>
            <p style={{color: '#94a3b8'}}>Click below to select what you want to share.</p>
          </div>
        )}

        {recording && (
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <div style={{background: 'rgba(239, 68, 68, 0.2)', padding: '2rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1rem', animation: 'pulse 2s infinite'}}>
              <StopCircle size={64} color="#ef4444" />
            </div>
            <h3 style={{color: '#ef4444', marginBottom: '0.5rem'}}>Recording in progress...</h3>
            <p style={{color: '#94a3b8'}}>Your screen is currently being captured safely in your browser.</p>
          </div>
        )}

        {!recording ? (
          <button className="btn" onClick={startRecording} style={{padding: '1rem 3rem', fontSize: '1.2rem'}}>Start Recording</button>
        ) : (
          <button className="btn" onClick={stopRecording} style={{padding: '1rem 3rem', fontSize: '1.2rem', background: '#ef4444', borderColor: '#ef4444'}}>Stop Recording</button>
        )}

        {videoUrl && !recording && (
          <div style={{marginTop: '3rem', width: '100%'}}>
            <h3 style={{marginBottom: '1rem', color: '#cbd5e1', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}>Your Recording</h3>
            <video 
              ref={videoRef}
              src={videoUrl} 
              controls 
              style={{width: '100%', borderRadius: '12px', background: 'black', marginBottom: '1rem'}} 
            />
            <button className="btn" onClick={() => {
              const a = document.createElement('a');
              a.href = videoUrl;
              a.download = `recording-${new Date().getTime()}.${fileExt}`;
              a.click();
            }} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'}}>
              <DownloadIcon size={20} /> Download Source Video
            </button>
            {fileExt === 'webm' && (
              <p style={{textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', marginTop: '1rem'}}>
                Note: Your browser natively records in WebM. To get an MP4, you can rename the file or use a converter after downloading.
              </p>
            )}
          </div>
        )}

      </div>
      
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </div>
  );
};

export default ScreenRecorder;
