import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LocationAnalyzer from './components/LocationAnalyzer';
import ResultsDashboard from './components/ResultsDashboard';
import Heatmap from './components/Heatmap';
import Footer from './components/Footer';
import VocForm from './components/VocForm';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [vocData, setVocData] = useState(null);
  const [pendingFormData, setPendingFormData] = useState(null);

  const runDemo = () => {
    setIsAnalyzing(true);
    setActiveTab('home');
    setResult(null);

    setTimeout(() => {
      const demoResult = {
        usaha: "Cafe & Coffee Shop",
        lokasi: "Jalan Sudirman, Bogor",
        budget: "25000000",
        target: "Mahasiswa & Profesional Muda",
        modalAwal: "150000000",
        supplier: "Distributor Biji Kopi Lokal",
        aksesibilitas: "Parkir Luas (Mobil & Motor)",
        strategi: "Aggressive Social Media Marketing",
        kano: "3 Kinerja, 2 Menarik",
        lokasiScore: 88,
        profitScore: 92,
        kompetitorScore: 65,
        roiScore: 85,
        modalScore: 90,
        aksesibilitasScore: 80,
        recommendation: "Sangat direkomendasikan. Area ini memiliki traffic pejalan kaki dan kendaraan yang tinggi pada jam pulang kerja.",
        pestle: {
          p: "Regulasi zonasi wilayah komersial sudah sesuai.",
          e: "Daya beli konsumen menengah ke atas cukup kuat untuk F&B.",
          s: "Budaya hangout sangat tinggi di demografi area ini.",
          t: "Adaptasi QRIS dan food delivery sangat tinggi.",
          l: "Perizinan BPOM dan sertifikasi halal perlu diprioritaskan.",
          en: "Sistem pengolahan limbah kafe tersedia dengan baik."
        },
        needsSupplier: true,
        needsAgent: true,
        realEstatePartner: true,
        profitData: [
          { name: 'Bulan 1', value: 15 }, { name: 'Bulan 2', value: 25 },
          { name: 'Bulan 3', value: 45 }, { name: 'Bulan 4', value: 60 }, { name: 'Bulan 5', value: 85 }
        ],
        trafficData: [
          { name: 'Sen', value: 150 }, { name: 'Sel', value: 160 },
          { name: 'Rab', value: 180 }, { name: 'Kam', value: 200 }, { name: 'Jum', value: 350 }, { name: 'Sab', value: 500 }
        ],
        roiData: [{ name: 'ROI', value: 85 }, { name: 'Cost', value: 15 }],
        pieData: [{ name: 'Rendah', value: 20 }, { name: 'Sedang', value: 50 }, { name: 'Tinggi', value: 30 }]
      };
      
      setResult(demoResult);
      setIsAnalyzing(false);

      setTimeout(() => {
        document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1500);
  };

  const handleAnalyze = (formData) => {
    setPendingFormData(formData);
    setActiveTab('voc');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVocSubmit = (data) => {
    setVocData(data);
    setIsAnalyzing(true);
    setActiveTab('home');
    setResult(null);

    // Simulate AI processing
    setTimeout(() => {
      const formData = pendingFormData || {};
      const { usaha, lokasi, budget, target, modalAwal, supplier, aksesibilitas, needsSupplier, needsAgent, realEstatePartner } = formData;
      const finalKano = data.kanoCategory;
      const strategi = "Long-term Market Penetration Growth"; // Default or calculated
      
      const lokasiScore = Math.floor(Math.random() * 30) + 70;
      const profitScore = Math.floor(Math.random() * 25) + 70;
      const kompetitorScore = Math.floor(Math.random() * 40) + 40;
      const roiScore = Math.floor(Math.random() * 25) + 70;
      const modalScore = Math.floor(Math.random() * 25) + 70;
      const supplierScore = Math.floor(Math.random() * 30) + 70;
      const aksesibilitasScore = Math.floor(Math.random() * 20) + 80;

      let pestle = {
        p: "Kebijakan pemerintah daerah terkait izin usaha UMKM di lokasi ini cukup mendukung.",
        e: "Pertumbuhan ekonomi lokal stabil, daya beli masyarakat terhadap produk " + usaha + " tergolong baik.",
        s: "Tren gaya hidup masyarakat sekitar sesuai dengan target pasar (" + target + ").",
        t: "Adaptasi pembayaran digital (QRIS) dan layanan pesan-antar online sangat tinggi di area ini.",
        l: "Regulasi zonasi wilayah komersial sudah sesuai, pastikan kelengkapan perizinan dasar (NIB).",
        en: "Kondisi lingkungan memadai, akses sanitasi dan pengelolaan limbah komersial tersedia dengan baik."
      };

      if(usaha === "Cafe" || usaha === "Coffee Shop" || usaha === "Restoran"){
        pestle.e = "Daya beli konsumen menengah ke atas cukup kuat untuk kuliner / F&B.";
        pestle.s = "Budaya nongkrong dan hangout sangat tinggi di demografi area ini.";
        pestle.en = "Perhatikan pengelolaan limbah sisa makanan dan ketersediaan air bersih.";
      } else if(usaha === "Fashion" || usaha === "Hijab Store" || usaha === "Thrift Shop"){
        pestle.s = "Kesadaran akan mode (fashion awareness) tinggi pada target demografi di lokasi ini.";
        pestle.e = "Potensi lonjakan penjualan sangat dipengaruhi oleh tren dan musim liburan/hari raya.";
      } else if(usaha === "Digital Agency" || usaha === "Co-Working Space" || usaha === "Content Creator Studio"){
        pestle.t = "Infrastruktur internet dan konektivitas broadband fiber optik sangat mendukung di area ini.";
        pestle.s = "Tingginya populasi profesional muda, freelancer, dan pekerja kreatif digital.";
      } else if(usaha === "Laundry" || usaha === "Barbershop" || usaha === "Salon"){
        pestle.e = "Permintaan layanan jasa kebutuhan sehari-hari sangat stabil terlepas dari kondisi makroekonomi.";
        pestle.en = "Sistem drainase yang baik diperlukan untuk pengolahan limbah air (khususnya laundry/salon).";
      }

      let recommendation = "";

      // Logika Usaha
      if(usaha === "Coffee Shop" || usaha === "Cafe"){
        recommendation = "Area dekat kampus dan perkantoran memiliki potensi tinggi untuk bisnis cafe/coffee shop.";
      } else if(usaha === "Restoran" || usaha === "Warung Makan" || usaha === "Street Food" || usaha === "Bakery"){
        recommendation = "Lokasi mall atau pusat kota sangat disarankan untuk usaha kuliner ini.";
      } else {
        recommendation = "Lokasi memiliki potensi stabil dengan tingkat kompetitor moderat.";
      }

      // Logika Modal Awal
      const modalNum = Number(modalAwal);
      if(modalNum < 5000000){
        recommendation += " Saran: Pilih area pinggiran yang hemat biaya operasional.";
      } else if(modalNum > 15000000){
        recommendation += " Saran: Pilih lokasi premium untuk menunjang ROI optimal.";
      } else {
        recommendation += " Saran: Pilih area berkembang dengan peluang pertumbuhan stabil.";
      }

      // Logika Akses & Supplier
      if (aksesibilitas === "Pinggir jalan utama" && supplier !== "Pabrik") {
        recommendation += " Kondisi ideal: Area jalan utama sangat dekat dengan jalur distribusi Anda.";
      } else {
        recommendation += " Kondisi ideal: Area padat penduduk yang mendukung layanan logistik online.";
      }

      // Generate Dynamic Chart Data based on scores
      const generatedProfitData = [
        { name: 'Bulan 1', value: Math.floor(profitScore * 0.1) },
        { name: 'Bulan 2', value: Math.floor(profitScore * 0.3) },
        { name: 'Bulan 3', value: Math.floor(profitScore * 0.5) },
        { name: 'Bulan 4', value: Math.floor(profitScore * 0.8) },
        { name: 'Bulan 5', value: Math.floor(profitScore * 1.2) }
      ];

      const generatedTrafficData = [
        { name: 'Sen', value: Math.floor(lokasiScore * 1.5) },
        { name: 'Sel', value: Math.floor(lokasiScore * 1.6) },
        { name: 'Rab', value: Math.floor(lokasiScore * 1.4) },
        { name: 'Kam', value: Math.floor(lokasiScore * 2.0) },
        { name: 'Jum', value: Math.floor(lokasiScore * 3.5) }
      ];

      const generatedPieData = [
        { name: 'Rendah', value: Math.max(10, 100 - kompetitorScore - 30) },
        { name: 'Sedang', value: 30 },
        { name: 'Tinggi', value: kompetitorScore }
      ];

      setResult({
        usaha, lokasi, budget, target, modalAwal, supplier, aksesibilitas, strategi, kano: finalKano,
        lokasiScore, profitScore, kompetitorScore, roiScore,
        modalScore, supplierScore, aksesibilitasScore,
        pestle, recommendation,
        needsSupplier, needsAgent, realEstatePartner,
        profitData: generatedProfitData,
        trafficData: generatedTrafficData,
        pieData: generatedPieData
      });
      setIsAnalyzing(false);

      // Scroll to dashboard after short delay to allow render
      setTimeout(() => {
        document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    }, 2500);
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} hasLocationData={!!pendingFormData} />
      <main>
        {activeTab === 'home' && (
          <>
            <Hero onDemoClick={runDemo} />
            <LocationAnalyzer onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            {result && <ResultsDashboard result={result} />}
            <Heatmap result={result} />
          </>
        )}
        {activeTab === 'voc' && (
          <VocForm onVocSubmit={handleVocSubmit} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
