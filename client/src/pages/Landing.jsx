import { Link } from 'react-router-dom';
import { 
  Download, LayoutTemplate, Shield, Zap, Layout, FileEdit, 
  Smartphone, Palette, Globe, Play, MousePointer2, Calculator,
  ArrowRight, CheckCircle, Search, Star
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="landing-page" style={{ 
      background: '#020617', 
      color: '#f8fafc', 
      minHeight: '100vh',
      width: '100%', 
      fontFamily: "'Inter', sans-serif",
      overflowX: 'hidden'
    }}>
      {/* Dynamic Background Elements */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

      {/* Navbar */}
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        background: 'rgba(2, 6, 23, 0.7)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <nav style={{ 
          maxWidth: '1600px', 
          margin: '0 auto', 
          padding: '1.5rem 4rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '8px', borderRadius: '12px' }}>
              <Layout size={24} color="white" />
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px' }}>OneToolDeck</span>
          </div>
          <div className="hide-on-mobile" style={{ display: 'flex', gap: '2.5rem', fontSize: '0.95rem', fontWeight: '500', color: '#94a3b8' }}>
            <a href="#features" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>Features</a>
            <a href="#tools" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>Tools</a>
            <a href="#privacy" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>Privacy</a>
          </div>
          <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', borderRadius: '10px', fontSize: '0.9rem' }}>
            Launch Toolkit
          </Link>
        </nav>
      </header>

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <section style={{ 
          padding: '10rem 4rem 6rem', 
          textAlign: 'center', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(59, 130, 246, 0.1)', 
            color: '#3b82f6', 
            padding: '0.5rem 1rem', 
            borderRadius: '99px', 
            fontSize: '0.85rem', 
            fontWeight: '600',
            marginBottom: '2rem'
          }}>
            <Zap size={14} fill="currentColor" /> v2.0 is now live with 40+ native tools
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
            fontWeight: '900', 
            lineHeight: '1', 
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Your Digital Workflow, <br />
            <span style={{ 
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>Simplified In One Deck.</span>
          </h1>

          <p style={{ 
            fontSize: '1.3rem', 
            color: '#94a3b8', 
            lineHeight: '1.6', 
            maxWidth: '750px', 
            margin: '0 auto 3rem' 
          }}>
            The ultimate utility toolkit for developers, designers, and creators. All the tools you need, running entirely in your browser. Fast. Private. Powerful.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/dashboard" className="btn" style={{ 
              padding: '1.2rem 2.5rem', 
              fontSize: '1.1rem', 
              borderRadius: '14px',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.5)'
            }}>
              Start Building Now <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </Link>
            <a href="#features" className="btn btn-secondary" style={{ 
              padding: '1.2rem 2.5rem', 
              fontSize: '1.1rem', 
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              Explore 40+ Tools
            </a>
          </div>

          {/* Trusted Badges / Stats */}
          <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '3rem', color: '#64748b', fontSize: '0.9rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} /> 100% Native Browser Apps</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} /> Zero Data Storage</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} /> No Account Required</div>
          </div>
        </section>

        {/* Tools Snapshot / Bento Grid */}
        <section id="features" style={{ padding: '6rem 4rem', maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
            
            {/* Feature 1: Main */}
            <div className="result-card" style={{ gridColumn: 'span 8', padding: '3rem', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', height: '140%', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)', borderRadius: '40%', transform: 'rotate(-20deg)' }}></div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <Zap size={32} />
                </div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Power at your fingertips.</h2>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '500px' }}>
                  From video downloading and image optimization to code minification and scientific math. Every tool is optimized for performance.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>Fast Rendering</div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>Offline Capable</div>
                </div>
              </div>
            </div>

            {/* Feature 2: Side */}
            <div className="result-card" style={{ gridColumn: 'span 4', padding: '3rem', background: 'linear-gradient(to bottom, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.4))', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Shield size={24} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Privacy as Priority</h3>
                <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.5' }}>
                  Your data never leaves your machine. We process everything locally in the browser.
                </p>
              </div>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'rgba(255,255,255,0.03)', textAlign: 'right' }}>SECURE</div>
            </div>

            {/* Feature 3: Small 1 */}
            <div className="result-card" style={{ gridColumn: 'span 4', padding: '2.5rem', transition: 'transform 0.3s ease' }}>
              <div style={{ color: '#10b981', marginBottom: '1.5rem' }}><Download size={32} /></div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>Media Extraction</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>High-quality video and audio downloads from 10+ major platforms.</p>
            </div>

            {/* Feature 4: Small 2 */}
            <div className="result-card" style={{ gridColumn: 'span 4', padding: '2.5rem' }}>
              <div style={{ color: '#f59e0b', marginBottom: '1.5rem' }}><Palette size={32} /></div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>Design Toolkit</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Mockups, gradients, and shadows built for modern developers.</p>
            </div>

            {/* Feature 5: Small 3 */}
            <div className="result-card" style={{ gridColumn: 'span 4', padding: '2.5rem' }}>
              <div style={{ color: '#3b82f6', marginBottom: '1.5rem' }}><Calculator size={32} /></div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>Smart Analytics</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Text analysis, diff checkers, and complex math utilities.</p>
            </div>

          </div>
        </section>

        {/* Global CTA */}
        <section id="tools" style={{ padding: '8rem 2rem', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05), transparent)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>Stop switching tabs. <br />Start building faster.</h2>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '3rem' }}>
              Join thousands of developers using OneToolDeck as their daily driver.
            </p>
            <Link to="/dashboard" className="btn" style={{ 
              padding: '1.2rem 3rem', 
              fontSize: '1.1rem', 
              borderRadius: '14px',
              background: '#fff',
              color: '#020617'
            }}>
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ 
        padding: '6rem 4rem 4rem', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '6px', borderRadius: '8px' }}>
                <Layout size={20} color="white" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>OneToolDeck</span>
            </div>
            <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>
              The ultimate all-in-one utility deck for the modern digital era. Built with speed and privacy in mind.
            </p>
          </div>
          <div>
            <h5 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Tools</h5>
            <ul style={{ listStyle: 'none', color: '#64748b', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>Media Tools</li>
              <li>Developer Utilities</li>
              <li>Design & Creative</li>
              <li>Focus & Finance</li>
            </ul>
          </div>
          <div>
            <h5 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Company</h5>
            <ul style={{ listStyle: 'none', color: '#64748b', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div>
            <h5 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Stay Connected</h5>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="tool-icon-wrapper" style={{ width: '40px', height: '40px' }}><Star size={20} /></div>
              <div className="tool-icon-wrapper" style={{ width: '40px', height: '40px' }}><Globe size={20} /></div>
              <div className="tool-icon-wrapper" style={{ width: '40px', height: '40px' }}><Shield size={20} /></div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: '#334155', fontSize: '0.85rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
          © 2026 OneToolDeck. Handcrafted for a better web.
        </div>
      </footer>

      {/* Global CSS for the Landing Page specific needs */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .landing-page .btn {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .landing-page .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -10px rgba(59, 130, 246, 0.5);
        }

        .landing-page .result-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          transition: all 0.4s ease;
        }

        .landing-page .result-card:hover {
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(15, 23, 42, 0.8);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 1024px) {
          .landing-page [style*="grid-column: span 8"],
          .landing-page [style*="grid-column: span 4"] {
            grid-column: span 12 !important;
          }
        }

        @media (max-width: 768px) {
          .landing-page .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
