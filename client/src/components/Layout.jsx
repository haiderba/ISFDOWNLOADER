import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="layout-container">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
