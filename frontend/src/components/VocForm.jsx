import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import './LocationAnalyzer.css'; // Reuse styles

const VocForm = ({ onVocSubmit }) => {
  const [vocData, setVocData] = useState({
    customerNeed: '',
    functionalResponse: '',
    dysfunctionalResponse: '',
    importance: '3'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setVocData({ ...vocData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vocData.customerNeed || !vocData.functionalResponse || !vocData.dysfunctionalResponse) {
      alert("Harap isi kuesioner Kano dengan lengkap!");
      return;
    }

    // Decide Kano Category based on responses (Simplified logical mapping)
    let kanoCategory = 'Menarik';
    if (vocData.functionalResponse === 'Suka' && vocData.dysfunctionalResponse === 'Tidak Suka') {
      kanoCategory = 'Kinerja'; // Linear
    } else if (vocData.functionalResponse === 'Harus Ada' && vocData.dysfunctionalResponse === 'Tidak Suka') {
      kanoCategory = 'Fungsional'; // Must-be
    } else if (vocData.functionalResponse === 'Suka' && vocData.dysfunctionalResponse === 'Netral') {
      kanoCategory = 'Menarik'; // Attractive
    } else {
      kanoCategory = 'Disfungsional'; // Indifferent / Reverse
    }

    onVocSubmit({
      ...vocData,
      kanoCategory,
    });
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="voc" style={{ padding: '80px 20px', minHeight: '80vh' }}>
      <h2 className="section-title">Voice of Customer & Kano Form</h2>
      
      <div className="glass analyzer-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
          
          <div className="form-group">
            <label>Kebutuhan Pelanggan (Customer Need)</label>
            <div className="input-wrapper">
              <MessageSquare className="input-icon" size={20} />
              <input 
                type="text" 
                name="customerNeed"
                placeholder="Contoh: Tempat parkir luas dan aman"
                value={vocData.customerNeed}
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
                value={vocData.importance}
                onChange={handleChange}
                style={{ width: '100%', marginLeft: '10px' }}
              />
              <span style={{ padding: '0 15px', fontWeight: 'bold' }}>{vocData.importance}</span>
            </div>
          </div>

          <div className="form-group">
            <label>Respon Fungsional (Jika fitur ini ADA)</label>
            <div className="input-wrapper">
              <ThumbsUp className="input-icon" size={20} />
              <select name="functionalResponse" value={vocData.functionalResponse} onChange={handleChange}>
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
              <select name="dysfunctionalResponse" value={vocData.dysfunctionalResponse} onChange={handleChange}>
                <option value="">Pilih Perasaan Pelanggan</option>
                <option value="Suka">Saya Suka (I like it)</option>
                <option value="Harus Ada">Sudah Seharusnya (It must be that way)</option>
                <option value="Netral">Saya Netral (I am neutral)</option>
                <option value="Toleransi">Saya Bisa Mentoleransi (I can live with it)</option>
                <option value="Tidak Suka">Saya Tidak Suka (I dislike it)</option>
              </select>
            </div>
          </div>

        </form>

        <button 
          className="btn btn-primary analyze-btn" 
          onClick={handleSubmit}
          style={{ marginTop: '30px' }}
        >
          Evaluasi Kano & HoQ Framework
        </button>

        {submitted && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(74, 222, 128, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle color="#4ade80" />
            <p style={{ margin: 0 }}>Data VOC berhasil dianalisis! Framework Kano di-set ke: <strong>{vocData.kanoCategory || 'Menarik'}</strong>.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VocForm;
