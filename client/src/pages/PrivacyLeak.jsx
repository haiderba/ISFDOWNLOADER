import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const PrivacyLeak = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const gatherData = async () => {
      const payload = {};
      
      // Basic Navigator
      payload.userAgent = navigator.userAgent;
      payload.platform = navigator.platform;
      payload.language = navigator.language;
      payload.cookiesEnabled = navigator.cookieEnabled;
      payload.doNotTrack = navigator.doNotTrack === '1' ? 'Enabled' : 'Disabled (or not specified)';
      payload.cores = navigator.hardwareConcurrency || 'Unknown';
      payload.memory = navigator.deviceMemory ? `${navigator.deviceMemory} GB+` : 'Unknown';
      
      // Screen & Display
      payload.screenResolution = `${window.screen.width}x${window.screen.height}`;
      payload.colorDepth = `${window.screen.colorDepth}-bit`;
      payload.pixelRatio = window.devicePixelRatio;

      // Timezone
      payload.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Network
      if (navigator.connection) {
        payload.connectionType = navigator.connection.effectiveType || 'Unknown';
        payload.downlink = navigator.connection.downlink ? `${navigator.connection.downlink} Mbps` : 'Unknown';
      }

      // Battery (if supported)
      if (navigator.getBattery) {
        try {
          const battery = await navigator.getBattery();
          payload.batteryLevel = `${Math.round(battery.level * 100)}%`;
          payload.isCharging = battery.charging ? 'Yes' : 'No';
        } catch(e) {
           payload.batteryLevel = 'Permission Denied/Unsupported';
        }
      } else {
        payload.batteryLevel = 'Unsupported by OS/Browser';
      }

      // WebGL Renderer detection (often used for fingerprinting)
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          payload.gpuVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'Unknown';
          payload.gpuRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'Unknown';
        }
      } catch(e) {
        payload.gpuVendor = 'Blocked/Unsupported';
      }

      setData(payload);
    };

    gatherData();
  }, []);

  const LineItem = ({ label, val }) => (
    <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', gap: '1rem'}}>
      <span style={{color: '#94a3b8', minWidth: '150px'}}>{label}</span>
      <span style={{color: '#f8fafc', fontWeight: 'bold', wordBreak: 'break-word', textAlign: 'right'}}>{val || 'N/A'}</span>
    </div>
  );

  return (
    <div className="page-container" style={{maxWidth: '900px', margin: '0 auto'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Shield style={{display: 'inline', marginRight: '10px'}} /> Privacy & Data Leak Tester</h1>
        <p className="subtitle">See exactly what invisible data your browser is broadcasting to every website you visit.</p>
      </header>

      {data ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          
          <div className="result-card" style={{padding: '1.5rem'}}>
             <h3 style={{color: '#3b82f6', marginBottom: '1rem', paddingLeft: '1rem', fontSize: '1rem'}}>Hardware & Location Details</h3>
             <LineItem label="CPU Cores" val={data.cores} />
             <LineItem label="Device Memory" val={data.memory} />
             <LineItem label="Time Zone" val={data.timeZone} />
             <LineItem label="Battery Level" val={data.batteryLevel} />
             <LineItem label="Is Charging?" val={data.isCharging} />
          </div>

          <div className="result-card" style={{padding: '1.5rem'}}>
             <h3 style={{color: '#10b981', marginBottom: '1rem', paddingLeft: '1rem', fontSize: '1rem'}}>Graphics & Display</h3>
             <LineItem label="GPU Vendor" val={data.gpuVendor} />
             <LineItem label="GPU Renderer" val={data.gpuRenderer} />
             <LineItem label="Screen Res" val={data.screenResolution} />
             <LineItem label="Color Depth" val={data.colorDepth} />
             <LineItem label="Device Pixel Ratio" val={data.pixelRatio} />
          </div>

          <div className="result-card" style={{padding: '1.5rem'}}>
             <h3 style={{color: '#f59e0b', marginBottom: '1rem', paddingLeft: '1rem', fontSize: '1rem'}}>Software & Network</h3>
             <LineItem label="User Agent" val={data.userAgent} />
             <LineItem label="Platform" val={data.platform} />
             <LineItem label="Language" val={data.language} />
             <LineItem label="Cookies Allowed" val={data.cookiesEnabled ? 'Yes' : 'No'} />
             <LineItem label="Do Not Track" val={data.doNotTrack} />
             <LineItem label="Connection Speed" val={data.connectionType} />
             <LineItem label="Network Downlink" val={data.downlink} />
          </div>

        </div>
      ) : (
        <div style={{textAlign: 'center', padding: '4rem', color: '#64748b'}}>Running security scan on browser properties...</div>
      )}
    </div>
  );
};

export default PrivacyLeak;
