import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

// Components
import Home from './pages/Home';
import GenQRCode from './pages/GenQRCode';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genqrcode" element={<GenQRCode />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
