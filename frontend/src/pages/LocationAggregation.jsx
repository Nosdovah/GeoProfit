import React from 'react';

const LocationAggregation = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>2. Data Aggregation Pipeline</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Penentuan lokasi target & penarikan data GIS, OpEx, serta Telemetri Jaringan.</p>
      
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', borderStyle: 'dashed' }}>
        <h3 style={{ color: 'var(--text-muted)' }}>[ Modul Input Titik Koordinat & Proses Background Pipeline di sini ]</h3>
      </div>
    </div>
  );
};

export default LocationAggregation;
