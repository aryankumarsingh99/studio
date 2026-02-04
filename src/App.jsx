import './App.css';

import ScrollToTopButton from './Components/ScrollToTopButton';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Services from './Pages/Services.jsx';
import Book from './Pages/Book.jsx';
import Contact from './Pages/Contact.jsx';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Profile from './Pages/Profile';
import Admin from './Pages/Admin';

const footerLinks = {
  Account: ["Saving", "Join Accounts", "Crypto", "Freelance", "Commodities"],
  Help: ["Customer Help", "Community", "Blog"],
  Finance: ["Cards", "Locked Accounts", "Payment"],
  Company: ["About Us", "Contact", "Sustainability", "Career"],
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <>
      {!isAdminRoute && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        {/* No /signup route here! */}
      </Routes>
      {!isAdminRoute && <ScrollToTopButton />}
      {!isAdminRoute && <Footer footerLinks={footerLinks} />}
    </>
  );
}

function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWithRouter;