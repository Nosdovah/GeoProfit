import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, CheckCircle, Plus, Trash2, ArrowRight } from 'lucide-react';
import './LocationAnalyzer.css'; // Reuse styles

const VocForm = ({ onVocSubmit }) => {
  const [vocList, setVocList] = useState([]);
  const [currentVoc, setCurrentVoc] = useState({
    customerNeed: '',
    functionalResponse: '',
    dysfunctionalResponse: '',
    importance: '3'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setCurrentVoc({ ...currentVoc, [e.target.name]: e.target.value });
  };

  const calculateKanoCategory = (func, dysfunc) => {
    if (func === 'Suka' && dysfunc === 'Tidak Suka') return 'Kinerja'; 
    if (func === 'Harus Ada' && dysfunc === 'Tidak Suka') return 'Fungsional'; 
    if (func === 'Suka' && dysfunc === 'Netral') return 'Menarik'; 
    if (func === 'Suka' && dysfunc === 'Toleransi') return 'Menarik';
    if (func === 'Netral' && dysfunc === 'Netral') return 'Indifferent';
    return 'Disfungsional'; 
  };

  const handleAddVoc = (e) => {
    e.preventDefault();
    if (!currentVoc.customerNeed || !currentVoc.functionalResponse || !currentVoc.dysfunctionalResponse) {
      alert("Harap lengkapi semua field kuesioner Kano sebelum menambahkannya!");
      return;
    }

    const kanoCategory = calculateKanoCategory(currentVoc.functionalResponse, currentVoc.dysfunctionalResponse);

    setVocList([...vocList, { ...currentVoc, kanoCategory }]);
    setCurrentVoc({
      customerNeed: '',
      functionalResponse: '',
      dysfunctionalResponse: '',
      importance: '3'
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleRemoveVoc = (index) => {
    const newList = [...vocList];
    newList.splice(index, 1);
    setVocList(newList);
  };

  const handleFinalSubmit = () => {
    if (vocList.length === 0) {
      alert("Harap tambahkan minimal 1 Voice of Customer!");
      return;
    }

    // Aggregate the categories to show in the dashboard
    const summary = vocList.reduce((acc, curr) => {
      acc[curr.kanoCategory] = (acc[curr.kanoCategory] || 0) + 1;
      return acc;
    }, {});
    
    const summaryString = Object.entries(summary).map(([key, count]) => `${count} ${key}`).join(', ');

    onVocSubmit({
      vocList,
      kanoCategory: summaryString
    });
  };

  return (
    <section id="voc" style={{ padding: '80px 20px', minHeight: '80vh' }}>
      <h2 className="section-title">Voice of Customer & Kano Form</h2>
      
      <div className="glass analyzer-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* List of Added VoCs */}
        {vocList.length > 0 && (
          <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} color="#4ade80" /> Daftar VoC Terkumpul ({vocList.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {vocList.map((voc, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>{voc.customerNeed}</strong>
                    <span style={{ fontSize: '13px', color: 'var(--primary)' }}>Kategori Kano: {voc.kanoCategory} | Kepentingan: {voc.importance}/5</span>
                  </div>
                  <button onClick={() => handleRemoveVoc(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            
            <button 
              className="btn btn-primary" 
              onClick={handleFinalSubmit}
              style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
            >
              Analisis Keseluruhan <ArrowRight size={20} />
            </button>
          </div>
        )}

        <div style={{ borderTop: vocList.length > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none', paddingTop: vocList.length > 0 ? '30px' : '0' }}>
          <h3 style={{ color: '#fff', marginBottom: '20px' }}>{vocList.length > 0 ? 'Tambah Voice of Customer Baru' : 'Mulai Tambahkan Voice of Customer'}</h3>
          
          <form onSubmit={handleAddVoc} className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
            
            <div className="form-group">
              <label>Kebutuhan Pelanggan (Customer Need)</label>
              <div className="input-wrapper">
                <MessageSquare className="input-icon" size={20} />
                <input 
                  type="text" 
                  name="customerNeed"
                  placeholder="Contoh: Tempat parkir luas dan aman"
                  value={currentVoc.customerNeed}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tingkat Kepentingan (1-5)</label>
              <div className="input-wrapper">
                <input 
                  type="range" 
                  name="importance"
                  min="1" max="5"
                  value={currentVoc.importance}
                  onChange={handleChange}
                  style={{ width: '100%', marginLeft: '10px' }}
                />
                <span style={{ padding: '0 15px', fontWeight: 'bold' }}>{currentVoc.importance}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Respon Fungsional (Jika fitur ini ADA)</label>
              <div className="input-wrapper">
                <ThumbsUp className="input-icon" size={20} />
                <select name="functionalResponse" value={currentVoc.functionalResponse} onChange={handleChange}>
                  <option value="">Pilih Perasaan Pelanggan</option>
                  <option value="Suka">Saya Suka (I like it)</option>
                  <option value="Harus Ada">Sudah Seharusnya (It must be that way)</option>
                  <option value="Netral">Saya Netral (I am neutral)</option>
                  <option value="Toleransi">Saya Bisa Mentoleransi (I can live with it)</option>
                  <option value="Tidak Suka">Saya Tidak Suka (I dislike it)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Respon Disfungsional (Jika fitur ini TIDAK ADA)</label>
              <div className="input-wrapper">
                <ThumbsDown className="input-icon" size={20} />
                <select name="dysfunctionalResponse" value={currentVoc.dysfunctionalResponse} onChange={handleChange}>
                  <option value="">Pilih Perasaan Pelanggan</option>
                  <option value="Suka">Saya Suka (I like it)</option>
                  <option value="Harus Ada">Sudah Seharusnya (It must be that way)</option>
                  <option value="Netral">Saya Netral (I am neutral)</option>
                  <option value="Toleransi">Saya Bisa Mentoleransi (I can live with it)</option>
                  <option value="Tidak Suka">Saya Tidak Suka (I dislike it)</option>
                </select>
              </div>
            </div>

            <button 
              type="button"
              className="btn btn-outline" 
              onClick={handleAddVoc}
              style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              <Plus size={20} /> Tambah VoC Ini
            </button>

          </form>

          {submitted && (
            <div className="animate-fade-in" style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(74, 222, 128, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle color="#4ade80" size={20} />
              <p style={{ margin: 0, color: '#4ade80' }}>Data VoC berhasil ditambahkan ke daftar!</p>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};

export default VocForm;
