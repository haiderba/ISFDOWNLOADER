import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="layout-container">
      {/* Mobile Top Navigation Bar */}
      <div className="mobile-header d-none-desktop">
        <h2 className="logo" style={{fontSize: '1.2rem', margin: 0}}>ISFVD Toolkit</h2>
        <button className="btn-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={26} color="#f8fafc" /> : <Menu size={26} color="#f8fafc" />}
        </button>
      </div>

      <Navigation mobileOpen={mobileMenuOpen} closeMobile={() => setMobileMenuOpen(false)} />
      
      <main className="main-content" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
