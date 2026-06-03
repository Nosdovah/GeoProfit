import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Users, Wallet, Truck, Navigation } from 'lucide-react';
import './LocationAnalyzer.css';

const LocationAnalyzer = ({ onAnalyze, isAnalyzing }) => {
  const [formData, setFormData] = useState({
    usaha: '',
    lokasi: '',
    budget: '',
    target: '',
    modalAwal: '',
    supplier: '',
    aksesibilitas: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.usaha || !formData.lokasi || !formData.budget || !formData.target || !formData.modalAwal || !formData.supplier || !formData.aksesibilitas) {
      alert("Harap isi semua 7 variabel analisis terlebih dahulu!");
      return;
    }
    onAnalyze(formData);
  };

  return (
    <section id="analisis">
      <h2 className="section-title">Analisis Lokasi AI</h2>
      
      <div className="glass analyzer-card">
        <form onSubmit={handleSubmit} className="form-grid">
          
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
                  <option value="Sepatu & Sneaker">Sepatu & Sneaker</option>
                  <option value="Aksesoris">Aksesoris</option>
                </optgroup>
                <optgroup label="Jasa">
                  <option value="Laundry">Laundry</option>
                  <option value="Barbershop">Barbershop</option>
                  <option value="Salon">Salon</option>
                  <option value="Fotocopy">Fotocopy</option>
                  <option value="Service Gadget">Service Gadget</option>
                  <option value="Jasa Printing">Jasa Printing</option>
                </optgroup>
                <optgroup label="Retail">
                  <option value="Retail">Retail</option>
                  <option value="Minimarket">Minimarket</option>
                  <option value="Toko Elektronik">Toko Elektronik</option>
                  <option value="Toko Kosmetik">Toko Kosmetik</option>
                </optgroup>
                <optgroup label="Digital">
                  <option value="Digital Agency">Digital Agency</option>
                  <option value="Content Creator Studio">Content Creator Studio</option>
                  <option value="Gaming Center">Gaming Center</option>
                  <option value="Co-Working Space">Co-Working Space</option>
                </optgroup>
                <optgroup label="Kesehatan">
                  <option value="Apotek">Apotek</option>
                  <option value="Klinik">Klinik</option>
                  <option value="Gym & Fitness">Gym & Fitness</option>
                </optgroup>
                <optgroup label="Pendidikan">
                  <option value="Bimbingan Belajar">Bimbingan Belajar</option>
                  <option value="Kursus Bahasa">Kursus Bahasa</option>
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
            <label>Budget Sewa</label>
            <div className="input-wrapper">
              <DollarSign className="input-icon" size={20} />
              <input 
                type="number"
                name="budget"
                placeholder="Contoh: 5000000"
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
                placeholder="Mahasiswa, pekerja, keluarga"
                value={formData.target}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Modal Awal (Rp)</label>
            <div className="input-wrapper">
              <Wallet className="input-icon" size={20} />
              <input 
                type="number"
                name="modalAwal"
                placeholder="Contoh: 15000000"
                value={formData.modalAwal}
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

        {isAnalyzing && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>AI sedang memproses big data lokasi dan menghitung metrik kelayakan...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationAnalyzer;
