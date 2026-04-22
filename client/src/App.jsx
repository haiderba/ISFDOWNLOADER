import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Landing from './pages/Landing';
import CommandDeck from './components/CommandDeck';

// Media Tools
import VideoDownloader from './pages/VideoDownloader';
import AudioExtractor from './pages/AudioExtractor';
import ThumbnailGrabber from './pages/ThumbnailGrabber';
import SubtitleDownloader from './pages/SubtitleDownloader';
import GifMaker from './pages/GifMaker';
import QrGenerator from './pages/QrGenerator';
import PdfLab from './pages/PdfLab';
import ImageEditor from './pages/ImageEditor';

// New Tools
import ColorExtractor from './pages/ColorExtractor';
import CssGradient from './pages/CssGradient';
import PasswordGen from './pages/PasswordGen';
import JsonFormatter from './pages/JsonFormatter';
import MarkdownEditor from './pages/MarkdownEditor';
import CaseConverter from './pages/CaseConverter';
import IpTracker from './pages/IpTracker';
import PomodoroTimer from './pages/PomodoroTimer';
import AmbientNoise from './pages/AmbientNoise';
import ScreenRecorder from './pages/ScreenRecorder';
import DecisionWheel from './pages/DecisionWheel';
import ExpenseSplitter from './pages/ExpenseSplitter';
import UnitConverter from './pages/UnitConverter';
import DummyDataGen from './pages/DummyDataGen';
import BoxShadowGen from './pages/BoxShadowGen';
import DeviceMockup from './pages/DeviceMockup';
import MemeGenerator from './pages/MemeGenerator';
import MortgageCalc from './pages/MortgageCalc';
import AgeDateCalc from './pages/AgeDateCalc';
import BmiBmrCalc from './pages/BmiBmrCalc';
import TimeZonePlanner from './pages/TimeZonePlanner';
import TypingTest from './pages/TypingTest';

// Phase 4 Tools
import ColorContrast from './pages/ColorContrast';
import PrivacyLeak from './pages/PrivacyLeak';
import ImageOptimizer from './pages/ImageOptimizer';
import TextAnalyzer from './pages/TextAnalyzer';
import Scratchpad from './pages/Scratchpad';
import DiscountCalc from './pages/DiscountCalc';
import SalaryConverter from './pages/SalaryConverter';
import CompoundInterest from './pages/CompoundInterest';

// Phase 5 Tools
import KanbanBoard from './pages/KanbanBoard';
import DiffChecker from './pages/DiffChecker';
import ScientificCalc from './pages/ScientificCalc';
import Base64Encoder from './pages/Base64Encoder';
import UuidGenerator from './pages/UuidGenerator';

// Phase 6 Tools
import MetaGenerator from './pages/MetaGenerator';
import CodeMinifier from './pages/CodeMinifier';
import FlexboxBuilder from './pages/FlexboxBuilder';
import FaviconGenerator from './pages/FaviconGenerator';
import MacroCalc from './pages/MacroCalc';
import FractionCalc from './pages/FractionCalc';

import './index.css';

function App() {
  return (
    <>
      <CommandDeck />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="video" element={<VideoDownloader />} />
          <Route path="audio" element={<AudioExtractor />} />
          <Route path="thumbnail" element={<ThumbnailGrabber />} />
          <Route path="subtitles" element={<SubtitleDownloader />} />
          <Route path="gif" element={<GifMaker />} />
          <Route path="pdflab" element={<PdfLab />} />
          
          {/* Design Tools */}
          <Route path="image-editor" element={<ImageEditor />} />
          <Route path="color" element={<ColorExtractor />} />
        <Route path="gradient" element={<CssGradient />} />
        <Route path="shadow" element={<BoxShadowGen />} />
        <Route path="mockup" element={<DeviceMockup />} />
        <Route path="contrast" element={<ColorContrast />} />
        <Route path="optimizer" element={<ImageOptimizer />} />
        
        {/* Utilities */}
        <Route path="password" element={<PasswordGen />} />
        <Route path="json" element={<JsonFormatter />} />
        <Route path="dummy" element={<DummyDataGen />} />
        <Route path="markdown" element={<MarkdownEditor />} />
        <Route path="case" element={<CaseConverter />} />
        <Route path="ip" element={<IpTracker />} />
        <Route path="qr" element={<QrGenerator />} />
        <Route path="privacy" element={<PrivacyLeak />} />
        <Route path="text" element={<TextAnalyzer />} />
        
        {/* Productivity & Focus */}
        <Route path="pomodoro" element={<PomodoroTimer />} />
        <Route path="noise" element={<AmbientNoise />} />
        <Route path="recorder" element={<ScreenRecorder />} />
        <Route path="timezone" element={<TimeZonePlanner />} />
        <Route path="scratchpad" element={<Scratchpad />} />
        <Route path="kanban" element={<KanbanBoard />} />
        
        {/* Games & Fun */}
        <Route path="wheel" element={<DecisionWheel />} />
        <Route path="typing" element={<TypingTest />} />
        <Route path="meme" element={<MemeGenerator />} />

        {/* Finance & Life */}
        <Route path="expense" element={<ExpenseSplitter />} />
        <Route path="converter" element={<UnitConverter />} />
        <Route path="mortgage" element={<MortgageCalc />} />
        <Route path="age" element={<AgeDateCalc />} />
        <Route path="health" element={<BmiBmrCalc />} />
        <Route path="discount" element={<DiscountCalc />} />
        <Route path="salary" element={<SalaryConverter />} />
        <Route path="interest" element={<CompoundInterest />} />
        <Route path="scientific" element={<ScientificCalc />} />

        {/* Phase 5 Developer */}
        <Route path="diff" element={<DiffChecker />} />
        <Route path="base64" element={<Base64Encoder />} />
        <Route path="uuid" element={<UuidGenerator />} />

        {/* Phase 6 Developer & Utilities */}
        <Route path="meta" element={<MetaGenerator />} />
        <Route path="minify" element={<CodeMinifier />} />
        <Route path="flexbox" element={<FlexboxBuilder />} />
        <Route path="favicon" element={<FaviconGenerator />} />
        <Route path="macro" element={<MacroCalc />} />
        <Route path="fraction" element={<FractionCalc />} />
      </Route>
      </Routes>
    </>
  );
}

export default App;
