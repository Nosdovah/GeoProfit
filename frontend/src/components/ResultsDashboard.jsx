import React from 'react';
import { 
  Building, TrendingUp, Users, Cpu, Scale, Leaf, 
  MapPin, DollarSign, Target, Briefcase, ChevronRight,
  GraduationCap, AlertCircle, Coffee, Wallet, Truck, Navigation, List,
  Map as MapIcon, Calendar, CheckCircle, Headset, Home, PieChart as PieChartIcon, Activity,
  Download, ShieldAlert, FileText, Gift, Megaphone, Smartphone, Layers, AlertTriangle
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

  // Use dynamic data from result, or fallback to defaults
  const profitData = result.profitData || [];
  const trafficData = result.trafficData || [];
  const pieData = result.pieData || [];

  const formatCurrency = (val) => {
    if (!val || isNaN(val)) return "Rp 0";
    return `Rp ${Number(val).toLocaleString("id-ID")}`;
  };

  const overallScore = Math.floor(
    (result.lokasiScore + result.profitScore + result.roiScore + result.modalScore + result.aksesibilitasScore) / 5
  );

  return (
    <div className="results-container animate-fade-in" id="dashboard">
      
      {/* HEADER SECTION */}
      <div className="dashboard-header-wrapper">
        <div className="ab-test-badge">
          <Layers size={14} /> Sisa Kuota Analisa: <strong>1 Token</strong> (Bandingkan Lokasi Lain)
        </div>
        <div className="dashboard-header glass">
          <div className="header-content">
            <h2 className="dashboard-title">Executive Summary</h2>
            <p className="dashboard-subtitle">Hasil analisis komprehensif untuk kelayakan bisnis Anda.</p>
            <button className="btn-download-pdf">
              <Download size={16} /> Download Laporan (Investor Ready)
            </button>
          </div>
          <div className="overall-score-box">
            <div className="score-circle">
              <span className="score-value">{overallScore}%</span>
              <span className="score-label">Kelayakan Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* PARAMETER & SCORES BENTO BOX */}
      <div className="bento-grid-top">
        
        {/* Parameter Summary */}
        <div className="bento-card glass">
          <div className="bento-header">
            <List size={20} className="p-blue" />
            <h3>Parameter Input</h3>
          </div>
          <div className="parameter-grid">
            <div className="param-item">
              <span className="param-label">Jenis Usaha</span>
              <span className="param-value"><Briefcase size={14}/> {result.usaha || '-'}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Lokasi Target</span>
              <span className="param-value"><MapPin size={14}/> {result.lokasi || '-'}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Target Pasar</span>
              <span className="param-value"><Users size={14}/> {result.target || '-'}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Modal Awal</span>
              <span className="param-value"><Wallet size={14}/> {formatCurrency(result.modalAwal)}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Budget Sewa</span>
              <span className="param-value"><DollarSign size={14}/> {formatCurrency(result.budget)}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Supplier Utama</span>
              <span className="param-value"><Truck size={14}/> {result.supplier || '-'}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Aksesibilitas</span>
              <span className="param-value"><Navigation size={14}/> {result.aksesibilitas || '-'}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Voice of Customer</span>
              <span className="param-value p-primary"><CheckCircle size={14}/> {result.kano || 'Tidak ada'}</span>
            </div>
          </div>
        </div>

        {/* Detailed Scores */}
        <div className="bento-card glass">
          <div className="bento-header">
            <Activity size={20} className="p-green" />
            <h3>Metrik Kelayakan Bisnis</h3>
          </div>
          <div className="metrics-list">
            
            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name">Skor Lokasi</span>
                <span className="metric-score">{result.lokasiScore}%</span>
              </div>
              <div className="progress-container"><div className="progress-bar p-bg-green" style={{width: `${result.lokasiScore}%`}}></div></div>
            </div>

            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name">Prediksi Profit</span>
                <span className="metric-score">{result.profitScore}%</span>
              </div>
              <div className="progress-container"><div className="progress-bar p-bg-green" style={{width: `${result.profitScore}%`}}></div></div>
            </div>

            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name">Estimasi ROI</span>
                <span className="metric-score">{result.roiScore}%</span>
              </div>
              <div className="progress-container"><div className="progress-bar p-bg-blue" style={{width: `${result.roiScore}%`}}></div></div>
            </div>

            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name">Kelayakan Modal</span>
                <span className="metric-score">{result.modalScore}%</span>
              </div>
              <div className="progress-container"><div className="progress-bar p-bg-blue" style={{width: `${result.modalScore}%`}}></div></div>
            </div>

            <div className="metric-row">
              <div className="metric-info">
                <span className="metric-name">Tingkat Kompetitor</span>
                <span className="metric-score p-yellow">{result.kompetitorScore}%</span>
              </div>
              <div className="progress-container"><div className="progress-bar p-bg-yellow" style={{width: `${result.kompetitorScore}%`}}></div></div>
            </div>

          </div>
        </div>

      </div>

      {/* AI RECOMMENDATION & MARKETING PROFILING (Hero Style) */}
      <div className="glass recommendation-banner">
        <div className="rec-icon-wrapper">
          <Cpu size={32} className="p-primary" />
        </div>
        <div className="rec-text-container">
          <div className="rec-text">
            <h3>Saran & Strategi AI Utama</h3>
            <p>{result.recommendation} Strategi prioritas yang disarankan: <strong>{result.strategi}</strong>.</p>
          </div>
          <div className="marketing-profiling">
            <div className="marketing-header">
              <Megaphone size={18} className="p-yellow" />
              <h4>Profiling Target Pasar (Hyper-Local)</h4>
            </div>
            <p className="marketing-desc">
              Mayoritas demografi di radius 2KM dari lokasi <strong>{result.lokasi || 'ini'}</strong> adalah kelompok Milenial & Gen-Z (Mahasiswa/Pekerja).
            </p>
            <div className="promo-strategy">
              <strong>Rekomendasi Promosi:</strong> Fokuskan pada <em>Flash-Sale</em> atau Bundling promo pada jam makan siang menggunakan platform TikTok/Instagram dengan geo-tagging lokal.
            </div>
          </div>
        </div>
      </div>

      {/* PESTLE ANALYSIS */}
      <h2 className="section-title">Analisis PESTLE Makro</h2>
      <div className="pestle-bento-grid">
        <div className="pestle-card glass">
          <div className="pestle-header p-blue"><Building size={18} /> Political</div>
          <p>{result.pestle.p}</p>
        </div>
        <div className="pestle-card glass">
          <div className="pestle-header p-green"><TrendingUp size={18} /> Economic</div>
          <p>{result.pestle.e}</p>
        </div>
        <div className="pestle-card glass">
          <div className="pestle-header p-yellow"><Users size={18} /> Social</div>
          <p>{result.pestle.s}</p>
        </div>
        <div className="pestle-card glass">
          <div className="pestle-header p-purple"><Cpu size={18} /> Technological</div>
          <p>{result.pestle.t}</p>
        </div>
        <div className="pestle-card glass">
          <div className="pestle-header p-red"><Scale size={18} /> Legal</div>
          <p>{result.pestle.l}</p>
        </div>
        <div className="pestle-card glass">
          <div className="pestle-header p-teal"><Leaf size={18} /> Environmental</div>
          <p>{result.pestle.en}</p>
        </div>
      </div>

      {/* RISK HEATMAP & LEGAL CHECKLIST (NEW BENTO GRID) */}
      <h2 className="section-title" style={{ marginTop: '50px' }}>Mitigasi Risiko & Legalitas</h2>
      <div className="risk-legal-grid">
        
        {/* Risk Heatmap */}
        <div className="risk-card glass">
          <div className="risk-header">
            <ShieldAlert size={20} className="p-red" />
            <h3>Peta Panas Risiko Lokal (Heatmap)</h3>
          </div>
          <div className="risk-list">
            <div className="risk-item">
              <div className="risk-title">
                <span>Risiko Kepadatan Lalu Lintas</span>
                <span className="risk-badge high">Tinggi</span>
              </div>
              <p className="risk-mitigation"><strong>Mitigasi:</strong> Optimalkan layanan Drive-Thru atau kerja sama kurir online karena lahan parkir mungkin terbatas saat jam sibuk.</p>
            </div>
            <div className="risk-item">
              <div className="risk-title">
                <span>Risiko Banjir (Musiman)</span>
                <span className="risk-badge medium">Sedang</span>
              </div>
              <p className="risk-mitigation"><strong>Mitigasi:</strong> Pastikan desain outlet atau ruko memiliki elevasi lantai minimal 20cm dari jalan raya utama.</p>
            </div>
            <div className="risk-item">
              <div className="risk-title">
                <span>Risiko Pungli / Premanisme</span>
                <span className="risk-badge low">Rendah</span>
              </div>
              <p className="risk-mitigation"><strong>Mitigasi:</strong> Lingkungan relatif aman, terapkan sistem keamanan standar CCTV dan penerangan ekstra di malam hari.</p>
            </div>
          </div>
        </div>

        {/* Legal Checklist */}
        <div className="legal-card glass">
          <div className="legal-header">
            <FileText size={20} className="p-blue" />
            <h3>Checklist Izin Usaha Spesifik</h3>
          </div>
          <p className="legal-desc">
            Berdasarkan tipe usaha <strong>{result.usaha || 'Anda'}</strong>, ini adalah dokumen legalitas yang wajib disiapkan:
          </p>
          <ul className="legal-checklist">
            <li>
              <div className="checkbox-dummy checked"><CheckCircle size={16} /></div>
              <div className="legal-info">
                <strong>NIB (Nomor Induk Berusaha)</strong>
                <span>Daftar gratis via OSS.go.id</span>
              </div>
            </li>
            <li>
              <div className="checkbox-dummy pending"><AlertTriangle size={16} /></div>
              <div className="legal-info">
                <strong>Sertifikasi Halal (Opsional/Wajib F&B)</strong>
                <span>Krusial untuk menggaet segmen mayoritas.</span>
              </div>
            </li>
            <li>
              <div className="checkbox-dummy pending"><AlertTriangle size={16} /></div>
              <div className="legal-info">
                <strong>SPP-IRT / BPOM</strong>
                <span>Khusus jika memproduksi bahan kemasan.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* OPTIONAL LAYANAN TAMBAHAN (ADDITIONAL SERVICES) */}
      {(result.needsSupplier || result.needsAgent || result.realEstatePartner) && (
        <div className="optional-services-container">
          <h2 className="section-title" style={{ marginTop: '50px' }}>Layanan Tambahan Terpilih</h2>
          <div className="optional-services-grid">
            {result.needsSupplier && (
              <div className="glass optional-card">
                <div className="optional-header p-blue">
                  <MapIcon size={20} /> <h3>Supplier Terdekat</h3>
                </div>
                <div className="supplier-map-placeholder">
                  <div className="map-dummy">
                    <MapPin size={24} color="#ef4444" className="map-pin" />
                    <span>Radius 5 KM</span>
                  </div>
                </div>
                <ul className="supplier-list">
                  <li><strong>1. Supplier {result.supplier} A</strong><span>1.2 KM</span></li>
                  <li><strong>2. Agen {result.usaha} Grosir</strong><span>2.8 KM</span></li>
                  <li><strong>3. Pusat Distribusi Utama</strong><span>4.5 KM</span></li>
                </ul>
              </div>
            )}

            {result.needsAgent && (
              <div className="glass optional-card">
                <div className="optional-header p-green">
                  <Headset size={20} /> <h3>Survei Lapangan</h3>
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
                    <Calendar size={16} /> Jadwalkan
                  </button>
                </div>
              </div>
            )}

            {result.realEstatePartner && (
              <div className="glass optional-card">
                <div className="optional-header p-yellow">
                  <Home size={20} /> <h3>Listing Real Estate</h3>
                </div>
                <div className="listing-content">
                  <p>Rekomendasi properti sesuai budget <b>{formatCurrency(result.budget)}</b>.</p>
                  <div className="property-item">
                    <Building size={16} />
                    <div>
                      <strong>Kios Strategis {result.lokasi}</strong>
                      <span className="price">Sesuai Budget</span>
                    </div>
                  </div>
                  <div className="property-item">
                    <Building size={16} />
                    <div>
                      <strong>Ruko Komersial (Parkir Luas)</strong>
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
      <h2 className="section-title" style={{ marginTop: '50px' }}>Dashboard Analytics</h2>
      
      <div className="charts-grid">
        <div className="chart-card glass">
          <div className="chart-header">
            <TrendingUp size={18} className="p-green" /> <h4>Prediksi Profit (Juta Rp)</h4>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={3} dot={{ fill: '#4ade80', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass">
          <div className="chart-header">
            <Users size={18} className="p-blue" /> <h4>Estimasi Traffic (Harian)</h4>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass">
          <div className="chart-header">
            <PieChartIcon size={18} className="p-yellow" /> <h4>Analisis Kompetitor</h4>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#fff', fontSize: '13px' }} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* EXCLUSIVE BONUS SECTION */}
      <h2 className="section-title" style={{ marginTop: '50px' }}>Bonus & Ekosistem Terbatas</h2>
      <div className="bonus-section-wrapper glass">
        <div className="bonus-header">
          <Gift size={28} className="p-yellow" />
          <div className="bonus-header-text">
            <h3>Bonus Bundling (Senilai Rp 350.000)</h3>
            <p>Terima kasih telah menggunakan sistem kelayakan GeoProfit. Silakan klaim bonus eksklusif Anda di bawah ini.</p>
          </div>
        </div>
        
        <div className="bonus-cards-grid">
          <div className="bonus-card">
            <div className="bonus-icon"><FileText size={24} /></div>
            <div className="bonus-info">
              <h4>Kalkulator BEP & Cash Flow (Excel)</h4>
              <p>Template otomatis untuk menghitung titik impas (Break Even Point) harian.</p>
              <button className="btn-claim-bonus">Download Excel</button>
            </div>
          </div>
          
          <div className="bonus-card">
            <div className="bonus-icon"><Smartphone size={24} /></div>
            <div className="bonus-info">
              <h4>Akses VIP Komunitas Pengusaha</h4>
              <p>Grup Telegram eksklusif untuk networking dan info supplier murah.</p>
              <button className="btn-claim-bonus telegram-btn">Join Grup Telegram</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResultsDashboard;
