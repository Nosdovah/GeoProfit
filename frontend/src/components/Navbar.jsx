import React from 'react';
import { MapPin } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab, hasLocationData }) => {
  const handleVocClick = (e) => {
    e.preventDefault();
    if (!hasLocationData) {
      alert("Harap isi dan submit form Analisis Lokasi AI terlebih dahulu!");
      return;
    }
    setActiveTab('voc');
  };

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
          <MapPin className="logo-icon" size={28} />
          <span>GeoProfit UMKM</span>
        </a>
        <ul className="nav-links">
          <li><a href="#home" className={activeTab === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>Home & Analisis</a></li>
          <li><a href="#voc" className={activeTab === 'voc' ? 'active' : ''} onClick={handleVocClick}>Voice of Customer</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
