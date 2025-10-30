// src/pages/Catalog.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

function Catalog() {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [consent, setConsent] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories').then(res => setCategories(res.data));
    fetchItems();
  }, [search, categoryId]);

  const fetchItems = () => {
    axios.get('http://localhost:5000/api/catalog', { params: { search, categoryId } })
      .then(res => setItems(res.data));
  };

  const fetchReviews = (id) => {
    axios.get(`http://localhost:5000/api/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Только авторизованные пользователи могут оставлять отзывы');
    if (!consent) return alert('Необходимо согласие на обработку данных');
    if (!reviewText.trim()) return alert('Напишите отзыв');

    try {
      await axios.post('http://localhost:5000/api/reviews', {
        userId: user.id,
        productServiceId: selectedItem.id,
        text: reviewText,
        rating,
        consent
      });
      alert('Отзыв опубликован');
      setReviewText('');
      setConsent(false);
      fetchReviews(selectedItem.id);
    } catch (err) {
      alert(err.response?.data?.error || 'Ошибка отправки отзыва');
    }
  };

  const getInitial = (username) => username ? username[0].toUpperCase() : '?';

  return (
    <div className="page-content catalog-page">
      <div className="container">
        <h1 className="page-title">Каталог</h1>

        <div className="catalog-controls">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="category-select"
          >
            <option value="">Все категории</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="catalog-grid">
          {items.map(item => (
            <div
              key={item.id}
              className="catalog-card"
              onClick={() => {
                setSelectedItem(item);
                fetchReviews(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="card-image"></div>
              <div className="card-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="price">{item.price.toLocaleString()} ₽</div>
              </div>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div className="product-details">
            <div className="product-header">
              <h2>{selectedItem.name}</h2>
              <div className="product-price">{selectedItem.price.toLocaleString()} ₽</div>
            </div>
            <p className="product-desc">{selectedItem.description}</p>

            <div className="reviews-section">
              <h3>Отзывы ({reviews.length})</h3>
              {reviews.length === 0 ? (
                <p className="no-reviews">Пока нет отзывов. Напишите первый!</p>
              ) : (
                <div className="reviews-list">
                  {reviews.map(review => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="review-author">
                          <div className="author-avatar">
                            {getInitial(review.username)}
                          </div>
                          <div>
                            <div className="author-name">{review.username || 'Аноним'}</div>
                            <div className="review-date">
                              {new Date(review.created_at).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`star ${i < review.rating ? 'filled' : ''}`}
                            >
                              ⭑
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="review-text">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {user ? (
                <form onSubmit={handleReviewSubmit} className="review-form">
                  <h4>Оставить отзыв</h4>
                  <textarea
                    placeholder="Поделитесь впечатлениями..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                  <div className="form-row">
                    <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                      />
                      <span className="custom-checkbox"></span>
                      Согласие на обработку данных
                    </label>
                  </div>
                  <button type="submit" className="submit-review-btn">
                    Отправить отзыв
                  </button>
                  <p className="review-note">Спасибо за отзыв — он опубликован</p>
                </form>
              ) : (
                <div className="no-reviews">
                  Только авторизованные пользователи могут оставлять отзывы.
                  <div style={{ marginTop: 12 }}>
                    <a href="/" className="nav-login-btn">Войти</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalog;