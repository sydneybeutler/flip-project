import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Study from './pages/Study';
import CreateOrEditFlashcard from './pages/CreateOrEditFlashcard';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="appContainer">
        <Header />
        <main className="mainContent">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/study/:setId" element={<Study />} />
            <Route path="/create" element={<CreateOrEditFlashcard />} />
            <Route path="/edit/:id" element={<CreateOrEditFlashcard />} />
            {/* Additional routes */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
