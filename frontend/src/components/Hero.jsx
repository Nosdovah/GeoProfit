import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import './Hero.css';
import './Hero.css';

const Hero = ({ onDemoClick }) => {
  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <h1 className="hero-title">
          Temukan Lokasi UMKM
          <span className="text-gradient"> Paling Menguntungkan</span>
        </h1>
        <p className="hero-subtitle">
          Analisis berbasis AI, GIS, dan prediksi profit untuk membantu UMKM mendapatkan lokasi terbaik.
        </p>
        <div className="btn-group">
          <a href="#analisis" className="btn btn-primary">
            Mulai Analisis <ArrowRight size={18} />
          </a>
          <button className="btn btn-secondary" onClick={onDemoClick}>
            Lihat Demo Cepat <Play size={18} />
          </button>
        </div>
      </div>
      <div className="hero-image animate-float">
        <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" alt="GeoProfit Target" />
      </div>
    </section>
  );
};

export default Hero;
