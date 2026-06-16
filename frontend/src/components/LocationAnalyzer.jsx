import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Users, Wallet, Truck, Navigation, CheckCircle, ArrowRight, ArrowLeft, Map, Headset } from 'lucide-react';
import './LocationAnalyzer.css';

const LocationAnalyzer = ({ onAnalyze, isAnalyzing }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    modalAwal: '',
    usaha: '',
    lokasi: '',
    budget: '',
    target: '',
    supplier: '',
    aksesibilitas: '',
    needsSupplier: false,
    needsAgent: false,
    realEstatePartner: false
  });

  const [constraints, setConstraints] = useState(null);

  const calculateConstraints = (modal) => {
    let cons = { usaha: '', budget: '', target: '', supplier: '', aksesibilitas: '', suggestion: '' };
    if (!modal) return cons;
    
    const m = Number(modal);
    if (m < 5000000) {
      cons.usaha = "Street Food";
      cons.budget = Math.floor(m * 0.3).toString();
      cons.target = "Mahasiswa & Warga Lokal";
      cons.supplier = "Pasar induk";
      cons.aksesibilitas = "Masuk gang";
      cons.suggestion = "Sewa ruko belum memungkinkan, disarankan booth/gerobak di area padat.";
    } else if (m < 25000000) {
      cons.usaha = "Laundry";
      cons.budget = Math.floor(m * 0.25).toString();
      cons.target = "Pekerja & Mahasiswa";
      cons.supplier = "Distributor";
      cons.aksesibilitas = "Pinggir jalan utama";
      cons.suggestion = "Kapasitas modal cukup untuk sewa kios menengah dengan trafik stabil.";
    } else {
      cons.usaha = "Cafe";
      cons.budget = Math.floor(m * 0.2).toString();
      cons.target = "Profesional & Keluarga";
      cons.supplier = "Pabrik";
      cons.aksesibilitas = "Parkir luas";
      cons.suggestion = "Modal sangat memadai untuk sewa properti komersial premium.";
    }
    return cons;
  };

  const handleModalChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, modalAwal: val });
    if (val && Number(val) > 0) {
      const cons = calculateConstraints(val);
      setConstraints(cons);
    } else {
      setConstraints(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleNextToStep2 = () => {
    if (!formData.modalAwal) {
      alert("Harap masukkan modal awal Anda!");
      return;
    }
    if (constraints) {
      setFormData(prev => ({
        ...prev,
        usaha: prev.usaha || constraints.usaha,
        budget: prev.budget || constraints.budget,
        target: prev.target || constraints.target,
        supplier: prev.supplier || constraints.supplier,
        aksesibilitas: prev.aksesibilitas || constraints.aksesibilitas
      }));
    }
    setStep(2);
  };

  const handleNextToStep3 = () => {
    if (!formData.usaha || !formData.lokasi || !formData.budget || !formData.target || !formData.supplier || !formData.aksesibilitas) {
      alert("Harap lengkapi semua parameter analisis lokasi!");
      return;
    }
    setStep(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <section id="analisis">
      <h2 className="section-title">Analisis Lokasi AI</h2>
      
      <div className="glass analyzer-card staging-wrapper">
        <div className="stepper">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-circle">1</div>
            <span>Modal Utama</span>
          </div>
          <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-circle">2</div>
            <span>Parameter Bisnis</span>
          </div>
          <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-circle">3</div>
            <span>Layanan Tambahan</span>
          </div>
        </div>

        {step === 1 && (
          <div className="step-content animate-fade-in">
            <h3 className="step-title">Masukkan Modal Utama Anda</h3>
            <p className="step-desc">AI kami akan menggunakan modal Anda sebagai <b>core logic</b> untuk menentukan batasan (constraint) dan parameter bisnis yang paling optimal secara otomatis.</p>
            
            <div className="form-group modal-input-group">
              <label>Modal Awal (Rp)</label>
              <div className="input-wrapper">
                <Wallet className="input-icon" size={24} />
                <input 
                  type="number"
                  name="modalAwal"
                  className="large-input"
                  placeholder="Contoh: 15000000"
                  value={formData.modalAwal}
                  onChange={handleModalChange}
                />
              </div>
            </div>

            {constraints && (
              <div className="constraint-box animate-fade-in">
                <h4><CheckCircle size={18} /> Prediksi AI Berdasarkan Modal Anda:</h4>
                <p><strong>Limitasi/Saran:</strong> {constraints.suggestion}</p>
                <div className="constraint-tags">
                  <span className="tag">Rekomendasi Usaha: <b>{constraints.usaha}</b></span>
                  <span className="tag">Estimasi Budget Sewa: <b>Rp {Number(constraints.budget).toLocaleString("id-ID")}</b></span>
                  <span className="tag">Target Akses: <b>{constraints.aksesibilitas}</b></span>
                </div>
              </div>
            )}

            <button className="btn btn-primary next-btn" onClick={handleNextToStep2}>
              Lanjutkan <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content animate-fade-in">
            <h3 className="step-title">Validasi Parameter Bisnis</h3>
            <p className="step-desc">Parameter di bawah ini telah diisi otomatis oleh AI berdasarkan modal Anda. Sesuaikan jika diperlukan.</p>

            <form className="form-grid">
              <div className="form-group">
                <label>Jenis Usaha</label>
                <div className="input-wrapper">
                  <Search className="input-icon" size={20} />
                  <select name="usaha" value={formData.usaha} onChange={handleChange}>
                    <option value="">Pilih Jenis Usaha</option>
                    <optgroup label="Makanan & Minuman">
                      <option value="Cafe">Cafe</option>
                      <option value="Restoran">Restoran</option>
                      <option value="Warung Makan">Warung Makan</option>
                      <option value="Street Food">Street Food</option>
                      <option value="Bakery">Bakery</option>
                    </optgroup>
                    <optgroup label="Fashion">
                      <option value="Fashion">Fashion</option>
                      <option value="Hijab Store">Hijab Store</option>
                      <option value="Thrift Shop">Thrift Shop</option>
                    </optgroup>
                    <optgroup label="Jasa">
                      <option value="Laundry">Laundry</option>
                      <option value="Barbershop">Barbershop</option>
                      <option value="Salon">Salon</option>
                      <option value="Jasa Printing">Jasa Printing</option>
                    </optgroup>
                    <optgroup label="Retail">
                      <option value="Minimarket">Minimarket</option>
                    </optgroup>
                    <optgroup label="Digital & Lainnya">
                      <option value="Klinik">Klinik</option>
                      <option value="Co-Working Space">Co-Working Space</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Kota / Lokasi Target</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" size={20} />
                  <input 
                    type="text" 
                    name="lokasi"
                    placeholder="Contoh: Bogor"
                    value={formData.lokasi}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Budget Sewa Maksimal (Rp)</label>
                <div className="input-wrapper">
                  <DollarSign className="input-icon" size={20} />
                  <input 
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Target Pasar</label>
                <div className="input-wrapper">
                  <Users className="input-icon" size={20} />
                  <input 
                    type="text"
                    name="target"
                    value={formData.target}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tipe Supplier Utama</label>
                <div className="input-wrapper">
                  <Truck className="input-icon" size={20} />
                  <select name="supplier" value={formData.supplier} onChange={handleChange}>
                    <option value="">Pilih Ketersediaan Supplier</option>
                    <option value="Pasar induk">Pasar Induk</option>
                    <option value="Distributor">Distributor / Agen</option>
                    <option value="Pabrik">Pabrik / Produsen</option>
                    <option value="Lainnya">Lainnya / Mandiri</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tingkat Aksesibilitas</label>
                <div className="input-wrapper">
                  <Navigation className="input-icon" size={20} />
                  <select name="aksesibilitas" value={formData.aksesibilitas} onChange={handleChange}>
                    <option value="">Pilih Tingkat Aksesibilitas</option>
                    <option value="Pinggir jalan utama">Pinggir jalan utama</option>
                    <option value="Masuk gang">Masuk gang / Area Perumahan</option>
                    <option value="Parkir luas">Kawasan Komersial (Parkir Luas)</option>
                    <option value="Pusat perbelanjaan">Dalam Mall / Pusat Perbelanjaan</option>
                  </select>
                </div>
              </div>
            </form>

            <div className="step-actions">
              <button className="btn btn-outline" onClick={() => setStep(1)}>
                <ArrowLeft size={20} /> Kembali
              </button>
              <button className="btn btn-primary" onClick={handleNextToStep3}>
                Lanjutkan <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content animate-fade-in">
            <h3 className="step-title">Opsional & Layanan Tambahan</h3>
            <p className="step-desc">Pilih layanan tambahan yang dapat membantu proses pembukaan usaha Anda.</p>

            <div className="options-grid">
              <label className="option-card">
                <input type="checkbox" name="needsSupplier" checked={formData.needsSupplier} onChange={handleChange} />
                <div className="option-content">
                  <Map className="option-icon p-blue" size={28} />
                  <div>
                    <h4>Bantu Cari Supplier Terdekat</h4>
                    <p>Tampilkan peta perhitungan jarak dengan minimal 3 supplier terdekat dari lokasi Anda.</p>
                  </div>
                </div>
              </label>

              <label className="option-card">
                <input type="checkbox" name="needsAgent" checked={formData.needsAgent} onChange={handleChange} />
                <div className="option-content">
                  <Headset className="option-icon p-green" size={28} />
                  <div>
                    <h4>Jadwalkan Agent di Lapangan</h4>
                    <p>Agent kami akan mensurvei langsung untuk memastikan lokasi benar-benar tersedia dan sesuai.</p>
                  </div>
                </div>
              </label>

              <label className="option-card">
                <input type="checkbox" name="realEstatePartner" checked={formData.realEstatePartner} onChange={handleChange} />
                <div className="option-content">
                  <MapPin className="option-icon p-yellow" size={28} />
                  <div>
                    <h4>Integrasi Real Estate Partner</h4>
                    <p>Gunakan database dari partner lahan/real estate kami untuk target lokasi eksklusif.</p>
                  </div>
                </div>
              </label>
            </div>

            <div className="step-actions">
              <button className="btn btn-outline" onClick={() => setStep(2)}>
                <ArrowLeft size={20} /> Kembali
              </button>
              <button 
                className="btn btn-primary analyze-btn" 
                onClick={handleSubmit}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
                    Menganalisis...
                  </>
                ) : (
                  'Mulai Analisis AI'
                )}
              </button>
            </div>

            {isAnalyzing && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>AI sedang memproses big data lokasi dan menghitung metrik kelayakan...</p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default LocationAnalyzer;
