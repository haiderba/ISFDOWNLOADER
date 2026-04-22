import { 
  Download, Music, Image as ImageIcon, FileText, Film, QrCode,
  Palette, PaintBucket, Key, Code, FileEdit, Type, Globe, Layout,
  Database, Layers, Smartphone, Smile, Calendar, Activity, Keyboard, LayoutDashboard, GitCompare, HardDrive, LayoutTemplate, Minimize,
  Clock, Headphones, Video, Dices, Receipt, Calculator, Search,
  Briefcase, TrendingUp, Tag, Shield, PenTool, AlignLeft, Files, Eye, Star
} from 'lucide-react';

export const ALL_TOOLS = [
  // Content & Files
  { title: 'Video Downloader', desc: 'Download MP4s', path: '/video', icon: Download, color: '#3b82f6', category: 'Media' },
  { title: 'Audio Extractor', desc: 'Extract MP3s', path: '/audio', icon: Music, color: '#8b5cf6', category: 'Media' },
  { title: 'Thumbnails', desc: 'Get YouTube covers', path: '/thumbnail', icon: ImageIcon, color: '#f59e0b', category: 'Media' },
  { title: 'Subtitles', desc: 'Download SRT files', path: '/subtitles', icon: FileText, color: '#10b981', category: 'Media' },
  { title: 'Video to GIF', desc: 'Create animations', path: '/gif', icon: Film, color: '#06b6d4', category: 'Media' },
  { title: 'The Lab (PDF)', desc: 'Merge & Split PDFs', path: '/pdflab', icon: FileText, color: '#ef4444', category: 'Media' },
  
  // Design
  { title: 'Pro Image Editor', desc: 'Canvas-based editing', path: '/image-editor', icon: ImageIcon, color: '#f59e0b', category: 'Design' },
  { title: 'Color Extractor', desc: 'Pull palettes from images', path: '/color', icon: Palette, color: '#ec4899', category: 'Design' },
  { title: 'CSS Gradients', desc: 'Generate web gradients', path: '/gradient', icon: PaintBucket, color: '#8b5cf6', category: 'Design' },
  { title: 'Box Shadows', desc: 'Design CSS shadows', path: '/shadow', icon: Layers, color: '#3b82f6', category: 'Design' },
  { title: 'Flexbox Builder', desc: 'Visual CSS layout', path: '/flexbox', icon: Layout, color: '#10b981', category: 'Design' },
  { title: 'Favicon Maker', desc: 'Generate multi-size icons', path: '/favicon', icon: ImageIcon, color: '#f59e0b', category: 'Design' },
  { title: 'Device Mockups', desc: 'Frame images in phones', path: '/mockup', icon: Smartphone, color: '#10b981', category: 'Design' },
  { title: 'Contrast Check', desc: 'WCAG accessibility', path: '/contrast', icon: Eye, color: '#f43f5e', category: 'Design' },
  { title: 'Image Optimizer', desc: 'Convert & compress formats', path: '/optimizer', icon: ImageIcon, color: '#ec4899', category: 'Design' },

  // Developer
  { title: 'Meta Tag Gen', desc: 'HTML SEO & OpenGraph', path: '/meta', icon: LayoutTemplate, color: '#3b82f6', category: 'Dev' },
  { title: 'Code Minifier', desc: 'Compress CSS/JSON', path: '/minify', icon: Minimize, color: '#ec4899', category: 'Dev' },
  { title: 'Privacy Leak', desc: 'Browser trace check', path: '/privacy', icon: Shield, color: '#ef4444', category: 'Dev' },
  { title: 'Dummy Data', desc: 'Fake user generation', path: '/dummy', icon: Database, color: '#f43f5e', category: 'Dev' },
  { title: 'JSON Formatter', desc: 'Beautify JSON code', path: '/json', icon: Code, color: '#14b8a6', category: 'Dev' },
  { title: 'Markdown Editor', desc: 'Write & export MD', path: '/markdown', icon: FileEdit, color: '#6366f1', category: 'Dev' },
  { title: 'Base64 Encoder', desc: 'Convert files to text', path: '/base64', icon: HardDrive, color: '#f59e0b', category: 'Dev' },
  { title: 'UUID Generator', desc: 'Bulk secure IDs', path: '/uuid', icon: Database, color: '#8b5cf6', category: 'Dev' },
  { title: 'Text Diff', desc: 'Compare strings', path: '/diff', icon: GitCompare, color: '#3b82f6', category: 'Dev' },
  { title: 'Text Analyzer', desc: 'Word & Read Stats', path: '/text', icon: AlignLeft, color: '#8b5cf6', category: 'Dev' },
  { title: 'Case Converter', desc: 'Change text casing', path: '/case', icon: Type, color: '#3b82f6', category: 'Dev' },
  { title: 'IP Tracker', desc: 'Find geolocation data', path: '/ip', icon: Globe, color: '#06b6d4', category: 'Dev' },
  { title: 'QR Code Builder', desc: 'Generate custom QRs', path: '/qr', icon: QrCode, color: '#10b981', category: 'Dev' },
  { title: 'Password Gen', desc: 'Create secure keys', path: '/password', icon: Key, color: '#f59e0b', category: 'Dev' },

  // Productivity
  { title: 'Kanban Board', path: '/kanban', desc: 'Task drag & drop', icon: LayoutDashboard, color: '#3b82f6', category: 'Productivity' },
  { title: 'Scratchpad', path: '/scratchpad', desc: 'Auto-save notepad', icon: PenTool, color: '#10b981', category: 'Productivity' },
  { title: 'Pomodoro', desc: 'Focus timer', path: '/pomodoro', icon: Clock, color: '#f59e0b', category: 'Productivity' },
  { title: 'Ambient Noise', desc: 'Focus background noise', path: '/noise', icon: Headphones, color: '#8b5cf6', category: 'Productivity' },
  { title: 'Screen Recorder', desc: 'Record browser tabs', path: '/recorder', icon: Video, color: '#ec4899', category: 'Productivity' },
  { title: 'Meeting Planner', desc: 'Timezone overlap', path: '/timezone', icon: Globe, color: '#3b82f6', category: 'Productivity' },
  { title: 'Typing Test', desc: 'WPM speed game', path: '/typing', icon: Keyboard, color: '#14b8a6', category: 'Productivity' },

  // Finance & Everyday
  { title: 'Macro Diet Calc', desc: 'Nutrition goals target', path: '/macro', icon: Activity, color: '#f59e0b', category: 'Utility' },
  { title: 'Fraction Calc', desc: 'Frac to Decimal math', path: '/fraction', icon: Calculator, color: '#06b6d4', category: 'Utility' },
  { title: 'Scientific Calc', desc: 'Math workspace', path: '/scientific', icon: Calculator, color: '#f43f5e', category: 'Utility' },
  { title: 'Compound Interest', desc: 'Investment gains', path: '/interest', icon: TrendingUp, color: '#10b981', category: 'Utility' },
  { title: 'Salary Converter', desc: 'Annual to Hourly', path: '/salary', icon: Briefcase, color: '#8b5cf6', category: 'Utility' },
  { title: 'Discount Calc', desc: 'Sales tax deduction', path: '/discount', icon: Tag, color: '#ec4899', category: 'Utility' },
  { title: 'Mortgage Calc', desc: 'Home loan insights', path: '/mortgage', icon: Calculator, color: '#3b82f6', category: 'Utility' },
  { title: 'Age Calculator', desc: 'Date difference', path: '/age', icon: Calendar, color: '#f43f5e', category: 'Utility' },
  { title: 'Health & BMR', desc: 'Fitness metrics', path: '/health', icon: Activity, color: '#ef4444', category: 'Utility' },
  { title: 'Decision Wheel', desc: 'Spin to decide', path: '/wheel', icon: Dices, color: '#14b8a6', category: 'Utility' },
  { title: 'Expense Splitter', desc: 'Split the bill', path: '/expense', icon: Receipt, color: '#f59e0b', category: 'Utility' },
  { title: 'Unit Converter', desc: 'Convert anything', path: '/converter', icon: Calculator, color: '#06b6d4', category: 'Utility' },
];
