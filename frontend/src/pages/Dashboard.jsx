import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts';
import { Target, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

const shortTermData = [
  { name: 'Kano Score', value: 85 },
  { name: 'Foot Traffic', value: 90 },
  { name: 'OpEx Efficiency', value: 40 },
  { name: 'Network Stability', value: 75 },
  { name: 'Rent Affordability', value: 95 },
];

const longTermData = [
  { name: 'Kano Score', value: 95 },
  { name: 'Foot Traffic', value: 70 },
  { name: 'OpEx Efficiency', value: 85 },
  { name: 'Network Stability', value: 95 },
  { name: 'Rent Affordability', value: 60 },
];

const roiProjection = [
  { month: 'Jan', shortTerm: 4000, longTerm: 2400 },
  { month: 'Feb', shortTerm: 5000, longTerm: 2500 },
  { month: 'Mar', shortTerm: 6500, longTerm: 3200 },
  { month: 'Apr', shortTerm: 8000, longTerm: 4500 },
  { month: 'May', shortTerm: 9500, longTerm: 6000 },
  { month: 'Jun', shortTerm: 11000, longTerm: 9000 },
  { month: 'Jul', shortTerm: 11500, longTerm: 14000 },
];

const Dashboard = () => {
  const [strategy, setStrategy] = useState('short-term');
  const radarData = strategy === 'short-term' ? shortTermData : longTermData;
  const recommendedLocation = strategy === 'short-term' ? 'Site A (Downtown Kiosk)' : 'Site B (Suburban Hub)';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>BI ROI Analytics Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Multi-Objective Parameter Optimization & Trade-off Resolution</p>
        </div>
        
        <div className="glass-panel" style={{ display: 'flex', padding: '4px', borderRadius: '12px' }}>
          <button 
            onClick={() => setStrategy('short-term')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              background: strategy === 'short-term' ? 'var(--primary)' : 'transparent',
              color: strategy === 'short-term' ? 'white' : 'var(--text-muted)',
              transition: 'all 0.3s ease'
            }}
          >
            Short-term ROI Maximizer
          </button>
          <button 
            onClick={() => setStrategy('long-term')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              background: strategy === 'long-term' ? 'var(--secondary)' : 'transparent',
              color: strategy === 'long-term' ? 'white' : 'var(--text-muted)',
              transition: 'all 0.3s ease'
            }}
          >
            Long-term Market Penetration
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <MetricCard title="Top Recommended Site" value={recommendedLocation} icon={<Target color="#6366f1" />} />
        <MetricCard title="HoQ Raw Weight" value={strategy === 'short-term' ? '8,432' : '9,120'} icon={<Zap color="#10b981" />} />
        <MetricCard title="Projected OpEx (Yr 1)" value={strategy === 'short-term' ? 'Rp 45M' : 'Rp 120M'} icon={<TrendingUp color="#f59e0b" />} />
        <MetricCard title="Trade-off Risk Level" value={strategy === 'short-term' ? 'Moderate' : 'High'} icon={<AlertTriangle color="#f43f5e" />} />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Technical Priority Matrix (Radar)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Radar name="Priority Score" dataKey="value" stroke={strategy === 'short-term' ? '#6366f1' : '#10b981'} fill={strategy === 'short-term' ? '#6366f1' : '#10b981'} fillOpacity={0.5} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border)', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#fff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Projected Revenue Growth (DCF Model)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roiProjection} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorShort" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLong" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Area type="monotone" dataKey="shortTerm" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorShort)" name="Short-term Strategy" />
                <Area type="monotone" dataKey="longTerm" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorLong)" name="Long-term Strategy" />
              </AreaChart>
            </ResponsiveContainer>
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
