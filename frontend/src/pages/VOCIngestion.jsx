import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Wallet, 
  Users, 
  CircleDollarSign, 
  Truck, 
  Car,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Loader2,
  CheckCircle,
  Activity,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VOCIngestion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jenisUsaha: '',
    lokasiTarget: '',
    budgetSewa: '',
    targetPasar: '',
    modalAwal: '',
    supplier: '',
    aksesibilitas: ''
  });

  const [analysisState, setAnalysisState] = useState('idle'); // 'idle', 'analyzing', 'results'
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fase 3, 4, 5: Mock AI Engine API
  const mockAIAnalyze = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let rec1 = "Area komersial dengan potensi stabil & kompetitor moderat.";
        if (data.jenisUsaha === 'Restoran') rec1 = "Fokus ke area Mall atau pusat kota untuk traffic optimal.";
        if (data.jenisUsaha === 'Cafe') rec1 = "Cari lokasi strategis dekat kampus atau gedung perkantoran.";

        let rec2 = "Area berkembang dengan prospek pertumbuhan stabil.";
        const modal = Number(data.modalAwal || 0);
        if (modal < 20000000) rec2 = "Pilih area suburban/pinggiran kota untuk menghemat biaya operasional awal.";
        if (modal >= 100000000) rec2 = "Lokasi premium dengan eksposur tinggi sangat direkomendasikan karena modal cukup untuk ROI optimal.";

        let rec3 = "Cocok di area padat penduduk dengan dukungan logistik online.";
        if (data.aksesibilitas.includes('Utama') && data.supplier !== 'Lainnya') {
          rec3 = "Sangat strategis di jalan utama, dekat jalur distribusi pasokan langsung.";
        }

        resolve({
          scores: [
            { label: 'Skor Lokasi', value: Math.floor(Math.random() * 20) + 80, icon: <MapPin size={20} /> },
            { label: 'Prediksi Profit', value: Math.floor(Math.random() * 30) + 70, icon: <TrendingUp size={20} /> },
            { label: 'Tingkat Kompetitor', value: Math.floor(Math.random() * 40) + 40, icon: <Users size={20} /> },
            { label: 'Estimasi ROI', value: Math.floor(Math.random() * 20) + 80, icon: <Activity size={20} /> },
            { label: 'Kelayakan Modal', value: Math.floor(Math.random() * 15) + 85, icon: <Wallet size={20} /> },
            { label: 'Skor Supplier', value: Math.floor(Math.random() * 20) + 75, icon: <Truck size={20} /> },
            { label: 'Aksesibilitas', value: Math.floor(Math.random() * 20) + 75, icon: <Car size={20} /> }
          ],
          recommendations: [rec1, rec2, rec3]
        });
      }, 3500); // 3.5s loading placeholder
    });
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    // Fase 2: Validasi
    const isComplete = Object.values(formData).every(val => val !== '');
    if (!isComplete) {
      alert("Alert! Harap isi semua 7 variabel sebelum menganalisis lokasi.");
      return;
    }
    
    // Fase 3: AI Analyzing State
    setAnalysisState('analyzing');
    
    // API Call
    const res = await mockAIAnalyze(formData);
    
    // Fase 4 & 5: Show Results
    setResults(res);
    setAnalysisState('results');

    setTimeout(() => {
      document.getElementById('ai-results').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div style={{ background: '#071126', color: '#ffffff', minHeight: '100vh', width: '100%' }}>
      
      {/* Hero Section */}
      <section style={{
        padding: '120px 40px 180px 40px',
        position: 'relative',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #071126 0%, #0d1e3d 100%)',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative grid/glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px', background: 'radial-gradient(circle, rgba(30, 136, 229, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#1e88e5',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            Kecerdasan Lokasi UMKM GeoProfit
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '3.8rem',
            fontWeight: '500',
            lineHeight: '1.25',
            marginBottom: '24px',
            color: 'white'
          }}>
            Meningkatkan Keputusan Lokasi UMKM
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#94a3b8',
            maxWidth: '650px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            Keunggulan Rekayasa Sistem • Analitik GIS Berbasis AI • Estimasi Kelayakan Finansial
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button 
              onClick={() => document.getElementById('fase1-form').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: '#1e88e5',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(30, 136, 229, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 136, 229, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(30, 136, 229, 0.4)';
              }}
            >
              Analisis Sekarang
            </button>
            <button 
              style={{
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Pelajari Selengkapnya
            </button>
          </div>
        </div>
      </section>

      {/* Overlapping Cards Section */}
      <section style={{
        padding: '0 40px',
        marginTop: '-120px',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '80px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr 1fr',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          
          {/* Card 1: About Us */}
          <div className="glass-panel" style={{ 
            padding: '32px', 
            background: 'rgba(13, 27, 56, 0.85)', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            borderRadius: '8px',
            minHeight: '520px'
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '500', marginBottom: '16px' }}>Tentang Kami</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                GeoProfit UMKM mengintegrasikan Decision Support System (DSS) dengan data GIS real-time untuk membantu wirausahawan menentukan lokasi cabang yang paling menguntungkan secara ilmiah.
              </p>
            </div>
            <div style={{
              borderRadius: '6px',
              overflow: 'hidden',
              height: '240px',
              backgroundImage: `url("${import.meta.env.BASE_URL}skyscraper_card_bg.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }} />
          </div>

          {/* Card 2: Fase 1 Form (Elevated/Raised) */}
          <div id="fase1-form" className="glass-panel" style={{ 
            padding: '32px', 
            background: 'rgba(18, 38, 78, 0.95)', 
            border: '2px solid #1e88e5',
            boxShadow: '0 12px 40px rgba(30, 136, 229, 0.25)',
            transform: 'scale(1.02) translateY(-10px)',
            borderRadius: '8px',
            display: 'flex', 
            flexDirection: 'column',
            zIndex: 5
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: '500', marginBottom: '8px', color: 'white' }}>
              Variabel Usaha Anda
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '24px' }}>
              Fase 1 — Isi 7 variabel bisnis untuk menghitung kelayakan lokasi.
            </p>

            <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Var 1: Jenis Usaha */}
              <div className="form-group">
                <label style={labelStyle}>Jenis Usaha</label>
                <div style={inputContainerStyle}>
                  <Briefcase size={16} color="#94a3b8" />
                  <select name="jenisUsaha" value={formData.jenisUsaha} onChange={handleChange} style={inputStyle}>
                    <option value="" disabled>Pilih jenis usaha...</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Restoran">Restoran</option>
                    <option value="Barbershop">Barbershop</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Retail">Retail / Minimarket</option>
                    <option value="Lainnya">Lainnya (30+ Pilihan)</option>
                  </select>
                </div>
              </div>

              {/* Var 2: Lokasi Target */}
              <div className="form-group">
                <label style={labelStyle}>Lokasi Target</label>
                <div style={inputContainerStyle}>
                  <MapPin size={16} color="#94a3b8" />
                  <input 
                    type="text" 
                    name="lokasiTarget" 
                    value={formData.lokasiTarget} 
                    onChange={handleChange} 
                    placeholder="Contoh: Bogor, Depok, Bandung..." 
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Grid 2 Columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Var 3: Budget Sewa */}
                <div className="form-group">
                  <label style={labelStyle}>Budget Sewa (Bulan)</label>
                  <div style={inputContainerStyle}>
                    <Wallet size={16} color="#94a3b8" />
                    <input 
                      type="number" 
                      name="budgetSewa" 
                      value={formData.budgetSewa} 
                      onChange={handleChange} 
                      placeholder="Rp" 
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Var 4: Target Pasar */}
                <div className="form-group">
                  <label style={labelStyle}>Target Pasar</label>
                  <div style={inputContainerStyle}>
                    <Users size={16} color="#94a3b8" />
                    <select name="targetPasar" value={formData.targetPasar} onChange={handleChange} style={inputStyle}>
                      <option value="" disabled>Target...</option>
                      <option value="Mahasiswa">Mahasiswa</option>
                      <option value="Pekerja">Pekerja</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid 2 Columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Var 5: Modal Awal */}
                <div className="form-group">
                  <label style={labelStyle}>Modal Awal</label>
                  <div style={inputContainerStyle}>
                    <CircleDollarSign size={16} color="#94a3b8" />
                    <input 
                      type="number" 
                      name="modalAwal" 
                      value={formData.modalAwal} 
                      onChange={handleChange} 
                      placeholder="Rp" 
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Var 6: Supplier */}
                <div className="form-group">
                  <label style={labelStyle}>Supplier</label>
                  <div style={inputContainerStyle}>
                    <Truck size={16} color="#94a3b8" />
                    <select name="supplier" value={formData.supplier} onChange={handleChange} style={inputStyle}>
                      <option value="" disabled>Supplier...</option>
                      <option value="Pasar Induk">Pasar Induk</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Pabrik">Pabrik</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Var 7: Aksesibilitas */}
              <div className="form-group">
                <label style={labelStyle}>Aksesibilitas</label>
                <div style={inputContainerStyle}>
                  <Car size={16} color="#94a3b8" />
                  <select name="aksesibilitas" value={formData.aksesibilitas} onChange={handleChange} style={inputStyle}>
                    <option value="" disabled>Pilih tingkat akses...</option>
                    <option value="Pinggir Jalan Utama">Pinggir Jalan Utama</option>
                    <option value="Masuk Gang">Masuk Gang</option>
                    <option value="Parkir Luas">Kawasan dengan Parkir Luas</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={analysisState === 'analyzing'}
                className="btn-analyze"
                style={{
                  background: analysisState === 'analyzing' ? '#334155' : '#1e88e5',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: analysisState === 'analyzing' ? 'not-allowed' : 'pointer',
                  marginTop: '10px',
                  boxShadow: analysisState === 'analyzing' ? 'none' : '0 4px 14px rgba(30, 136, 229, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                {analysisState === 'analyzing' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> AI Menganalisis...
                  </>
                ) : (
                  <>
                    Analisis Lokasi <ChevronRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Card 3: Recent Simulations */}
          <div className="glass-panel" style={{ 
            padding: '32px', 
            background: 'rgba(13, 27, 56, 0.85)', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            borderRadius: '8px',
            minHeight: '520px'
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '500', marginBottom: '24px' }}>Simulasi Terkini</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <RecentItem 
                  title="Cafe Cerdas - Bandung"
                  score="94% Kelayakan"
                  desc="Budget Rp 6M/bln • Pasar: Mahasiswa"
                />
                <RecentItem 
                  title="Barbershop Premium - Depok"
                  score="88% Kelayakan"
                  desc="Budget Rp 4M/bln • Pasar: Pekerja"
                />
                <RecentItem 
                  title="Laundry Express - Bogor"
                  score="82% Kelayakan"
                  desc="Budget Rp 3.5M/bln • Pasar: Umum"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Results Section (Phase 4 & 5) */}
      {analysisState === 'results' && results && (
        <section id="ai-results" style={{
          padding: '40px',
          maxWidth: '1200px',
          margin: '0 auto 80px auto',
          animation: 'fadeIn 0.6s ease-out forwards'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#1e88e5', marginBottom: '12px', fontWeight: '500' }}>
              Hasil Analisis AI
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Fase 4 & 5 — Metrik lokasi dan rekomendasi strategis untuk Anda.</p>
          </div>

          {/* Phase 4: Metrics Dashboard */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            marginBottom: '40px'
          }}>
            {results.scores.map((score, idx) => (
              <div key={idx} className="glass-panel" style={{
                padding: '24px 16px',
                background: 'rgba(13, 27, 56, 0.85)',
                borderRadius: '8px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}>
                <div style={{ 
                  width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(30, 136, 229, 0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e88e5',
                  margin: '0 auto 16px auto'
                }}>
                  {score.icon}
                </div>
                <h4 style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {score.label}
                </h4>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white', fontFamily: 'var(--font-sans)' }}>
                  {score.value}<span style={{ fontSize: '1rem', color: '#64748b', fontWeight: '500' }}>/100</span>
                </div>
              </div>
            ))}
          </div>

          {/* Phase 5: AI Recommendations */}
          <div className="glass-panel" style={{
            padding: '40px',
            background: 'rgba(18, 38, 78, 0.6)',
            borderRadius: '8px',
            borderLeft: '4px solid #1e88e5'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
              <Target color="#1e88e5" /> Rekomendasi Strategis (Berdasarkan Variabel Anda)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {results.recommendations.map((rec, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <CheckCircle size={22} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ color: '#f8fafc', fontSize: '1.05rem', lineHeight: '1.6' }}>{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action to Next Phase */}
          <div className="glass-panel" style={{ 
            marginTop: '32px', 
            padding: '32px', 
            background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.1) 0%, rgba(13, 27, 56, 0.8) 100%)',
            borderLeft: '4px solid #1e88e5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '8px' }}>Analisis Tahap 1 Selesai</h3>
              <p style={{ color: '#94a3b8' }}>Variabel bisnis Anda telah dicatat. Selanjutnya, kita akan memindai data lapangan di lokasi target Anda.</p>
            </div>
            <button 
              onClick={() => navigate('/location')}
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
              className="btn-next-phase"
            >
              Lanjut ke GIS & OpEx <ChevronRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* Bottom White Overview Section */}
      <section style={{
        background: '#ffffff',
        color: '#071126',
        padding: '100px 40px',
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '80px',
          alignItems: 'center'
        }}>
          {/* Left Column: Tech Overview */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.5rem',
              fontWeight: '500',
              lineHeight: '1.3',
              marginBottom: '24px',
              color: '#071126'
            }}>
              Mengapa Memilih GeoProfit?
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.7',
              marginBottom: '40px'
            }}>
              Kami menggabungkan data geografis, logistik, dan kemampuan finansial Anda dengan metode analisis ilmiah multi-kriteria untuk meminimalkan risiko kegagalan bisnis UMKM.
            </p>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '40px' }}>
              <StatItem 
                icon={<TrendingUp size={24} color="#1e88e5" />}
                number="98%"
                label="Akurasi Model"
              />
              <StatItem 
                icon={<Award size={24} color="#1e88e5" />}
                number="30+"
                label="Jenis Usaha"
              />
              <StatItem 
                icon={<Zap size={24} color="#1e88e5" />}
                number="3-5s"
                label="Analisis AI Instan"
              />
            </div>
          </div>

          {/* Right Column: Office Image mockup */}
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(7, 17, 38, 0.08)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <img 
              src={`${import.meta.env.BASE_URL}modern_office_stats.png`} 
              alt="GeoProfit Premium Boardroom Mockup" 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </section>

    </div>
  );
};

// Sub-components
const RecentItem = ({ title, score, desc }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '6px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    transition: 'all 0.3s ease'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
    e.currentTarget.style.borderColor = 'rgba(30, 136, 229, 0.3)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
  }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontWeight: '600', fontSize: '0.95rem', color: '#ffffff' }}>{title}</span>
      <span style={{ fontSize: '0.8rem', color: '#1e88e5', fontWeight: '600' }}>{score}</span>
    </div>
    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{desc}</span>
  </div>
);

const StatItem = ({ icon, number, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {icon}
      <span style={{ fontSize: '2rem', fontWeight: '700', color: '#071126', fontFamily: 'var(--font-serif)' }}>{number}</span>
    </div>
    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>{label}</span>
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
  padding: '10px 14px',
  transition: 'border-color 0.2s ease',
};

const inputStyle = {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#ffffff',
  fontSize: '0.9rem',
  width: '100%',
  fontFamily: 'inherit'
};

export default VOCIngestion;
