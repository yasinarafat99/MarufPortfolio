// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Home';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* মূল ওয়েবসাইট */}
        <Route path="/" element={<Portfolio />} />
        
        {/* অ্যাডমিন প্যানেল */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}