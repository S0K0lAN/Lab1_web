-- sql/init_db.sql
DROP DATABASE IF EXISTS fitness_club_db;
CREATE DATABASE fitness_club_db;
\c fitness_club_db

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE products_services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    type VARCHAR(20) CHECK (type IN ('product', 'service')) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRINCIPAL KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    consent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_service_id INTEGER REFERENCES products_services(id),
    text TEXT NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    consent BOOLEAN DEFAULT FALSE,
    moderated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Данные
INSERT INTO categories (name, description) VALUES
('Абонементы', 'Различные виды абонементов на посещение'),
('Оборудование', 'Фитнес-оборудование для продажи'),
('Групповые тренировки', 'Йога, пилатес, зумба'),
('Персональные тренировки', 'Индивидуальные программы'),
('Дополнительные услуги', 'Массаж, сауна');

INSERT INTO products_services (name, description, price, category_id, type) VALUES
('Месячный абонемент', 'Доступ ко всем залам', 2000.00, 1, 'service'),
('Годовой безлимит', 'Неограниченное посещение на год', 18000.00, 1, 'service'),
('Йога для начинающих', '60 минут, 2 раза в неделю', 2500.00, 3, 'service'),
('Персональная тренировка', '60 минут с тренером', 3500.00, 4, 'service'),
('Коврик для йоги', 'Противоскользящий, 6 мм', 1200.00, 2, 'product');

INSERT INTO users (username, password_hash, email, consent) VALUES
('alex_fit', '$2b$10$z5x8K9vN7mPqRtY6uIoP/.hash1', 'alex@fitclub.ru', true);

INSERT INTO reviews (user_id, product_service_id, text, rating, consent, moderated) VALUES
(1, 1, 'Отличный абонемент! Хожу каждый день.', 5, true, true),
(1, 1, 'Зал чистый, тренеры приветливые.', 4, true, true);