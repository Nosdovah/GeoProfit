import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import VOCIngestion from './pages/VOCIngestion';
import LocationAggregation from './pages/LocationAggregation';
import HoQProcessor from './pages/HoQProcessor';
import TradeoffOptimizer from './pages/TradeoffOptimizer';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/voc" replace />} />
          <Route path="voc" element={<VOCIngestion />} />
          <Route path="location" element={<LocationAggregation />} />
          <Route path="hoq" element={<HoQProcessor />} />
          <Route path="optimizer" element={<TradeoffOptimizer />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
