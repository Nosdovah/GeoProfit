import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, Calculator, RefreshCcw, ListChecks, Menu, Bell } from 'lucide-react';

const Layout = () => {
  return (
    <div className="layout-container" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="glass-panel" style={{ width: '280px', margin: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <img src="/Logo.png" alt="GeoProfit Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          <h2 className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: '700' }}>GeoProfit</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px', marginTop: '8px' }}>User Flow Pipeline</div>
          
          <NavItem to="/voc" icon={<ListChecks size={20} />} label="1. Kano & VOC" />
          <NavItem to="/location" icon={<MapPin size={20} />} label="2. GIS & OpEx" />
          <NavItem to="/hoq" icon={<Calculator size={20} />} label="3. HoQ Matrix" />
          <NavItem to="/optimizer" icon={<RefreshCcw size={20} />} label="4. The Roof Optimizer" />
          
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px', marginTop: '24px' }}>Analytics & Result</div>
          
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="5. BI Dashboard" />
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '16px 16px 16px 0', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header className="glass-panel" style={{ height: '70px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Menu style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
            <span style={{ fontWeight: '500', color: 'var(--text-muted)' }}>Location Intelligence DSS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Bell style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', border: '2px solid var(--primary)' }}></div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink 
    to={to} 
    style={({ isActive }) => ({
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      padding: '12px 16px', 
      borderRadius: '8px',
      textDecoration: 'none',
      color: isActive ? 'white' : 'var(--text-muted)',
      background: isActive ? 'var(--primary-glow)' : 'transparent',
      borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
      transition: 'all 0.2s ease'
    })}
  >
    {icon}
    <span style={{ fontWeight: '500' }}>{label}</span>
  </NavLink>
);

export default Layout;
