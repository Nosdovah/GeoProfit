import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Heatmap.css';

// Komponen pembantu untuk memindahkan peta secara dinamis
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 2 });
  }, [center, map]);
  return null;
};

const Heatmap = ({ result }) => {
  // Default koordinat (Pusat Indonesia / Jakarta)
  const [center, setCenter] = useState([-6.200000, 106.816666]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (result && result.lokasi) {
      // Geocoding dengan Nominatim API
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${result.lokasi}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setCenter([lat, lon]);
            
            // Generate random hot zones (simulasi heatmap) di sekitar koordinat
            const newMarkers = [];
            const colors = ['#ef4444', '#eab308', '#4ade80']; // Merah, Kuning, Hijau
            for (let i = 0; i < 15; i++) {
              // Offset acak sekitar 0.05 derajat (~5km)
              const latOffset = (Math.random() - 0.5) * 0.1;
              const lonOffset = (Math.random() - 0.5) * 0.1;
              const radius = Math.floor(Math.random() * 20) + 10;
              const color = colors[Math.floor(Math.random() * colors.length)];
              
              newMarkers.push({
                id: i,
                position: [lat + latOffset, lon + lonOffset],
                radius,
                color
              });
            }
            setMarkers(newMarkers);
          }
        })
        .catch((err) => console.error("Geocoding failed:", err));
    } else {
      setMarkers([]); // Kosongkan marker jika tidak ada hasil
    }
  }, [result]);

  return (
    <section className="heatmap-section">
      <h2 className="section-title">Heatmap Area Bisnis</h2>
      <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'rgba(255,255,255,0.7)' }}>
        {result ? `Area: ${result.lokasi} (Hot zones: Potensi Kompetisi & Pasar)` : 'Peta akan terpusat ke lokasi pencarian Anda setelah analisis selesai.'}
      </p>
      <div className="heatmap-container glass" style={{ padding: 0, overflow: 'hidden' }}>
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '1rem', zIndex: 1 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles"
          />
          <MapUpdater center={center} />
          {markers.map((m) => (
            <CircleMarker
              key={m.id}
              center={m.position}
              radius={m.radius}
              pathOptions={{
                color: m.color,
                fillColor: m.color,
                fillOpacity: 0.4,
                weight: 0
              }}
            />
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Heatmap;
