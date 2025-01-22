import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarcodeComponent from './components/BarcodeComponent';
import Header from './components/Header';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
    
      <Header />

      <div className="">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<BarcodeComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
