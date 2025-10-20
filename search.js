// search.js - JavaScript для поиска услуг фитнес-клуба "Пирамида" с подключением к MySQL

// Глобальная переменная для хранения данных из базы
let servicesCatalog = {};

// Функция для загрузки всех услуг из базы данных
async function loadAllServices() {
    try {
        const response = await fetch('/api/services');
        const services = await response.json();
        
        // Группируем услуги по первой букве для совместимости со старым кодом
        const groupedServices = {};
        services.forEach(service => {
            const firstLetter = service.name.charAt(0);
            if (!groupedServices[firstLetter]) {
                groupedServices[firstLetter] = [];
            }
            // Преобразуем данные из базы в формат, совместимый со старым кодом
            groupedServices[firstLetter].push({
                name: service.name,
                description: service.description,
                duration: service.duration,
                price: service.price,
                trainer: service.trainer_name || 'Не указан',
                image: service.image_path,
                details: service.details,
                schedule: JSON.parse(service.schedule || '[]')
            });
        });
        
        servicesCatalog = groupedServices;
        console.log('Данные загружены из базы данных:', servicesCatalog);
        
        return servicesCatalog;
    } catch (error) {
        console.error('Ошибка при загрузке услуг:', error);
        return {};
    }
}

// Функция для выполнения поиска
async function performSearch(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы
    
    // Получаем значение из поля ввода
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim().toUpperCase();
    
    // Валидация
    if (!validateSearchInput(searchQuery)) {
        return false;
    }
    
    try {
        // Выполняем поиск через API
        const response = await fetch(`/api/services/search/${searchQuery}`);
        const results = await response.json();
        
        // Преобразуем результаты в формат, совместимый со старым кодом
        const formattedResults = results.map(service => ({
            name: service.name,
            description: service.description,
            duration: service.duration,
            price: service.price,
            trainer: service.trainer_name || 'Не указан',
            image: service.image_path,
            details: service.details,
            schedule: JSON.parse(service.schedule || '[]')
        }));
    
    // Отображаем результаты
        displayResults(formattedResults, searchQuery);
    } catch (error) {
        console.error('Ошибка при поиске:', error);
        showValidationError('Ошибка при загрузке данных');
    }
    
    return false; // Предотвращаем отправку формы
}

// Функция валидации ввода
function validateSearchInput(query) {
    const searchInput = document.getElementById('searchInput');
    
    // Очищаем предыдущие сообщения об ошибках
    clearValidationMessages();
    
    if (!query) {
        showValidationError('Пожалуйста, введите букву для поиска');
        searchInput.focus();
        return false;
    }
    
    if (query.length > 1) {
        showValidationError('Введите только одну букву');
        searchInput.focus();
        return false;
    }
    
    if (!/^[А-ЯЁ]$/.test(query)) {
        showValidationError('Введите только русскую букву');
        searchInput.focus();
        return false;
    }
    
    return true;
}

// Функция поиска услуг (теперь работает с загруженными данными)
function searchServices(query) {
    return servicesCatalog[query] || [];
}

// Функция отображения результатов
function displayResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    const resultsContent = document.getElementById('resultsContent');
    const searchQuerySpan = document.getElementById('searchQuery');
    
    // Скрываем все блоки результатов
    searchResults.style.display = 'none';
    noResults.style.display = 'none';
    
    if (results.length === 0) {
        // Показываем сообщение об отсутствии результатов
        searchQuerySpan.textContent = query;
        noResults.style.display = 'block';
    } else {
        // Показываем найденные услуги
        resultsContent.innerHTML = generateResultsHTML(results, query);
        searchResults.style.display = 'block';
    }
}

// Функция генерации HTML для результатов
function generateResultsHTML(results, query) {
    let html = `<h6 class="text-muted mb-3">Найдено услуг на букву "${query}": ${results.length}</h6>`;
    
    results.forEach((service, index) => {
        html += `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${service.image}" class="img-fluid rounded" alt="${service.name}" style="max-height: 150px;">
                        </div>
                        <div class="col-md-9">
                            <h5 class="card-title text-primary">${service.name}</h5>
                            <p class="card-text">${service.description}</p>
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Длительность:</strong> ${service.duration}</p>
                                    <p><strong>Стоимость:</strong> ${service.price}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Тренер:</strong> ${service.trainer}</p>
                                    <p><strong>Подробности:</strong> ${service.details}</p>
                                </div>
                            </div>
                            <div class="mt-2">
                                <h6>Программа занятия:</h6>
                                <ul class="list-unstyled">
                                    ${service.schedule.map(item => `<li><i class="bi bi-check-circle text-success"></i> ${item}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="mt-3">
                                <button class="btn btn-outline-primary btn-sm" onclick="showServiceDetails('${service.name}')">
                                    Подробнее
                                </button>
                                <button class="btn btn-success btn-sm" onclick="bookService('${service.name}')">
                                    Записаться
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    return html;
}

// Функция показа детальной информации об услуге
function showServiceDetails(serviceName) {
    alert(`Детальная информация о услуге "${serviceName}" будет показана в модальном окне или на отдельной странице.`);
}

// Функция записи на услугу
function bookService(serviceName) {
    alert(`Запись на услугу "${serviceName}" будет осуществлена через форму регистрации.`);
}

// Функция показа сообщения об ошибке валидации
function showValidationError(message) {
    const searchInput = document.getElementById('searchInput');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-2';
    errorDiv.id = 'validationError';
    errorDiv.innerHTML = `<i class="bi bi-exclamation-triangle"></i> ${message}`;
    
    searchInput.parentNode.appendChild(errorDiv);
    searchInput.classList.add('is-invalid');
}

// Функция очистки сообщений валидации
function clearValidationMessages() {
    const existingError = document.getElementById('validationError');
    if (existingError) {
        existingError.remove();
    }
    
    const searchInput = document.getElementById('searchInput');
    searchInput.classList.remove('is-invalid');
}

// Функция для автозаполнения популярных букв
function setupQuickSearch() {
    const quickSearchDiv = document.createElement('div');
    quickSearchDiv.className = 'mt-3';
    quickSearchDiv.innerHTML = `
        <h6>Быстрый поиск:</h6>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="quickSearch('Ф')">Ф</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="quickSearch('Й')">Й</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="quickSearch('П')">П</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="quickSearch('Б')">Б</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="quickSearch('К')">К</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="quickSearch('С')">С</button>
        </div>
    `;
    
    document.querySelector('.card-body').appendChild(quickSearchDiv);
}

// Функция быстрого поиска
async function quickSearch(letter) {
    document.getElementById('searchInput').value = letter;
    try {
        const response = await fetch(`/api/services/search/${letter}`);
        const results = await response.json();
        
        // Преобразуем результаты в формат, совместимый со старым кодом
        const formattedResults = results.map(service => ({
            name: service.name,
            description: service.description,
            duration: service.duration,
            price: service.price,
            trainer: service.trainer_name || 'Не указан',
            image: service.image_path,
            details: service.details,
            schedule: JSON.parse(service.schedule || '[]')
        }));
        
        displayResults(formattedResults, letter);
    } catch (error) {
        console.error('Ошибка при быстром поиске:', error);
        showValidationError('Ошибка при загрузке данных');
    }
}

// Функция для автоматического заполнения каталога из базы данных
async function populateCatalog() {
    const catalogContainer = document.getElementById('catalogServices');
    if (!catalogContainer) return;
    
    try {
        const response = await fetch('/api/services');
        const services = await response.json();
    
    let html = '';
    
        // Проходим по всем услугам
        services.forEach(service => {
            html += `
                <li class="catalog-item">
                    <a href="fitness.html" onclick="showServiceInFitness('${service.name}')">
                        <img src="${service.image_path}" alt="${service.name}" width="100" height="80" style="object-fit: cover;">
                        <div class="service-info">
                            <h4>${service.name}</h4>
                            <p class="service-price">${service.price}</p>
                            <p class="service-duration">${service.duration}</p>
                        </div>
                    </a>
                </li>
            `;
    });
    
    // Добавляем ссылку на поиск
    html += `
        <li class="catalog-item">
            <a href="search.html">
                <img src="gym_icon.jpg" alt="Найти больше" width="100" height="80" style="object-fit: cover;">
                <div class="service-info">
                    <h4>Найти больше услуг</h4>
                    <p class="service-price">Поиск по букве</p>
                    <p class="service-duration">Все программы</p>
                </div>
            </a>
        </li>
    `;
    
    catalogContainer.innerHTML = html;
    } catch (error) {
        console.error('Ошибка при загрузке каталога:', error);
    }
}

// Функция для показа услуги на странице фитнеса
function showServiceInFitness(serviceName) {
    // Сохраняем название услуги в localStorage для передачи на страницу фитнеса
    localStorage.setItem('selectedService', serviceName);
}

// Функция для получения информации об услуге по названию из базы данных
async function getServiceByName(serviceName) {
    try {
        const response = await fetch('/api/services');
        const services = await response.json();
        const service = services.find(s => s.name === serviceName);
        
        if (service) {
            return {
                name: service.name,
                description: service.description,
                duration: service.duration,
                price: service.price,
                trainer: service.trainer_name || 'Не указан',
                image: service.image_path,
                details: service.details,
                schedule: JSON.parse(service.schedule || '[]')
            };
    }
    return null;
    } catch (error) {
        console.error('Ошибка при получении услуги:', error);
        return null;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async function() {
    // Загружаем данные из базы данных
    await loadAllServices();
    
    // Проверяем, находимся ли мы на странице каталога
    if (document.getElementById('catalogServices')) {
        await populateCatalog();
    }
    
    // Проверяем, находимся ли мы на странице поиска
    if (document.getElementById('searchInput')) {
        setupQuickSearch();
        
        // Добавляем обработчик для очистки результатов при изменении поля ввода
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function() {
            if (this.value.length === 0) {
                document.getElementById('searchResults').style.display = 'none';
                document.getElementById('noResults').style.display = 'none';
            }
        });
        
        // Добавляем обработчик для поиска при вводе одной буквы
        searchInput.addEventListener('input', async function() {
            const value = this.value.trim().toUpperCase();
            if (value.length === 1 && /^[А-ЯЁ]$/.test(value)) {
                try {
                    const response = await fetch(`/api/services/search/${value}`);
                    const results = await response.json();
                    
                    // Преобразуем результаты в формат, совместимый со старым кодом
                    const formattedResults = results.map(service => ({
                        name: service.name,
                        description: service.description,
                        duration: service.duration,
                        price: service.price,
                        trainer: service.trainer_name || 'Не указан',
                        image: service.image_path,
                        details: service.details,
                        schedule: JSON.parse(service.schedule || '[]')
                    }));
                    
                    displayResults(formattedResults, value);
                } catch (error) {
                    console.error('Ошибка при поиске:', error);
                }
            }
        });
    }
    
    // Проверяем, находимся ли мы на странице фитнеса и есть ли выбранная услуга
    if (document.getElementById('fitnessContent')) {
        const selectedService = localStorage.getItem('selectedService');
        if (selectedService) {
            await updateFitnessPage(selectedService);
            localStorage.removeItem('selectedService'); // Очищаем после использования
        }
    }
});

// Функция для обновления страницы фитнеса с выбранной услугой
async function updateFitnessPage(serviceName) {
    const service = await getServiceByName(serviceName);
    if (!service) return;
    
    const fitnessContent = document.getElementById('fitnessContent');
    if (!fitnessContent) return;
    
    fitnessContent.innerHTML = `
        <h1>${service.name}</h1>
        <a href="full_${service.image}" target="_blank">
            <img src="${service.image}" alt="${service.name}" width="300" height="200" class="product-image">
        </a>
        <h2 class="product-title">Краткое описание товара</h2>
        <p class="product-short-description">${service.description}</p>
        <h2 class="product-title">Характеристики</h2>
        <ul class="characteristics-list">
            <li>Длительность: ${service.duration}</li>
            <li>Стоимость: ${service.price}</li>
            <li>Тренер: ${service.trainer}</li>
        </ul>
        <h2 class="product-title">Подробное описание</h2>
        <p class="product-detailed-description">${service.details}</p>
        <ol type="1">
            ${service.schedule.map(item => `<li>${item}</li>`).join('')}
        </ol>
    `;
}
