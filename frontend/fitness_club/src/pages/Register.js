// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',         // добавлено
    consent: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.consent) {
      setError('Необходимо согласие на обработку данных');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/register', formData);
      alert('Регистрация успешна!');
      setFormData({ username: '', password: '', email: '', phone: '', consent: false });
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка сервера');
    }
  };

  return (
    <div className="page-content">
      <div className="register-container">
        <div className="register-card">
          <h1>Регистрация</h1>
          <p className="subtitle">Присоединяйся к FitClub</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleRegister} className="register-form">
            <div className="form-group">
              <label htmlFor="username">Логин</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Введите логин"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@fitclub.ru"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (900) 000-00-00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Минимум 6 символов"
                minLength="6"
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                />
                <span className="custom-checkbox"></span>
                Я согласен с <a href="/privacy" target="_blank" rel="noreferrer">обработкой персональных данных</a>
              </label>
            </div>

            <button type="submit" className="register-btn">
              Зарегистрироваться
            </button>
          </form>

          <p className="login-link">
            Уже есть аккаунт? <a href="/">Войти</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;