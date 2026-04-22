import { NavLink, Link } from 'react-router-dom';
import { 
  Download, Music, Image as ImageIcon, FileText, Film, QrCode, Home,
  Palette, PaintBucket, Layers, Smartphone, Smile, Eye, Layout,
  Key, Code, FileEdit, Type, Globe, Database, Shield, PenTool, AlignLeft, Files,
  Clock, Headphones, Video, Keyboard, LayoutDashboard, GitCompare, HardDrive, LayoutTemplate, Minimize,
  Dices, Receipt, Calculator, Calendar, Activity, Tag, Briefcase, TrendingUp
} from 'lucide-react';

const Navigation = ({ mobileOpen, closeMobile }) => {
  const categories = [
    {
      name: "Main",
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
      ]
    },
    {
      name: "Downloaders & Files",
      items: [
        { name: 'Video Downloader', path: '/video', icon: Download },
        { name: 'Audio Extractor', path: '/audio', icon: Music },
        { name: 'Thumbnail Grabber', path: '/thumbnail', icon: ImageIcon },
        { name: 'Subtitle Grabber', path: '/subtitles', icon: FileText },
      ]
    },
    {
      name: "Design & Creative",
      items: [
        { name: 'Color Extractor', path: '/color', icon: Palette },
        { name: 'CSS Gradient', path: '/gradient', icon: PaintBucket },
        { name: 'Box Shadow', path: '/shadow', icon: Layers },
        { name: 'Flexbox Builder', path: '/flexbox', icon: Layout },
        { name: 'Favicon Generator', path: '/favicon', icon: ImageIcon },
        { name: 'Device Mockup', path: '/mockup', icon: Smartphone },
        { name: 'Color Contrast', path: '/contrast', icon: Eye },
        { name: 'Image Optimizer', path: '/optimizer', icon: ImageIcon },
        { name: 'Video to GIF', path: '/gif', icon: Film },
        { name: 'Meme Generator', path: '/meme', icon: Smile },
      ]
    },
    {
      name: "Developer Utilities",
      items: [
        { name: 'Meta Tag Gen', path: '/meta', icon: LayoutTemplate },
        { name: 'Code Minifier', path: '/minify', icon: Minimize },
        { name: 'Dummy Data Gen', path: '/dummy', icon: Database },
        { name: 'JSON Formatter', path: '/json', icon: Code },
        { name: 'Markdown Editor', path: '/markdown', icon: FileEdit },
        { name: 'Base64 Encoder', path: '/base64', icon: HardDrive },
        { name: 'UUID Generator', path: '/uuid', icon: Database },
        { name: 'Text Diff Checker', path: '/diff', icon: GitCompare },
        { name: 'Case Converter', path: '/case', icon: Type },
        { name: 'Text Analyzer', path: '/text', icon: AlignLeft },
        { name: 'IP Tracker', path: '/ip', icon: Globe },
        { name: 'QR Generator', path: '/qr', icon: QrCode },
        { name: 'Password Gen', path: '/password', icon: Key },
        { name: 'Privacy Leak', path: '/privacy', icon: Shield },
      ]
    },
    {
      name: "Focus & Productivity",
      items: [
        { name: 'Kanban Board', path: '/kanban', icon: LayoutDashboard },
        { name: 'Scratchpad', path: '/scratchpad', icon: PenTool },
        { name: 'Pomodoro Timer', path: '/pomodoro', icon: Clock },
        { name: 'Ambient Noise', path: '/noise', icon: Headphones },
        { name: 'Screen Recorder', path: '/recorder', icon: Video },
        { name: 'Meeting Planner', path: '/timezone', icon: Globe },
        { name: 'Typing Test', path: '/typing', icon: Keyboard },
      ]
    },
    {
      name: "Life & Tools",
      items: [
        { name: 'Macro Diet Calc', path: '/macro', icon: Activity },
        { name: 'Fraction Calc', path: '/fraction', icon: Calculator },
        { name: 'Scientific Calc', path: '/scientific', icon: Calculator },
        { name: 'Age Calculator', path: '/age', icon: Calendar },
        { name: 'Health & BMR', path: '/health', icon: Activity },
        { name: 'Discount Calc', path: '/discount', icon: Tag },
        { name: 'Unit Converter', path: '/converter', icon: Calculator },
        { name: 'Decision Wheel', path: '/wheel', icon: Dices },
      ]
    },
    {
      name: "Finance",
      items: [
        { name: 'Compound Interest', path: '/interest', icon: TrendingUp },
        { name: 'Salary Converter', path: '/salary', icon: Briefcase },
        { name: 'Mortgage Calc', path: '/mortgage', icon: Home },
        { name: 'Expense Splitter', path: '/expense', icon: Receipt },
      ]
    }
  ];

  return (
    <>
      {mobileOpen && <div className="mobile-backdrop d-none-desktop" onClick={closeMobile}></div>}
      <nav className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header hide-on-mobile">
          <Link to="/" style={{textDecoration: 'none'}}><h2 className="logo">OneToolDeck</h2></Link>
        </div>
        <div className="nav-list-container" style={{overflowY: 'auto', flex: 1, paddingRight: '0.5rem'}}>
          {categories.map((cat, idx) => (
            <div key={idx} style={{marginBottom: '1.5rem'}}>
              <h3 style={{fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '1px', marginBottom: '0.5rem', paddingLeft: '1rem'}}>{cat.name}</h3>
              <ul className="nav-list">
                {cat.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={closeMobile}
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      style={{padding: '0.6rem 1rem'}}
                    >
                      <item.icon className="nav-icon" size={18} />
                      <span style={{fontSize: '0.95rem'}}>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
