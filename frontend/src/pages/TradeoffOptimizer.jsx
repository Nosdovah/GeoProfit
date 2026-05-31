import React, { useState } from 'react';
import { 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  RefreshCcw,
  CheckCircle2,
  Settings2,
  LineChart,
  Target,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';

// Data Mockup untuk Pareto
const paretoData = [
  { id: 'Lokasi A (CBD)', populasi: 95, sewa: 90, type: 'dominated' }, 
  { id: 'Lokasi B (Pinggiran)', populasi: 40, sewa: 20, type: 'dominated' }, 
  { id: 'Lokasi C (Komersial Baru)', populasi: 85, sewa: 60, type: 'optimal' }, // Sweet spot
  { id: 'Lokasi D (Pasar Lama)', populasi: 70, sewa: 45, type: 'optimal' }, 
  { id: 'Lokasi E (Mall Elite)', populasi: 90, sewa: 98, type: 'dominated' }, 
  { id: 'Lokasi F (Kampus)', populasi: 75, sewa: 50, type: 'optimal' }, 
];

// Data Mockup untuk The Roof (Korelasi antar HOWs)
const hows = [
  { id: 'h1', name: 'Kepadatan Populasi' },
  { id: 'h2', name: 'Jarak Kompetitor' },
  { id: 'h3', name: 'Biaya Sewa' },
  { id: 'h4', name: 'UMR Setempat' },
  { id: 'h5', name: 'Kualitas Jaringan' },
];

const correlationMatrix = {
  h1: { h1: null, h2: '-', h3: '--', h4: '+', h5: '0' },
  h2: { h1: '-', h2: null, h3: '+', h4: '0', h5: '0' },
  h3: { h1: '--', h2: '+', h3: null, h4: '++', h5: '0' },
  h4: { h1: '+', h2: '0', h3: '++', h4: null, h5: '0' },
  h5: { h1: '0', h2: '0', h3: '0', h4: '0', h5: null },
};

const getCorrelationIcon = (val) => {
  if (val === '--') return <span style={{ color: '#ef4444', fontWeight: 'bold' }}>--</span>; // Strong Negative
  if (val === '-') return <span style={{ color: '#f87171' }}>-</span>; // Negative
  if (val === '++') return <span style={{ color: '#10b981', fontWeight: 'bold' }}>++</span>; // Strong Positive
  if (val === '+') return <span style={{ color: '#34d399' }}>+</span>; // Positive
  if (val === '0') return <span style={{ color: 'rgba(255,255,255,0.2)' }}>○</span>; // Neutral
  return <span style={{ color: 'rgba(255,255,255,0.05)' }}>\\</span>;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ background: '#0f1c3f', border: `1px solid ${data.type === 'optimal' ? '#10b981' : '#ef4444'}`, padding: '12px', borderRadius: '8px', color: 'white' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '8px', color: data.type === 'optimal' ? '#10b981' : '#f8fafc' }}>{data.id}</p>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Kepadatan (Benefit): <span style={{ color: 'white' }}>{data.populasi}</span></p>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Biaya Sewa (Cost): <span style={{ color: 'white' }}>{data.sewa}</span></p>
        <div style={{ marginTop: '8px', fontSize: '0.8rem', padding: '4px 8px', background: data.type === 'optimal' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: data.type === 'optimal' ? '#10b981' : '#ef4444', borderRadius: '4px', display: 'inline-block' }}>
          {data.type === 'optimal' ? 'Pareto Optimal (Sweet Spot)' : 'Didominasi (Sub-optimal)'}
        </div>
      </div>
    );
  }
  return null;
};

const TradeoffOptimizer = () => {
  const navigate = useNavigate();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const runOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setShowResults(true);
      setTimeout(() => {
        document.getElementById('pareto-results').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2500);
  };

  return (
    <div style={{ background: '#071126', color: '#ffffff', minHeight: '100vh', width: '100%', paddingBottom: '100px' }}>
      {/* Hero Section */}
      <section style={{
        padding: '120px 40px 100px 40px',
        position: 'relative',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #071126 0%, #0d1e3d 100%)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#ef4444',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            Fase 4: Resolusi Konflik
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '3.8rem',
            fontWeight: '500',
            lineHeight: '1.25',
            marginBottom: '24px',
            color: 'white'
          }}>
            The Roof Optimizer
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#94a3b8',
            maxWidth: '650px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            Mendeteksi korelasi negatif (Trade-off) antar parameter teknis, dan menggunakan algoritma Pareto Efficiency untuk mencari solusi lokasi yang paling rasional (Sweet Spot).
          </p>
        </div>
      </section>

      {/* Main Content: The Roof Matrix */}
      <section style={{
        padding: '0 40px',
        marginTop: '-40px',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <div className="glass-panel" style={{ 
          padding: '40px', 
          background: 'rgba(18, 38, 78, 0.95)', 
          border: '2px solid #ef4444',
          boxShadow: '0 12px 40px rgba(239, 68, 68, 0.15)',
          borderRadius: '8px',
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '8px', color: '#ef4444' }}>
                  <AlertTriangle size={24} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '500', color: 'white' }}>
                  Matriks Korelasi (The Roof)
                </h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '600px', lineHeight: '1.5' }}>
                Identifikasi konflik. Contoh: Lokasi dengan "Kepadatan Populasi" tinggi umumnya memiliki "Biaya Sewa" yang sangat tinggi (Korelasi Negatif Kuat).
              </p>
            </div>
            
            <button 
              onClick={runOptimization}
              disabled={isOptimizing}
              style={{
                background: isOptimizing ? '#334155' : '#ef4444',
                color: 'white',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: isOptimizing ? 'not-allowed' : 'pointer',
                boxShadow: isOptimizing ? 'none' : '0 4px 14px rgba(239, 68, 68, 0.3)',
                transition: 'all 0.3s ease',
                flexShrink: 0
              }}
            >
              {isOptimizing ? (
                <><RefreshCcw size={18} className="animate-spin" /> Menghitung Pareto...</>
              ) : (
                <><Settings2 size={18} /> Selesaikan Trade-off</>
              )}
            </button>
          </div>

          {/* Roof Matrix Table */}
          <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: 'left', minWidth: '200px' }}>Parameter (HOWs)</th>
                  {hows.map((how, idx) => (
                    <th key={how.id} style={{ ...thStyle, width: '100px' }}>
                      V{idx + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hows.map((howRow, rowIndex) => (
                  <tr key={howRow.id} style={{ background: rowIndex % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ ...tdStyle, textAlign: 'left', fontWeight: '500', color: '#cbd5e1' }}>
                      <span style={{ color: '#94a3b8', marginRight: '8px' }}>V{rowIndex + 1}</span> {howRow.name}
                    </td>
                    {hows.map((howCol, colIndex) => {
                      // Only show top-right triangle or full matrix based on preference, here we show full for clarity
                      const val = correlationMatrix[howRow.id][howCol.id];
                      return (
                        <td key={howCol.id} style={{ ...tdStyle, background: val === '--' ? 'rgba(239, 68, 68, 0.1)' : 'transparent' }}>
                          {getCorrelationIcon(val)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '24px', fontSize: '0.85rem', color: '#94a3b8', justifyContent: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ color: '#10b981', fontWeight: 'bold' }}>++</span> Positif Kuat</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ color: '#34d399' }}>+</span> Positif</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ color: '#f87171' }}>-</span> Negatif</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ color: '#ef4444', fontWeight: 'bold' }}>--</span> Negatif Kuat (Trade-off)</span>
          </div>

        </div>
      </section>

      {/* Pareto Results Section */}
      {showResults && (
        <section id="pareto-results" style={{
          padding: '60px 40px',
          maxWidth: '1200px',
          margin: '40px auto 0 auto',
          animation: 'fadeIn 0.6s ease-out forwards'
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'white', marginBottom: '32px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Target color="#ef4444" /> Batas Efisiensi Pareto
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
            
            {/* Chart Container */}
            <div className="glass-panel" style={{ padding: '32px', background: 'rgba(13, 27, 56, 0.6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#f8fafc' }}>Kepadatan Populasi vs Biaya Sewa</h4>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div> Optimal</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div> Didominasi</span>
                </div>
              </div>
              
              <div style={{ height: '400px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" dataKey="sewa" name="Biaya Sewa" unit="M" stroke="#94a3b8" label={{ value: 'Biaya Sewa (Cost) →', position: 'bottom', fill: '#94a3b8' }} domain={[0, 100]} />
                    <YAxis type="number" dataKey="populasi" name="Kepadatan Populasi" stroke="#94a3b8" label={{ value: 'Kepadatan Populasi (Benefit) ↑', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} domain={[0, 100]} />
                    <ZAxis type="category" dataKey="id" name="Lokasi" />
                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                    
                    {/* Scatter data */}
                    <Scatter name="Lokasi" data={paretoData}>
                      {paretoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.type === 'optimal' ? '#10b981' : '#ef4444'} />
                      ))}
                    </Scatter>

                    {/* Simulating the Pareto Curve (Frontier) - drawn manually for visual effect */}
                    <ReferenceLine segment={[{ x: 60, y: 85 }, { x: 45, y: 70 }]} stroke="#10b981" strokeWidth={2} strokeDasharray="3 3" />
                    <ReferenceLine segment={[{ x: 45, y: 70 }, { x: 50, y: 75 }]} stroke="#10b981" strokeWidth={2} strokeDasharray="3 3" />
                    <ReferenceLine segment={[{ x: 50, y: 75 }, { x: 60, y: 85 }]} stroke="#10b981" strokeWidth={2} strokeDasharray="3 3" />

                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Insight Side Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <h4 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <CheckCircle2 size={20} /> Sweet Spot Ditemukan
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  Terdapat 3 lokasi (C, D, F) yang berada pada <strong>Garis Depan Pareto</strong>. Lokasi ini memberikan keseimbangan terbaik antara jumlah keramaian penduduk dan biaya sewa yang masuk akal.
                </p>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px', borderLeft: '2px solid #10b981' }}>
                  <p style={{ color: 'white', fontSize: '0.9rem', fontWeight: '500' }}>Rekomendasi Utama: Lokasi C</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Populasi: 85, Sewa: 60M/thn</p>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <h4 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <AlertTriangle size={20} /> Lokasi Tereliminasi
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Lokasi A dan E tereliminasi karena biaya sewa yang terlalu eksponensial (tidak sebanding dengan kenaikan benefit kepadatan).
                </p>
              </div>
            </div>

          </div>

          {/* Action to Dashboard */}
          <div className="glass-panel" style={{ 
            marginTop: '32px', 
            padding: '32px', 
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(13, 27, 56, 0.8) 100%)',
            borderLeft: '4px solid #ef4444',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '8px' }}>Trade-off Telah Diselesaikan</h3>
              <p style={{ color: '#94a3b8' }}>Kandidat lokasi terbaik telah disaring. Lanjutkan ke fase akhir untuk melihat proyeksi ROI dan Dasbor Business Intelligence.</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'white',
                color: '#071126',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,255,255,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Lihat Dasbor BI <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

// Styling constants
const thStyle = {
  padding: '16px',
  background: '#09152e',
  color: '#94a3b8',
  fontWeight: '600',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderBottom: '1px solid rgba(255,255,255,0.1)'
};

const tdStyle = {
  padding: '16px',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  fontSize: '0.95rem'
};

export default TradeoffOptimizer;
