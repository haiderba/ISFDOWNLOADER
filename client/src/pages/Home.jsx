import { Link } from 'react-router-dom';
import { 
  Download, Music, Image as ImageIcon, FileText, Film, QrCode,
  Palette, PaintBucket, Key, Code, FileEdit, Type, Globe,
  Clock, Headphones, Video, Dices, Receipt, Calculator,
  Database, Layers, Smartphone, Smile, Home as HomeIcon, Calendar, Activity, Keyboard,
  Briefcase, TrendingUp, Tag, Shield, PenTool, AlignLeft, Files, Eye
} from 'lucide-react';

const Home = () => {
  const categories = [
    {
      title: "Content Downloaders & Files",
      tools: [
        { title: 'Video Downloader', desc: 'Download MP4s', path: '/video', icon: Download, color: '#3b82f6' },
        { title: 'Audio Extractor', desc: 'Extract MP3s', path: '/audio', icon: Music, color: '#8b5cf6' },
        { title: 'Thumbnails', desc: 'Get YouTube covers', path: '/thumbnail', icon: ImageIcon, color: '#f59e0b' },
        { title: 'Subtitles', desc: 'Download SRT files', path: '/subtitles', icon: FileText, color: '#10b981' },
      ]
    },
    {
      title: "Design & Creator",
      tools: [
        { title: 'Color Extractor', desc: 'Get palette from images', path: '/color', icon: Palette, color: '#ec4899' },
        { title: 'CSS Gradient', desc: 'Build nice gradients', path: '/gradient', icon: PaintBucket, color: '#06b6d4' },
        { title: 'Box Shadow', desc: 'CSS Shadows', path: '/shadow', icon: Layers, color: '#f59e0b' },
        { title: 'Device Mockup', desc: 'Wrap in bezels', path: '/mockup', icon: Smartphone, color: '#8b5cf6' },
        { title: 'Image Optimizer', desc: 'WebP Resizer', path: '/optimizer', icon: ImageIcon, color: '#10b981' },
        { title: 'Color Contrast', desc: 'WCAG checker', path: '/contrast', icon: Eye, color: '#f43f5e' },
        { title: 'Meme Generator', desc: 'Classic impact font', path: '/meme', icon: Smile, color: '#14b8a6' },
        { title: 'Video to GIF', desc: 'Convert video to GIF', path: '/gif', icon: Film, color: '#f43f5e' },
      ]
    },
    {
      title: "Developer Utilities",
      tools: [
        { title: 'Privacy Leak', desc: 'Browser trace check', path: '/privacy', icon: Shield, color: '#ef4444' },
        { title: 'Dummy Data', desc: 'Fake user generation', path: '/dummy', icon: Database, color: '#f43f5e' },
        { title: 'JSON Formatter', desc: 'Beautify JSON code', path: '/json', icon: Code, color: '#14b8a6' },
        { title: 'Markdown Editor', desc: 'Write & export MD', path: '/markdown', icon: FileEdit, color: '#6366f1' },
        { title: 'Text Analyzer', desc: 'Word & Read Stats', path: '/text', icon: AlignLeft, color: '#8b5cf6' },
        { title: 'Case Converter', desc: 'Change text casing', path: '/case', icon: Type, color: '#3b82f6' },
        { title: 'IP Tracker', desc: 'Find geolocation data', path: '/ip', icon: Globe, color: '#06b6d4' },
        { title: 'QR Code Builder', desc: 'Generate custom QRs', path: '/qr', icon: QrCode, color: '#10b981' },
        { title: 'Password Gen', desc: 'Create secure keys', path: '/password', icon: Key, color: '#f59e0b' },
      ]
    },
    {
      title: "Focus & Productivity",
      tools: [
        { title: 'Scratchpad', path: '/scratchpad', desc: 'Auto-save notepad', icon: PenTool, color: '#10b981' },
        { title: 'Pomodoro', desc: 'Focus timer', path: '/pomodoro', icon: Clock, color: '#f59e0b' },
        { title: 'Ambient Noise', desc: 'Focus background noise', path: '/noise', icon: Headphones, color: '#8b5cf6' },
        { title: 'Screen Recorder', desc: 'Record browser tabs', path: '/recorder', icon: Video, color: '#ec4899' },
        { title: 'Meeting Planner', desc: 'Timezone overlap', path: '/timezone', icon: Globe, color: '#3b82f6' },
        { title: 'Typing Test', desc: 'WPM speed game', path: '/typing', icon: Keyboard, color: '#14b8a6' },
      ]
    },
    {
      title: "Finance & Everyday",
      tools: [
        { title: 'Compound Interest', desc: 'Investment gains', path: '/interest', icon: TrendingUp, color: '#10b981' },
        { title: 'Salary Converter', desc: 'Annual to Hourly', path: '/salary', icon: Briefcase, color: '#8b5cf6' },
        { title: 'Discount Calc', desc: 'Sales tax deduction', path: '/discount', icon: Tag, color: '#ec4899' },
        { title: 'Mortgage Calc', desc: 'Home loan insights', path: '/mortgage', icon: HomeIcon, color: '#3b82f6' },
        { title: 'Age Calculator', desc: 'Date difference', path: '/age', icon: Calendar, color: '#f43f5e' },
        { title: 'Health & BMR', desc: 'Fitness metrics', path: '/health', icon: Activity, color: '#ef4444' },
        { title: 'Decision Wheel', desc: 'Spin to decide', path: '/wheel', icon: Dices, color: '#14b8a6' },
        { title: 'Expense Splitter', desc: 'Split the bill', path: '/expense', icon: Receipt, color: '#f59e0b' },
        { title: 'Unit Converter', desc: 'Convert anything', path: '/converter', icon: Calculator, color: '#06b6d4' },
      ]
    }
  ];

  return (
    <div className="page-container home-dashboard" style={{maxWidth: '1000px'}}>
      <header className="page-header" style={{marginBottom: '2rem'}}>
        <h1>ISFVD Super Toolkit</h1>
        <p className="subtitle">Choose a tool to begin.</p>
      </header>

      {categories.map((cat, idx) => (
        <div key={idx} style={{marginBottom: '3rem'}}>
          <h2 style={{fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}>{cat.title}</h2>
          <div className="tools-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))'}}>
            {cat.tools.map((tool) => (
              <Link to={tool.path} key={tool.path} className="tool-card" style={{padding: '1.2rem'}}>
                <div className="tool-icon-wrapper" style={{ color: tool.color, width: '40px', height: '40px' }}>
                  <tool.icon size={24} />
                </div>
                <div>
                  <h3 style={{fontSize: '1.05rem', marginBottom: '0.3rem'}}>{tool.title}</h3>
                  <p style={{fontSize: '0.85rem', color: '#94a3b8'}}>{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
