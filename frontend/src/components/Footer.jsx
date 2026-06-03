import React from 'react';
import { Mail, Globe, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass" id="tentang">
      <div className="footer-content">
        <h2>GeoProfit UMKM</h2>
        <p>Platform AI untuk membantu UMKM menemukan lokasi bisnis terbaik dengan prediksi profit presisi tinggi.</p>
        <div className="socials">
          <a href="#" aria-label="Website"><Globe size={24} /></a>
          <a href="#" aria-label="Email"><Mail size={24} /></a>
          <a href="#" aria-label="Phone"><Phone size={24} /></a>
          <a href="#" aria-label="Location"><MapPin size={24} /></a>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} GeoProfit UMKM. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
