import React from 'react';
import { 
  Building, TrendingUp, Users, Cpu, Scale, Leaf, 
  MapPin, DollarSign, Target, Briefcase, ChevronRight,
  GraduationCap, AlertCircle, Coffee, Wallet, Truck, Navigation, List,
  Map as MapIcon, Calendar, CheckCircle, Headset, Home
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend
} from 'recharts';
import './ResultsDashboard.css';

const COLORS = ['#4ade80', '#eab308', '#ef4444'];

const ResultsDashboard = ({ result }) => {
  if (!result) return null;

  const profitData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 25 },
    { name: 'Mei', value: 30 }
  ];

  const trafficData = [
    { name: 'Sen', value: 120 },
    { name: 'Sel', value: 190 },
    { name: 'Rab', value: 150 },
    { name: 'Kam', value: 250 },
    { name: 'Jum', value: 300 }
  ];

  const roiData = [
    { name: 'ROI', value: 78 },
    { name: 'Cost', value: 22 }
  ];

  const pieData = [
    { name: 'Rendah', value: 40 },
    { name: 'Sedang', value: 35 },
    { name: 'Tinggi', value: 25 }
  ];

  return (
    <div className="results-container animate-fade-in" id="dashboard">
      
      {/* Data User Summary */}
      <div className="glass summary-card">
        <h3 className="card-title">Parameter Analisis</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <Briefcase className="summary-icon" />
            <div>
              <span className="summary-label">Jenis Usaha</span>
              <span className="summary-value">{result.usaha}</span>
            </div>
          </div>
          <div className="summary-item">
            <MapPin className="summary-icon" />
            <div>
              <span className="summary-label">Lokasi</span>
              <span className="summary-value">{result.lokasi}</span>
            </div>
          </div>
          <div className="summary-item">
            <DollarSign className="summary-icon" />
            <div>
              <span className="summary-label">Budget</span>
              <span className="summary-value">Rp {Number(result.budget).toLocaleString("id-ID")}</span>
            </div>
          </div>
          <div className="summary-item">
            <Target className="summary-icon" />
            <div>
              <span className="summary-label">Target Pasar</span>
              <span className="summary-value">{result.target}</span>
            </div>
          </div>
          <div className="summary-item">
            <Wallet className="summary-icon" />
            <div>
              <span className="summary-label">Modal Awal</span>
              <span className="summary-value">Rp {Number(result.modalAwal).toLocaleString("id-ID")}</span>
            </div>
          </div>
          <div className="summary-item">
            <Truck className="summary-icon" />
            <div>
              <span className="summary-label">Supplier Utama</span>
              <span className="summary-value">{result.supplier}</span>
            </div>
          </div>
          <div className="summary-item">
            <Navigation className="summary-icon" />
            <div>
              <span className="summary-label">Aksesibilitas</span>
              <span className="summary-value">{result.aksesibilitas}</span>
            </div>
          </div>
          <div className="summary-item">
            <List className="summary-icon" />
            <div>
              <span className="summary-label">Respon Kano</span>
              <span className="summary-value">{result.kano}</span>
            </div>
          </div>
          <div className="summary-item">
            <TrendingUp className="summary-icon" />
            <div>
              <span className="summary-label">Strategi Prioritas</span>
              <span className="summary-value">{result.strategi}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Scores Grid */}
      <div className="scores-grid">
        <div className="score-card glass">
          <div className="score-header">
            <h3>Skor Lokasi</h3>
            <span className="score-percentage">{result.lokasiScore}%</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${result.lokasiScore}%`, backgroundColor: '#4ade80' }}></div>
          </div>
        </div>

        <div className="score-card glass">
          <div className="score-header">
            <h3>Prediksi Profit</h3>
            <span className="score-percentage">{result.profitScore}%</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${result.profitScore}%`, backgroundColor: '#4ade80' }}></div>
          </div>
        </div>

        <div className="score-card glass">
          <div className="score-header">
            <h3>Tingkat Kompetitor</h3>
            <span className="score-percentage" style={{color: '#eab308'}}>{result.kompetitorScore}%</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${result.kompetitorScore}%`, backgroundColor: '#eab308' }}></div>
          </div>
        </div>

        <div className="score-card glass">
          <div className="score-header">
            <h3>ROI Estimation</h3>
            <span className="score-percentage">{result.roiScore}%</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${result.roiScore}%`, backgroundColor: '#4ade80' }}></div>
          </div>
        </div>

        <div className="score-card glass">
          <div className="score-header">
            <h3>Kelayakan Modal</h3>
            <span className="score-percentage" style={{color: '#38bdf8'}}>{result.modalScore}%</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${result.modalScore}%`, backgroundColor: '#38bdf8' }}></div>
          </div>
        </div>

        <div className="score-card glass">
          <div className="score-header">
            <h3>Skor Supplier</h3>
            <span className="score-percentage">{result.supplierScore}%</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${result.supplierScore}%`, backgroundColor: '#4ade80' }}></div>
          </div>
        </div>

        <div className="score-card glass">
          <div className="score-header">
            <h3>Skor Aksesibilitas</h3>
            <span className="score-percentage">{result.aksesibilitasScore}%</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${result.aksesibilitasScore}%`, backgroundColor: '#4ade80' }}></div>
          </div>
        </div>
      </div>

      {/* PESTLE ANALYSIS */}
      <div className="glass pestle-section">
        <h3 className="card-title">Analisis PESTLE (Tahap 1)</h3>
        <div className="pestle-grid">
          
          <div className="pestle-card">
            <div className="pestle-header p-blue">
              <Building size={20} /> <h4>Political</h4>
            </div>
            <p>{result.pestle.p}</p>
          </div>
          
          <div className="pestle-card">
            <div className="pestle-header p-green">
              <TrendingUp size={20} /> <h4>Economic</h4>
            </div>
            <p>{result.pestle.e}</p>
          </div>
          
          <div className="pestle-card">
            <div className="pestle-header p-yellow">
              <Users size={20} /> <h4>Social</h4>
            </div>
            <p>{result.pestle.s}</p>
          </div>
          
          <div className="pestle-card">
            <div className="pestle-header p-purple">
              <Cpu size={20} /> <h4>Technological</h4>
            </div>
            <p>{result.pestle.t}</p>
          </div>
          
          <div className="pestle-card">
            <div className="pestle-header p-red">
              <Scale size={20} /> <h4>Legal</h4>
            </div>
            <p>{result.pestle.l}</p>
          </div>
          
          <div className="pestle-card">
            <div className="pestle-header p-teal">
              <Leaf size={20} /> <h4>Environmental</h4>
            </div>
            <p>{result.pestle.en}</p>
          </div>

        </div>
      </div>

      {/* AI RECOMMENDATION */}
      <div className="glass recommendation-section">
        <h3 className="card-title">Rekomendasi AI</h3>
        <div className="recommendation-content">
          <ChevronRight className="rec-icon" />
          <p>{result.recommendation}</p>
        </div>
      </div>

      {/* OPTIONAL LAYANAN TAMBAHAN (ADDITIONAL SERVICES) */}
      {(result.needsSupplier || result.needsAgent || result.realEstatePartner) && (
        <div className="optional-services-container">
          <h2 className="section-title" style={{ marginTop: '60px' }}>Layanan Tambahan Terpilih</h2>
          
          <div className="optional-services-grid">
            {result.needsSupplier && (
              <div className="glass optional-card">
                <div className="optional-header p-blue">
                  <MapIcon size={24} /> <h3>Rekomendasi Supplier Terdekat</h3>
                </div>
                <div className="supplier-map-placeholder">
                  <div className="map-dummy">
                    <MapPin size={32} color="#ef4444" className="map-pin" />
                    <span>Peta Jarak Radius 5 KM</span>
                  </div>
                </div>
                <ul className="supplier-list">
                  <li>
                    <strong>1. Supplier {result.supplier} A</strong>
                    <span><Navigation size={14} /> 1.2 KM (Est. 5 min)</span>
                  </li>
                  <li>
                    <strong>2. Agen {result.usaha} Grosir</strong>
                    <span><Navigation size={14} /> 2.8 KM (Est. 12 min)</span>
                  </li>
                  <li>
                    <strong>3. Pusat Distribusi Utama</strong>
                    <span><Navigation size={14} /> 4.5 KM (Est. 20 min)</span>
                  </li>
                </ul>
              </div>
            )}

            {result.needsAgent && (
              <div className="glass optional-card">
                <div className="optional-header p-green">
                  <Headset size={24} /> <h3>Survei Lapangan oleh Agent</h3>
                </div>
                <div className="agent-content">
                  <p>Agent kami siap membantu survei fisik lokasi <strong>{result.lokasi}</strong>.</p>
                  <div className="agent-profile">
                    <div className="agent-avatar"></div>
                    <div>
                      <strong>Budi Santoso</strong>
                      <span className="agent-role">Field Surveyor Expert</span>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm schedule-btn">
                    <Calendar size={16} /> Jadwalkan Sekarang
                  </button>
                </div>
              </div>
            )}

            {result.realEstatePartner && (
              <div className="glass optional-card">
                <div className="optional-header p-yellow">
                  <Home size={24} /> <h3>Listing Partner Real Estate</h3>
                </div>
                <div className="listing-content">
                  <p>Berikut adalah rekomendasi lahan/ruko eksklusif yang sesuai dengan budget <b>Rp {Number(result.budget).toLocaleString("id-ID")}</b>.</p>
                  <div className="property-item">
                    <Building size={18} />
                    <div>
                      <strong>Kios Strategis {result.lokasi}</strong>
                      <span className="price">Sesuai Budget</span>
                    </div>
                  </div>
                  <div className="property-item">
                    <Building size={18} />
                    <div>
                      <strong>Ruko Komersial (Area Parkir Luas)</strong>
                      <span className="price">Sesuai Budget</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DASHBOARD CHARTS */}
      <h2 className="section-title" style={{ marginTop: '60px' }}>Dashboard Analytics</h2>
      
      <div className="charts-grid">
        
        <div className="chart-card glass">
          <h4 className="chart-title">Prediksi Profit</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={3} dot={{ fill: '#4ade80', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass">
          <h4 className="chart-title">Estimasi Traffic (Harian)</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass">
          <h4 className="chart-title">Rasio ROI vs Cost</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roiData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#4ade80" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass">
          <h4 className="chart-title">Analisis Kompetitor</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
      
      {/* Dynamic Recommendation Cards */}
      <div className="insights-grid" style={{ marginTop: '40px' }}>
        <div className="insight-card glass">
          <GraduationCap className="insight-icon p-blue" size={32} />
          <h4 className="insight-title">Target Demografi</h4>
          <p>Cocok untuk segmen mahasiswa dan profesional muda</p>
        </div>
        
        <div className="insight-card glass">
          <AlertCircle className="insight-icon p-yellow" size={32} />
          <h4 className="insight-title">Perhatian Khusus</h4>
          <p>Kompetitor dalam radius 1km cukup padat</p>
        </div>
        
        <div className="insight-card glass">
          <Coffee className="insight-icon p-green" size={32} />
          <h4 className="insight-title">Potensi Bisnis</h4>
          <p>Sangat ideal untuk konsep {result.usaha}</p>
        </div>
      </div>

    </div>
  );
};

export default ResultsDashboard;
