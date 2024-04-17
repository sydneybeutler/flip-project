import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import StudyPage from './pages/StudyPage';
import CreateOrEditFlashcard from './pages/CreateOrEditFlashcard';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const showHeader = location.pathname !== '/login';

  return (
    <div className="appContainer">
      {showHeader && <Header />}
      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/study/:setId" element={<StudyPage />} />
          <Route path="/create" element={<CreateOrEditFlashcard />} />
          <Route path="/edit/:id" element={<CreateOrEditFlashcard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
