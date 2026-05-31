import React, { useState } from 'react';
import { 
  MapPin, 
  Map, 
  Search,
  Crosshair,
  Building2,
  Users,
  Wallet,
  Wifi,
  Activity,
  Server,
  Database,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LocationAggregation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    koordinatUtama: '',
    radiusPencarian: '5',
    zona: 'Komersial'
  });

  const [pipelineState, setPipelineState] = useState('idle'); // 'idle', 'scanning', 'results'
  const [metrics, setMetrics] = useState(null);
  const [logs, setLogs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addLog = (msg) => {
    setLogs(prev => [...prev, msg]);
  };

  const runPipeline = async (e) => {
    e.preventDefault();
    if (!formData.koordinatUtama) {
      alert("Masukkan titik koordinat atau nama jalan/kota.");
      return;
    }

    setPipelineState('scanning');
    setLogs([]);
    
    // Simulate pipeline steps
    addLog("[SYS] Menginisiasi GIS Pipeline...");
    
    await new Promise(r => setTimeout(r, 800));
    addLog("[GIS] Menarik data koordinat satelit...");
    
    await new Promise(r => setTimeout(r, 1000));
    addLog("[GIS] Menghitung radius kepadatan populasi (5km)...");
    
    await new Promise(r => setTimeout(r, 1200));
    addLog("[OPEX] Scraping estimasi biaya properti komersial...");
    
    await new Promise(r => setTimeout(r, 900));
    addLog("[OPEX] Sinkronisasi standar UMR regional...");
    
    await new Promise(r => setTimeout(r, 1100));
    addLog("[TELEMETRY] Melakukan ping latensi jaringan area lokal...");

    await new Promise(r => setTimeout(r, 800));
    addLog("[SYS] Aggregasi data selesai. Render hasil...");

    // Generate Mock Metrics
    setMetrics({
      kepadatan: "15.420",
      kompetitor: "1.2",
      sewa: "85.000.000",
      umr: "4.850.000",
      latensi: "14",
      score: 88
    });

    setPipelineState('results');

    setTimeout(() => {
      document.getElementById('pipeline-results').scrollIntoView({ behavior: 'smooth' });
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
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#10b981',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            Fase 2: Lapisan Agregasi
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '3.8rem',
            fontWeight: '500',
            lineHeight: '1.25',
            marginBottom: '24px',
            color: 'white'
          }}>
            GIS & OpEx Pipeline
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#94a3b8',
            maxWidth: '650px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            Sistem secara otomatis mengekstraksi data spasial geolokasi, estimasi biaya operasional regional, dan kualitas infrastruktur jaringan dari titik target Anda.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section style={{
        padding: '0 40px',
        marginTop: '-40px',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Form Input Panel */}
          <div className="glass-panel" style={{ 
            padding: '32px', 
            background: 'rgba(18, 38, 78, 0.95)', 
            border: '2px solid #10b981',
            boxShadow: '0 12px 40px rgba(16, 185, 129, 0.2)',
            borderRadius: '8px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '8px', color: '#10b981' }}>
                <Crosshair size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '500', color: 'white' }}>
                Target Geospasial
              </h3>
            </div>

            <form onSubmit={runPipeline} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="form-group">
                <label style={labelStyle}>Koordinat / Lokasi Titik</label>
                <div style={inputContainerStyle}>
                  <MapPin size={16} color="#94a3b8" />
                  <input 
                    type="text" 
                    name="koordinatUtama" 
                    value={formData.koordinatUtama} 
                    onChange={handleChange} 
                    placeholder="e.g. -6.5971, 106.7932 (Bogor)" 
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={labelStyle}>Radius Ekstraksi (KM)</label>
                <div style={inputContainerStyle}>
                  <Map size={16} color="#94a3b8" />
                  <select name="radiusPencarian" value={formData.radiusPencarian} onChange={handleChange} style={inputStyle}>
                    <option value="2">2 KM (Sangat Dekat)</option>
                    <option value="5">5 KM (Menengah)</option>
                    <option value="10">10 KM (Luas)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label style={labelStyle}>Tipe Zona Area</label>
                <div style={inputContainerStyle}>
                  <Building2 size={16} color="#94a3b8" />
                  <select name="zona" value={formData.zona} onChange={handleChange} style={inputStyle}>
                    <option value="Komersial">Pusat Komersial / Bisnis</option>
                    <option value="Residensial">Perumahan / Pemukiman</option>
                    <option value="Industri">Kawasan Industri</option>
                    <option value="Pendidikan">Kawasan Pendidikan</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={pipelineState === 'scanning'}
                style={{
                  background: pipelineState === 'scanning' ? '#334155' : '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: pipelineState === 'scanning' ? 'not-allowed' : 'pointer',
                  marginTop: '10px',
                  boxShadow: pipelineState === 'scanning' ? 'none' : '0 4px 14px rgba(16, 185, 129, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                {pipelineState === 'scanning' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Mengeksekusi Pipeline...
                  </>
                ) : (
                  <>
                    <Server size={18} /> Jalankan Agregasi Data
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Terminal / Map Visualization Panel */}
          <div className="glass-panel" style={{ 
            padding: '0', 
            background: 'rgba(13, 27, 56, 0.85)', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minHeight: '400px'
          }}>
            {/* Header Terminal */}
            <div style={{ background: '#09152e', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} color="#94a3b8" />
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500', letterSpacing: '1px' }}>TERMINAL PIPELINE SISTEM</span>
            </div>
            
            {/* Body */}
            <div style={{ padding: pipelineState === 'results' ? '0' : '24px', flexGrow: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {pipelineState === 'idle' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b', gap: '16px', flexGrow: 1 }}>
                  <Globe size={48} opacity={0.2} />
                  <p>Menunggu input geospasial untuk memulai ekstraksi...</p>
                </div>
              )}

              {pipelineState === 'scanning' && (
                <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#34d399', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {logs.map((log, idx) => (
                    <div key={idx} style={{ animation: 'fadeIn 0.3s ease-out' }}>
                      <span style={{ opacity: 0.5 }}>{new Date().toLocaleTimeString()}</span> &nbsp; {log}
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', color: '#1e88e5' }}>
                    <Loader2 size={14} className="animate-spin" /> Memproses permintaan...
                  </div>
                </div>
              )}

              {pipelineState === 'results' && (
                <div style={{
                  flexGrow: 1,
                  backgroundImage: `url("${import.meta.env.BASE_URL}gis_heatmap_mockup.png")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  minHeight: '350px',
                  animation: 'fadeIn 0.8s ease-out'
                }}>
                  {/* UI Overlay */}
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(7, 17, 38, 0.85)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(4px)' }}>
                     <MapPin size={14} color="#10b981" />
                     <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Heatmap OpEx Langsung</span>
                  </div>
                  {/* Center Radar Ping */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(16, 185, 129, 0.6)', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 16px 4px rgba(16, 185, 129, 0.8)' }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Dashboard */}
      {pipelineState === 'results' && metrics && (
        <section id="pipeline-results" style={{
          padding: '60px 40px',
          maxWidth: '1200px',
          margin: '40px auto 0 auto',
          animation: 'fadeIn 0.6s ease-out forwards'
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'white', marginBottom: '32px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Database color="#10b981" /> Hasil Ekstraksi Data Regional
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px'
          }}>
            <MetricCard 
              icon={<Users size={24} />} 
              label="Kepadatan Populasi" 
              value={metrics.kepadatan} 
              unit="jiwa/km²" 
              color="#1e88e5" 
            />
            <MetricCard 
              icon={<AlertTriangle size={24} />} 
              label="Jarak Kompetitor (Avg)" 
              value={metrics.kompetitor} 
              unit="km" 
              color="#f59e0b" 
            />
            <MetricCard 
              icon={<Building2 size={24} />} 
              label="Estimasi Sewa" 
              value={`Rp ${metrics.sewa}`} 
              unit="/tahun" 
              color="#10b981" 
            />
            <MetricCard 
              icon={<Wallet size={24} />} 
              label="UMR Setempat" 
              value={`Rp ${metrics.umr}`} 
              unit="/bulan" 
              color="#8b5cf6" 
            />
            <MetricCard 
              icon={<Wifi size={24} />} 
              label="Telemetri Jaringan" 
              value={metrics.latensi} 
              unit="ms latensi" 
              color="#06b6d4" 
            />
          </div>

          <div className="glass-panel" style={{ 
            marginTop: '32px', 
            padding: '32px', 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(13, 27, 56, 0.8) 100%)',
            borderLeft: '4px solid #10b981',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '8px' }}>Pipeline Berhasil Diselesaikan</h3>
              <p style={{ color: '#94a3b8' }}>Data GIS dan OpEx telah siap untuk diteruskan ke mesin kalkulasi House of Quality (HoQ).</p>
            </div>
            <button 
              onClick={() => navigate('/hoq')}
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
              Lanjut ke HoQ <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

    </div>
  );
};

// Sub-components
const MetricCard = ({ icon, label, value, unit, color }) => (
  <div className="glass-panel" style={{
    padding: '24px',
    background: 'rgba(13, 27, 56, 0.6)',
    border: `1px solid rgba(255,255,255,0.05)`,
    borderTop: `3px solid ${color}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
    <div style={{ color: color, background: `${color}15`, width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <div>
      <h4 style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500', marginBottom: '4px' }}>{label}</h4>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white' }}>{value}</span>
        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{unit}</span>
      </div>
    </div>
  </div>
);

// Form styling constants
const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: '600',
  color: '#94a3b8',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const inputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: '#09152e',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  padding: '12px 14px',
  transition: 'border-color 0.2s ease',
};

const inputStyle = {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#ffffff',
  fontSize: '0.95rem',
  width: '100%',
  fontFamily: 'inherit'
};

export default LocationAggregation;
