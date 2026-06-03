import React from 'react';
import { MapPin } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <a href="#home" className="logo">
          <MapPin className="logo-icon" size={28} />
          <span>GeoProfit UMKM</span>
        </a>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#analisis">Analisis Lokasi</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#tentang">Tentang</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
