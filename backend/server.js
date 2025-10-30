// backend/server.js
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fitness_club_db',
  password: '1234567890',
  port: 5432,
});

app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка загрузки категорий' });
  }
});

app.get('/api/catalog', async (req, res) => {
  const { search, categoryId } = req.query;
  let query = 'SELECT * FROM products_services';
  let params = [];
  let conditions = [];

  if (search) {
    conditions.push(`name ILIKE $1 OR description ILIKE $1`);
    params.push(`%${search}%`);
  }
  if (categoryId) {
    conditions.push(`category_id = $${params.length + 1}`);
    params.push(categoryId);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка загрузки каталога' });
  }
});

app.get('/api/reviews/:productServiceId', async (req, res) => {
  const { productServiceId } = req.params;
  try {
    const result = await pool.query(
      `SELECT r.*, u.username 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.product_service_id = $1
       ORDER BY r.created_at DESC`,
      [productServiceId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка загрузки отзывов' });
  }
});

app.post('/api/reviews', async (req, res) => {
  const { userId, productServiceId, text, rating, consent } = req.body;
  try {
    await pool.query(
      'INSERT INTO reviews (user_id, product_service_id, text, rating, consent, moderated) VALUES ($1, $2, $3, $4, $5, true)',
      [userId, productServiceId, text, rating, consent]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка отправки отзыва' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password, email, phone, consent } = req.body;
  if (!consent) return res.status(400).json({ error: 'Согласие обязательно' });

  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, password_hash, email, consent, phone) VALUES ($1, $2, $3, $4, $5)',
      [username, hash, email, consent, phone]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Пользователь уже существует или ошибка сервера' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(400).json({ error: 'Неверный логин или пароль' });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: 'Неверный логин или пароль' });

    res.json({ success: true, user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка входа' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});