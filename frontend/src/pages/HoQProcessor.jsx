import React, { useState } from 'react';
import { 
  Calculator,
  ArrowRight,
  Database,
  Layers,
  Network,
  Cpu,
  TrendingUp,
  CheckCircle,
  Loader2,
  TableProperties
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';

// Data Mockup
const whats = [
  { id: 'w1', name: 'Potensi Pasar Besar', weight: 5 },
  { id: 'w2', name: 'Biaya Operasional Rendah', weight: 4 },
  { id: 'w3', name: 'Visibilitas Lokasi', weight: 4 },
  { id: 'w4', name: 'Kemudahan Akses Logistik', weight: 3 },
];

const hows = [
  { id: 'h1', name: 'Kepadatan Populasi' },
  { id: 'h2', name: 'Jarak Kompetitor' },
  { id: 'h3', name: 'Biaya Sewa' },
  { id: 'h4', name: 'UMR Setempat' },
  { id: 'h5', name: 'Telemetri Jaringan' },
];

// 9=Strong, 3=Moderate, 1=Weak, 0=None
const relationMatrix = {
  w1: { h1: 9, h2: 3, h3: 1, h4: 0, h5: 1 },
  w2: { h1: 0, h2: 1, h3: 9, h4: 9, h5: 0 },
  w3: { h1: 9, h2: 3, h3: 3, h4: 0, h5: 0 },
  w4: { h1: 1, h2: 1, h3: 0, h4: 0, h5: 9 },
};

const HoQProcessor = () => {
  const navigate = useNavigate();
  const [calcState, setCalcState] = useState('idle'); // 'idle', 'calculating', 'results'
  const [resultsData, setResultsData] = useState([]);

  const getIconForValue = (val) => {
    if (val === 9) return <div style={dotStyle('#10b981')} title="Strong (9)">●</div>;
    if (val === 3) return <div style={dotStyle('#f59e0b')} title="Moderate (3)">◐</div>;
    if (val === 1) return <div style={dotStyle('#64748b')} title="Weak (1)">○</div>;
    return <div style={{ color: 'rgba(255,255,255,0.1)' }}>-</div>;
  };

  const calculateMatrix = async () => {
    setCalcState('calculating');

    // Simulate algorithm delay
    await new Promise(r => setTimeout(r, 2000));

    // Calculate Raw Weights: Sum(WHAT_weight * Relation_value)
    const weights = hows.map(how => {
      let rawWeight = 0;
      whats.forEach(what => {
        rawWeight += what.weight * relationMatrix[what.id][how.id];
      });
      return {
        parameter: how.name,
        rawWeight: rawWeight,
        fullMark: 100 // for radar chart
      };
    });

    setResultsData(weights);
    setCalcState('results');

    setTimeout(() => {
      document.getElementById('hoq-results').scrollIntoView({ behavior: 'smooth' });
    }, 200);
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
          width: '700px', height: '400px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#8b5cf6',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            Fase 3: Algoritma Inti
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '3.8rem',
            fontWeight: '500',
            lineHeight: '1.25',
            marginBottom: '24px',
            color: 'white'
          }}>
            Pemroses House of Quality (HoQ)
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#94a3b8',
            maxWidth: '650px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            Mengawinkan Kebutuhan Bisnis (WHATs) dari fase VOC dengan Parameter Geospasial & OpEx (HOWs) menggunakan perhitungan matriks korelasi non-linier (9-3-1).
          </p>
        </div>
      </section>

      {/* Main Content: The Matrix */}
      <section style={{
        padding: '0 40px',
        marginTop: '-40px',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <div className="glass-panel" style={{ 
          padding: '40px', 
          background: 'rgba(18, 38, 78, 0.95)', 
          border: '2px solid #8b5cf6',
          boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
          borderRadius: '8px',
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '8px', color: '#8b5cf6' }}>
                  <TableProperties size={24} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '500', color: 'white' }}>
                  Matriks Hubungan (WHATs vs HOWs)
                </h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Skala Korelasi: Kuat (9), Menengah (3), Lemah (1), Tidak Ada (0).</p>
            </div>
            
            <button 
              onClick={calculateMatrix}
              disabled={calcState === 'calculating'}
              style={{
                background: calcState === 'calculating' ? '#334155' : '#8b5cf6',
                color: 'white',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: calcState === 'calculating' ? 'not-allowed' : 'pointer',
                boxShadow: calcState === 'calculating' ? 'none' : '0 4px 14px rgba(139, 92, 246, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              {calcState === 'calculating' ? (
                <><Loader2 size={18} className="animate-spin" /> Menghitung Bobot...</>
              ) : (
                <><Calculator size={18} /> Kalkulasi Matriks</>
              )}
            </button>
          </div>

          {/* Matrix Table */}
          <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: 'left', minWidth: '200px' }}>Kebutuhan Bisnis (WHATs)</th>
                  <th style={{ ...thStyle, width: '80px' }}>Bobot (1-5)</th>
                  {hows.map(how => (
                    <th key={how.id} style={{ ...thStyle, width: '120px' }}>
                      <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', height: '140px', margin: '0 auto', textAlign: 'left', paddingBottom: '10px' }}>
                        {how.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {whats.map((what, idx) => (
                  <tr key={what.id} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ ...tdStyle, textAlign: 'left', fontWeight: '500' }}>{what.name}</td>
                    <td style={{ ...tdStyle, color: '#10b981', fontWeight: 'bold' }}>{what.weight}</td>
                    {hows.map(how => (
                      <td key={how.id} style={{ ...tdStyle }}>
                        {getIconForValue(relationMatrix[what.id][how.id])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Results Section */}
      {calcState === 'results' && resultsData.length > 0 && (
        <section id="hoq-results" style={{
          padding: '60px 40px',
          maxWidth: '1200px',
          margin: '40px auto 0 auto',
          animation: 'fadeIn 0.6s ease-out forwards'
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'white', marginBottom: '32px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Cpu color="#8b5cf6" /> Output HoQ: Bobot Mentah
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Chart Container 1: Radar Chart */}
            <div className="glass-panel" style={{ padding: '32px', background: 'rgba(13, 27, 56, 0.6)' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '24px', textAlign: 'center' }}>Radar Distribusi Prioritas Parameter</h4>
              <div style={{ height: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={resultsData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="parameter" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Radar name="Raw Weight" dataKey="rawWeight" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                    <RechartsTooltip 
                      contentStyle={{ background: '#0f1c3f', border: '1px solid #8b5cf6', borderRadius: '8px', color: '#fff' }} 
                      itemStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart Container 2: Bar Chart */}
            <div className="glass-panel" style={{ padding: '32px', background: 'rgba(13, 27, 56, 0.6)' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '24px', textAlign: 'center' }}>Peringkat Bobot Absolut</h4>
              <div style={{ height: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resultsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis dataKey="parameter" type="category" width={120} stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <RechartsTooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ background: '#0f1c3f', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} 
                    />
                    <Bar dataKey="rawWeight" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ 
            marginTop: '32px', 
            padding: '32px', 
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(13, 27, 56, 0.8) 100%)',
            borderLeft: '4px solid #8b5cf6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '8px' }}>Bobot Prioritas Ditemukan!</h3>
              <p style={{ color: '#94a3b8' }}>Berdasarkan perhitungan HoQ, parameter "Kepadatan Populasi" dan "Biaya Sewa" memiliki beban paling krusial. Lanjutkan ke fase Optimasi untuk resolusi konflik (The Roof).</p>
            </div>
            <button 
              onClick={() => navigate('/optimizer')}
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
              Ke Optimasi Trade-off <ArrowRight size={16} />
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

const dotStyle = (color) => ({
  color: color,
  fontSize: '1.5rem',
  lineHeight: '1',
  display: 'inline-block'
});

export default HoQProcessor;
