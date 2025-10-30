// src/App.js
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import { AuthContext } from './AuthContext';

function NavbarContent() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container navbar-content">
      <div className="logo">FitClub</div>
      <ul className="nav-links">
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/catalog">Каталог</Link></li>
        <li><Link to="/contacts">Контакты</Link></li>
        <li><Link to="/register">Регистрация</Link></li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {!user ? (
          <Link to="/" className="nav-login-btn">Войти</Link>
        ) : (
          <div className="nav-auth">
            <button
              className="account-btn"
              onClick={() => setMenuOpen((s) => !s)}
              title={user.username}
              aria-label="Аккаунт"
            >
              {user.username ? user.username[0].toUpperCase() : 'U'}
            </button>
            {menuOpen && (
              <div className="account-menu">
                <button onClick={() => { setMenuOpen(false); navigate('/'); }}>Профиль</button>
                <button onClick={handleLogout}>Выйти</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <NavbarContent />
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
            <p>© 2025 Пирамида. Все права защищены.</p>
            <p>Мы используем cookies для улучшения работы сайта.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default AppWrapper;