import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Skystructure Style Top Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(7, 17, 38, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0 40px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            boxShadow: '0 4px 12px rgba(30, 136, 229, 0.3)'
          }}>
            G
          </div>
          <span style={{ 
            fontFamily: "var(--font-sans)", 
            color: 'white', 
            fontSize: '1.3rem', 
            fontWeight: '700', 
            letterSpacing: '0.5px' 
          }}>
            GEOPROFIT<span style={{ color: '#1e88e5' }}>.UMKM</span>
          </span>
        </Link>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <NavItem to="/voc" label="Kano & VOC" active={location.pathname === '/voc'} />
          <NavItem to="/location" label="GIS & OpEx" active={location.pathname === '/location'} />
          <NavItem to="/hoq" label="HoQ Matrix" active={location.pathname === '/hoq'} />
          <NavItem to="/optimizer" label="Optimizer" active={location.pathname === '/optimizer'} />
          <NavItem to="/dashboard" label="Dashboard" active={location.pathname === '/dashboard'} />
        </nav>

        {/* CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/voc" style={{
            background: '#1e88e5',
            color: 'white',
            padding: '10px 22px',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: '600',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(30, 136, 229, 0.4)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 136, 229, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(30, 136, 229, 0.4)';
          }}
          >
            Mulai Analisis
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, label, active }) => (
  <Link 
    to={to} 
    style={{
      fontSize: '0.95rem',
      fontWeight: '500',
      textDecoration: 'none',
      color: active ? 'white' : '#94a3b8',
      position: 'relative',
      padding: '8px 0',
      transition: 'color 0.2s ease'
    }}
    onMouseOver={(e) => { if (!active) e.currentTarget.style.color = 'white'; }}
    onMouseOut={(e) => { if (!active) e.currentTarget.style.color = '#94a3b8'; }}
  >
    {label}
    {active && (
      <span style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: '#1e88e5',
        borderRadius: '2px'
      }} />
    )}
  </Link>
);

export default Layout;
