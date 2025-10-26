// src/pages/Home.js
import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/login', { username, password });
      if (res.data.success) {
        alert('Вход успешен! Добро пожаловать, ' + username + '!');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content home-page">
      <div className="hero-section">
        <div className="container hero-content">
          <h1>FitClub</h1>
          <p className="hero-subtitle">Стань сильнее. Стань лучше. Стань с нами.</p>
          <div className="hero-features">
            <div className="feature">Современные залы</div>
            <div className="feature">Профессиональные тренеры</div>
            <div className="feature">Гибкие абонементы</div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="login-container">
          <div className="login-card">
            <h2>Вход в аккаунт</h2>
            <p className="login-subtitle">Войдите, чтобы получить доступ к личному кабинету</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Логин</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Введите логин"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Введите пароль"
                  disabled={loading}
                />
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Вход...' : 'Войти'}
              </button>
            </form>

            <p className="register-link">
              Нет аккаунта? <a href="/register">Зарегистрироваться</a>
            </p>
          </div>
        </div>

        <div className="cookie-notice">
          <p>
            Мы используем cookies для улучшения работы сайта.{' '}
            <a href="/privacy" target="_blank">Подробнее</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;