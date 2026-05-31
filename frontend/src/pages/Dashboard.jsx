import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts';
import { Target, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

const shortTermData = [
  { name: 'Skor Kano', value: 85 },
  { name: 'Trafik Pengunjung', value: 90 },
  { name: 'Efisiensi OpEx', value: 40 },
  { name: 'Stabilitas Jaringan', value: 75 },
  { name: 'Keterjangkauan Sewa', value: 95 },
];

const longTermData = [
  { name: 'Skor Kano', value: 95 },
  { name: 'Trafik Pengunjung', value: 70 },
  { name: 'Efisiensi OpEx', value: 85 },
  { name: 'Stabilitas Jaringan', value: 95 },
  { name: 'Keterjangkauan Sewa', value: 60 },
];

const roiProjection = [
  { month: 'Jan', shortTerm: 4000, longTerm: 2400 },
  { month: 'Feb', shortTerm: 5000, longTerm: 2500 },
  { month: 'Mar', shortTerm: 6500, longTerm: 3200 },
  { month: 'Apr', shortTerm: 8000, longTerm: 4500 },
  { month: 'Mei', shortTerm: 9500, longTerm: 6000 },
  { month: 'Jun', shortTerm: 11000, longTerm: 9000 },
  { month: 'Jul', shortTerm: 11500, longTerm: 14000 },
];

const Dashboard = () => {
  const [strategy, setStrategy] = useState('short-term');
  const radarData = strategy === 'short-term' ? shortTermData : longTermData;
  const recommendedLocation = strategy === 'short-term' ? 'Lokasi A (Kios Pusat Kota)' : 'Lokasi B (Pusat Suburban)';

  return (
    <div className="animate-fade-in" style={{ background: '#071126', color: '#ffffff', minHeight: '100vh', width: '100%', padding: '60px 40px 100px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Header Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: '500', marginBottom: '8px', color: 'white' }}>Dasbor Analitik BI ROI</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>Optimasi Parameter Multi-Objektif & Resolusi Konflik</p>
          </div>
          
          <div className="glass-panel" style={{ display: 'flex', padding: '6px', borderRadius: '12px', background: 'rgba(13, 27, 56, 0.85)' }}>
            <button 
              onClick={() => setStrategy('short-term')}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                background: strategy === 'short-term' ? '#1e88e5' : 'transparent',
                color: strategy === 'short-term' ? 'white' : '#94a3b8',
                transition: 'all 0.3s ease',
                boxShadow: strategy === 'short-term' ? '0 4px 12px rgba(30, 136, 229, 0.4)' : 'none'
              }}
            >
              Maksimalkan ROI Jangka Pendek
            </button>
            <button 
              onClick={() => setStrategy('long-term')}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                background: strategy === 'long-term' ? '#10b981' : 'transparent',
                color: strategy === 'long-term' ? 'white' : '#94a3b8',
                transition: 'all 0.3s ease',
                boxShadow: strategy === 'long-term' ? '0 4px 12px rgba(16, 185, 129, 0.4)' : 'none'
              }}
            >
              Penetrasi Pasar Jangka Panjang
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <MetricCard title="Situs Rekomendasi Utama" value={recommendedLocation} icon={<Target color="#1e88e5" size={24} />} />
          <MetricCard title="Bobot Mentah HoQ" value={strategy === 'short-term' ? '8,432' : '9,120'} icon={<Zap color="#10b981" size={24} />} />
          <MetricCard title="Proyeksi OpEx (Thn 1)" value={strategy === 'short-term' ? 'Rp 45M' : 'Rp 120M'} icon={<TrendingUp color="#f59e0b" size={24} />} />
          <MetricCard title="Tingkat Risiko Konflik" value={strategy === 'short-term' ? 'Sedang' : 'Tinggi'} icon={<AlertTriangle color="#f43f5e" size={24} />} />
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '32px', background: 'rgba(13, 27, 56, 0.85)' }}>
            <h3 style={{ marginBottom: '24px', fontWeight: '600', color: 'white', fontSize: '1.2rem' }}>Matriks Prioritas Teknis (Radar)</h3>
            <div style={{ height: '350px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Radar name="Skor Prioritas" dataKey="value" stroke={strategy === 'short-term' ? '#1e88e5' : '#10b981'} fill={strategy === 'short-term' ? '#1e88e5' : '#10b981'} fillOpacity={0.4} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f1c3f', borderColor: '#1e88e5', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '32px', background: 'rgba(13, 27, 56, 0.85)' }}>
            <h3 style={{ marginBottom: '24px', fontWeight: '600', color: 'white', fontSize: '1.2rem' }}>Proyeksi Pertumbuhan Pendapatan (Model DCF)</h3>
            <div style={{ height: '350px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiProjection} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorShort" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e88e5" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#1e88e5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLong" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f1c3f', borderColor: '#10b981', borderRadius: '8px' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="shortTerm" stroke="#1e88e5" strokeWidth={3} fillOpacity={1} fill="url(#colorShort)" name="Strategi Jangka Pendek" />
                  <Area type="monotone" dataKey="longTerm" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorLong)" name="Strategi Jangka Panjang" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon }) => (
  <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '12px' }}>
      {icon}
    </div>
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>{title}</p>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{value}</h3>
    </div>
  </div>
);

export default Dashboard;
