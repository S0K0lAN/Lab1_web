// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Register from './pages/Register';
import Contacts from './pages/Contacts';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container navbar-content">
            <div className="logo">
              FitClub
            </div>
            <ul className="nav-links">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/catalog">Каталог</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
              <li><Link to="/register">Регистрация</Link></li>
            </ul>
          </div>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>

        <footer className="footer">
          <div className="container">
            <p>© 2025 FitClub. Все права защищены.</p>
            <p>Мы используем cookies для улучшения работы сайта.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;