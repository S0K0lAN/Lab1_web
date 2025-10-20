const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Настройка CORS
app.use(cors());
app.use(express.json());
app.use(express.static('Lab1_web'));

// Подключение к базе данных MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root', // замените на ваше имя пользователя MySQL
    password: '12450888Kk', // замените на ваш пароль MySQL
    database: 'siteweblab' // замените на имя вашей базы данных
});

// Проверка подключения к базе данных
connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }
    console.log('Подключение к базе данных MySQL установлено');
});

// API для получения всех услуг
app.get('/api/services', (req, res) => {
    const query = `
        SELECT s.*, t.name as trainer_name 
        FROM services_catalogue s 
        LEFT JOIN trainers t ON s.trainer_id = t.id
        ORDER BY s.name
    `;
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Ошибка при получении данных:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
            return;
        }
        res.json(results);
    });
});

// API для поиска услуг по букве
app.get('/api/services/search/:letter', (req, res) => {
    const letter = req.params.letter.toUpperCase();
    const query = `
        SELECT s.*, t.name as trainer_name 
        FROM services_catalogue s 
        LEFT JOIN trainers t ON s.trainer_id = t.id
        WHERE s.name LIKE ?
        ORDER BY s.name
    `;
    
    connection.query(query, [`${letter}%`], (err, results) => {
        if (err) {
            console.error('Ошибка при поиске:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
            return;
        }
        res.json(results);
    });
});

// API для получения услуги по ID
app.get('/api/services/:id', (req, res) => {
    const serviceId = req.params.id;
    const query = `
        SELECT s.*, t.name as trainer_name 
        FROM services_catalogue s 
        LEFT JOIN trainers t ON s.trainer_id = t.id
        WHERE s.id = ?
    `;
    
    connection.query(query, [serviceId], (err, results) => {
        if (err) {
            console.error('Ошибка при получении услуги:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
            return;
        }
        
        if (results.length === 0) {
            res.status(404).json({ error: 'Услуга не найдена' });
            return;
        }
        
        res.json(results[0]);
    });
});

// API для получения всех тренеров
app.get('/api/trainers', (req, res) => {
    const query = 'SELECT * FROM trainers ORDER BY name';
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Ошибка при получении тренеров:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
            return;
        }
        res.json(results);
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Что-то пошло не так!' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Откройте браузер и перейдите по адресу: http://localhost:3000');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nЗавершение работы сервера...');
    connection.end();
    process.exit(0);
});
