import React from 'react';

const HoQProcessor = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>3. HoQ Matrix Processor</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Pemrosesan hubungan parameter teknis dan penghitungan pembobotan 9-3-1.</p>
      
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', borderStyle: 'dashed' }}>
        <h3 style={{ color: 'var(--text-muted)' }}>[ Visualisasi Matriks Hubungan Kebutuhan (WHATs) vs Teknis (HOWs) di sini ]</h3>
      </div>
    </div>
  );
};

export default HoQProcessor;
