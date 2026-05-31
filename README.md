# GeoProfitUMKM: Location Intelligence & Decision Support System (DSS)

GeoProfitUMKM adalah sistem pendukung keputusan (Decision Support System) berbasis kecerdasan spasial dan analisis keuangan untuk membantu pemilik bisnis (terutama UMKM) dalam menentukan lokasi ekspansi fisik atau pembukaan cabang baru secara ilmiah dan berbasis data.

Sistem ini mengawinkan analisis kualitatif dari suara pelanggan (**Kano Model & Quality Function Deployment/HoQ**) dengan data kuantitatif fisik (**GIS Spasial & Telemetri Jaringan**) dan finansial (**Discounted Cash Flow/DCF**).

---

## 🚀 Arsitektur & Teknologi (Tech Stack)

Sistem ini didesain menggunakan **Modular/Microservices Layered Architecture**:

1.  **Frontend (Presentation Layer)**:
    - **React + Vite**: Menghasilkan antarmuka pengguna SPA (_Single Page Application_) yang sangat cepat, interaktif, dan reaktif.
    - **Recharts & Lucide React**: Digunakan untuk menyajikan visualisasi data dinamis (seperti grafik matriks radar HoQ dan grafik finansial DCF).
2.  **Backend (Core Processing & Gateway)**:
    - **JavaScript (Node.js/Express)**: Bertindak sebagai API Gateway untuk melayani _input-output data_, penampung respon _Kano Model (VOC Ingestion)_, dan integrasi API geospasial serta _scraping_ data upah regional (OpEx Engine).
    - **Golang (Go)**: Mesin algoritmik berkinerja tinggi yang menangani komputasi berat, seperti komputasi matriks aljabar linier (**HoQ Weighting**), resolusi konflik multi-variabel (**Pareto "The Roof" Optimizer**), serta pengujian latensi paralel (**Network Telemetry**).
3.  **Database Layer**:
    - **PostgreSQL**: Menyimpan seluruh data relasional (Kano, VOC, hasil bobot HoQ).
    - **PostGIS**: Ekstensi geospasial untuk PostgreSQL guna memanipulasi koordinat geografis secara native.

---

## 📂 Struktur Direktori Proyek

```text
GeoProfitUMKM/
├── README.md             # Dokumentasi utama proyek
├── frontend/             # Antarmuka Pengguna (React + Vite)
│   ├── src/
│   │   ├── components/   # Komponen UI Reusable (Layout, Sidebar, dll)
│   │   ├── pages/        # Halaman visualisasi user flow
│   │   ├── App.jsx       # Konfigurasi routing frontend
│   │   ├── index.css     # Global styling theme (Glassmorphism Dark)
│   │   └── main.jsx      # Entrypoint React
│   └── package.json
├── backend-node/         # API Gateway & Data Ingestion (Node.js/Express)
│   ├── package.json
│   └── index.js
└── backend-go/           # Mesin Komputasi Matematika (Golang)
    ├── go.mod
    └── main.go
```

---

## ⚙️ Cara Menjalankan Proyek

### 1. Prasyarat Sistem

Pastikan perangkat Anda telah terinstal:

- [Node.js](https://nodejs.org/) (versi LTS terbaru)
- [Go (Golang)](https://go.dev/) (versi 1.18+)
- [PostgreSQL](https://www.postgresql.org/) (disertai ekstensi PostGIS)

---

### 2. Konfigurasi Frontend (React + Vite)

Navigasi ke direktori `frontend`, pasang dependensi, lalu jalankan server pengembangan:

```bash
cd frontend
npm install
npm run dev
```

Aplikasi frontend akan berjalan di **`http://localhost:5173/`**.

---

### 3. Konfigurasi Backend Node.js

Navigasi ke direktori `backend-node`, pasang dependensi, dan jalankan server API:

```bash
cd backend-node
npm install
node index.js
```

API Gateway akan melayani permintaan di port default (misal: **`http://localhost:8000`**).

---

### 4. Konfigurasi Backend Golang

Navigasi ke direktori `backend-go`, lalu jalankan aplikasi mesin algoritmik:

```bash
cd backend-go
go run main.go
```

Mesin hitung algoritma Go akan melayani komputasi aljabar linier dan optimasi di port backend yang dialokasikan (misal: port **`8080`**).

---

## 📈 Alur Pengguna (User Flow) Sistem

1.  **Tahap Ingestion (Kano & VOC)**: Pengguna memasukkan kriteria kebutuhan bisnis lokasi dan mengisi kuesioner respon Kano fungsional/disfungsional.
2.  **Tahap GIS & OpEx Pipeline**: Sistem menarik koordinat lokasi, memicu kalkulasi kepadatan populasi, jarak kompetitor, proyeksi biaya sewa, UMR setempat, serta pengujian telemetri latensi jaringan.
3.  **Tahap HoQ Matrix**: Menjalankan perkalian matriks non-linier skala 9-3-1 antara kebutuhan bisnis dan parameter teknis lokasi untuk menghasilkan _Raw Weight_.
4.  **Tahap The Roof Optimizer**: Mendeteksi trade-off parameter negatif menggunakan Matriks Korelasi Atap (The Roof Matrix). Visualisasi Pareto Efficiency Frontier dengan Scatter Chart interaktif membantu menyaring lokasi optimal (_sweet spot_ seperti Lokasi C) dari lokasi sub-optimal (_dominated_) yang tereliminasi akibat biaya tidak sebanding dengan performa.
5.  **Tahap BI Dashboard**: Menyajikan hasil akhir rekomendasi lokasi, grafik prioritas, dan memberikan kendali fleksibel kepada pengguna untuk beralih antara opsi **"Short-term ROI Maximizer"** dan **"Long-term Market Penetration Growth"**.

---

## 📘 Lisensi & Pengembangan

Dikembangkan dalam rangka perkuliahan **Innovation in Product and Process Design**, Semester 4 - Universitas Pakuan. Pemeliharaan kode diatur secara berkala untuk mendukung UMKM Indonesia menuju ekosistem digital berbasis keputusan sains data.
