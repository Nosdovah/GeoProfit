import React from 'react';
import './Heatmap.css';

const Heatmap = () => {
  return (
    <section className="heatmap-section">
      <h2 className="section-title">Heatmap Area Bisnis</h2>
      <div className="heatmap-container glass">
        <div className="marker m1">
          <div className="pulse"></div>
        </div>
        <div className="marker m2">
          <div className="pulse"></div>
        </div>
        <div className="marker m3">
          <div className="pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Heatmap;
