// src/pages/Contacts.js
import React from 'react';

function Contacts() {
  return (
    <div className="page-content">
      <div className="container">
        <h1 className="page-title">Контакты</h1>

        <div className="contact-info">
          <div className="info-card">
            <h2>FitClub — Москва</h2>
            <p><strong>Адрес:</strong> ул. Тверская, 10, Москва, 125009</p>
            <p><strong>Телефон:</strong> <a href="tel:+74951234567">+7 (495) 123-45-67</a></p>
            <p><strong>Email:</strong> <a href="mailto:info@fitclub.ru">info@fitclub.ru</a></p>
            <p><strong>Часы работы:</strong> Пн–Пт: 6:00–23:00, Сб–Вс: 8:00–22:00</p>
          </div>
        </div>

        <div className="map-container">
          <h2>Как нас найти</h2>
          <div className="map-wrapper">
            <iframe
              title="FitClub на карте"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.299!2d37.617!3d55.755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5e9b8c8f8d%3A0x9c8f8e8d8e8f8e8d!2z0KLQtdC90YfQtdC90LjQvdGL!5e0!3m2!1sru!2sru!4v1630000000000"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="contact-footer">
          <p>Приезжайте в FitClub — ждём вас для здорового образа жизни!</p>
        </div>
      </div>
    </div>
  );
}

export default Contacts;