// search.js - JavaScript для поиска услуг фитнес-клуба "Пирамида"

// Многомерный массив с товарами и услугами
const servicesCatalog = {
    "Ф": [
        {
            name: "Фитнес-программа",
            description: "Индивидуальные фитнес-программы для похудения и набора мышечной массы",
            duration: "60 мин",
            price: "1500 руб/занятие",
            trainer: "Иван Петров",
            image: "fitness_program.gif",
            details: "Программа включает кардио, силовые упражнения и стретчинг. Подходит для начинающих и продвинутых.",
            schedule: ["Разминка (10 мин)", "Основная тренировка (40 мин)", "Заминка (10 мин)"]
        },
        {
            name: "Функциональная тренировка",
            description: "Тренировка, направленная на развитие функциональных способностей организма",
            duration: "60 мин",
            price: "1200 руб/занятие",
            trainer: "Мария Соколова",
            image: "step.jpg",
            details: "Улучшает координацию, баланс, силу и выносливость. Идеально для повседневной активности.",
            schedule: ["Разминка (10 мин)", "Функциональные упражнения (35 мин)", "Растяжка (15 мин)"]
        }
    ],
    "Й": [
        {
            name: "Йога",
            description: "Древняя практика для гармонии тела и духа",
            duration: "90 мин",
            price: "1000 руб/занятие",
            trainer: "Екатерина Волкова",
            image: "thumb_yoga.jpg",
            details: "Классическая хатха-йога для развития гибкости, силы и внутреннего спокойствия.",
            schedule: ["Медитация (10 мин)", "Асаны (60 мин)", "Шавасана (20 мин)"]
        },
        {
            name: "Йога для начинающих",
            description: "Мягкое введение в мир йоги",
            duration: "75 мин",
            price: "800 руб/занятие",
            trainer: "Анна Петрова",
            image: "thumb_yoga.jpg",
            details: "Базовые асаны и дыхательные техники для тех, кто только начинает заниматься йогой.",
            schedule: ["Дыхательные упражнения (15 мин)", "Базовые асаны (45 мин)", "Релаксация (15 мин)"]
        }
    ],
    "П": [
        {
            name: "Пилатес",
            description: "Система упражнений для укрепления мышц кора",
            duration: "60 мин",
            price: "1100 руб/занятие",
            trainer: "Ольга Морозова",
            image: "step.jpg",
            details: "Контролируемые движения для развития силы, гибкости и координации.",
            schedule: ["Разминка (10 мин)", "Упражнения пилатес (40 мин)", "Растяжка (10 мин)"]
        }
        ,
        {
            name: "Персональная тренировка",
            description: "Индивидуальная работа с тренером под ваши цели",
            duration: "60 мин",
            price: "2000 руб/занятие",
            trainer: "Иван Петров",
            image: "step.jpg",
            details: "Персональный план, корректировка техники, быстрая обратная связь.",
            schedule: ["Анализ целей (5 мин)", "Тренировка (50 мин)", "Рекомендации (5 мин)"]
        }
    ],
    "Б": [
        {
            name: "Бокс",
            description: "Боевое искусство для развития силы и выносливости",
            duration: "60 мин",
            price: "1300 руб/занятие",
            trainer: "Сергей Козлов",
            image: "step.jpg",
            details: "Техника ударов, защита, работа с грушей и спарринг. Отлично снимает стресс.",
            schedule: ["Разминка (10 мин)", "Техника ударов (30 мин)", "Спарринг (20 мин)"]
        }
    ],
    "К": [
        {
            name: "Кардио-тренировка",
            description: "Интенсивная тренировка для сжигания калорий",
            duration: "45 мин",
            price: "900 руб/занятие",
            trainer: "Антон Смирнов",
            image: "step.jpg",
            details: "Высокоинтенсивные упражнения для улучшения работы сердечно-сосудистой системы.",
            schedule: ["Разминка (5 мин)", "Кардио-блок (35 мин)", "Заминка (5 мин)"]
        },
        {
            name: "Кроссфит",
            description: "Функциональная тренировка высокой интенсивности",
            duration: "60 мин",
            price: "1400 руб/занятие",
            trainer: "Дмитрий Иванов",
            image: "step.jpg",
            details: "Комплексные упражнения для развития всех физических качеств.",
            schedule: ["Разминка (10 мин)", "WOD (40 мин)", "Растяжка (10 мин)"]
        }
        ,
        {
            name: "Круговая тренировка",
            description: "Чередование станций для проработки всех групп мышц",
            duration: "50 мин",
            price: "1200 руб/занятие",
            trainer: "Мария Соколова",
            image: "step.jpg",
            details: "Высокая интенсивность, короткие паузы отдыха, отличная жиросжигающая нагрузка.",
            schedule: ["Разминка (10 мин)", "Станции (35 мин)", "Заминка (5 мин)"]
        }
    ],
    "С": [
        {
            name: "Силовая тренировка",
            description: "Тренировка с отягощениями для набора мышечной массы",
            duration: "75 мин",
            price: "1200 руб/занятие",
            trainer: "Иван Петров",
            image: "step.jpg",
            details: "Работа со свободными весами и тренажерами для развития силы и массы.",
            schedule: ["Разминка (10 мин)", "Силовые упражнения (55 мин)", "Растяжка (10 мин)"]
        },
        {
            name: "Стретчинг",
            description: "Растяжка для улучшения гибкости и расслабления",
            duration: "45 мин",
            price: "700 руб/занятие",
            trainer: "Елена Белова",
            image: "step.jpg",
            details: "Статические и динамические упражнения на растяжку всех групп мышц.",
            schedule: ["Разминка (5 мин)", "Растяжка (35 мин)", "Релаксация (5 мин)"]
        }
        ,
        {
            name: "Спиннинг",
            description: "Интенсивные велотренировки под музыку на станке",
            duration: "45 мин",
            price: "900 руб/занятие",
            trainer: "Алексей Романов",
            image: "step.jpg",
            details: "Имитируем подъемы, спуски и спринты. Отлично для выносливости.",
            schedule: ["Разминка (5 мин)", "Интервалы (35 мин)", "Заминка (5 мин)"]
        }
    ],
    "Т": [
        {
            name: "Танцы",
            description: "Танцевальные направления для развития координации",
            duration: "60 мин",
            price: "1000 руб/занятие",
            trainer: "Наталья Дмитриева",
            image: "step.jpg",
            details: "Латина, хип-хоп, джаз-фанк и другие современные танцевальные стили.",
            schedule: ["Разминка (10 мин)", "Изучение движений (40 мин)", "Танец (10 мин)"]
        }
        ,
        {
            name: "TRX-петли",
            description: "Функциональные упражнения с подвесными петлями",
            duration: "60 мин",
            price: "1300 руб/занятие",
            trainer: "Дмитрий Иванов",
            image: "step.jpg",
            details: "Работа с собственным весом, развивает стабилизаторы и силу корпуса.",
            schedule: ["Разминка (10 мин)", "Комплексы TRX (45 мин)", "Растяжка (5 мин)"]
        }
    ],
    "А": [
        {
            name: "Аэробика",
            description: "Ритмичные упражнения под музыку",
            duration: "50 мин",
            price: "800 руб/занятие",
            trainer: "Светлана Козлова",
            image: "step.jpg",
            details: "Классическая аэробика для улучшения работы сердца и легких.",
            schedule: ["Разминка (10 мин)", "Аэробная часть (30 мин)", "Заминка (10 мин)"]
        }
        ,
        {
            name: "Аквааэробика",
            description: "Низкоударная тренировка в воде для всех уровней",
            duration: "50 мин",
            price: "1000 руб/занятие",
            trainer: "Светлана Козлова",
            image: "images.jpeg",
            details: "Мягкая нагрузка на суставы, эффективное сжигание калорий, дренажный эффект.",
            schedule: ["Разогрев (10 мин)", "Водные комплексы (35 мин)", "Релакс (5 мин)"]
        }
    ]
    ,
    "З": [
        {
            name: "Зумба",
            description: "Танцевальная фитнес-программа под латинскую музыку",
            duration: "55 мин",
            price: "900 руб/занятие",
            trainer: "Наталья Дмитриева",
            image: "step.jpg",
            details: "Весело, энергично и эффективно для жиросжигания.",
            schedule: ["Разминка (10 мин)", "Танцевальные связки (40 мин)", "Заминка (5 мин)"]
        }
    ]
    ,
    "М": [
        {
            name: "Массаж спортивный",
            description: "Восстановительный и тонусный массаж после нагрузок",
            duration: "60 мин",
            price: "1800 руб/сеанс",
            trainer: "Сергей Козлов",
            image: "images.jpeg",
            details: "Снятие мышечного напряжения, улучшение кровообращения и восстановления.",
            schedule: ["Диагностика (5 мин)", "Массаж (50 мин)", "Рекомендации (5 мин)"]
        }
    ]
};

// Функция для выполнения поиска
function performSearch(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы
    
    // Получаем значение из поля ввода
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim().toUpperCase();
    
    // Валидация
    if (!validateSearchInput(searchQuery)) {
        return false;
    }
    
    // Выполняем поиск
    const results = searchServices(searchQuery);
    
    // Отображаем результаты
    displayResults(results, searchQuery);
    
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

// Функция поиска услуг
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
function quickSearch(letter) {
    document.getElementById('searchInput').value = letter;
    const results = searchServices(letter);
    displayResults(results, letter);
}

// Функция для автоматического заполнения каталога
function populateCatalog() {
    const catalogContainer = document.getElementById('catalogServices');
    if (!catalogContainer) return;
    
    let html = '';
    
    // Проходим по всем категориям услуг
    Object.keys(servicesCatalog).forEach(letter => {
        servicesCatalog[letter].forEach(service => {
            html += `
                <li class="catalog-item">
                    <a href="fitness.html" onclick="showServiceInFitness('${service.name}')">
                        <img src="${service.image}" alt="${service.name}" width="100" height="80" style="object-fit: cover;">
                        <div class="service-info">
                            <h4>${service.name}</h4>
                            <p class="service-price">${service.price}</p>
                            <p class="service-duration">${service.duration}</p>
                        </div>
                    </a>
                </li>
            `;
        });
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
}

// Функция для показа услуги на странице фитнеса
function showServiceInFitness(serviceName) {
    // Сохраняем название услуги в localStorage для передачи на страницу фитнеса
    localStorage.setItem('selectedService', serviceName);
}

// Функция для получения информации об услуге по названию
function getServiceByName(serviceName) {
    for (let letter in servicesCatalog) {
        const service = servicesCatalog[letter].find(s => s.name === serviceName);
        if (service) return service;
    }
    return null;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, находимся ли мы на странице каталога
    if (document.getElementById('catalogServices')) {
        populateCatalog();
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
        searchInput.addEventListener('input', function() {
            const value = this.value.trim().toUpperCase();
            if (value.length === 1 && /^[А-ЯЁ]$/.test(value)) {
                const results = searchServices(value);
                displayResults(results, value);
            }
        });
    }
    
    // Проверяем, находимся ли мы на странице фитнеса и есть ли выбранная услуга
    if (document.getElementById('fitnessContent')) {
        const selectedService = localStorage.getItem('selectedService');
        if (selectedService) {
            updateFitnessPage(selectedService);
            localStorage.removeItem('selectedService'); // Очищаем после использования
        }
    }
});

// Функция для обновления страницы фитнеса с выбранной услугой
function updateFitnessPage(serviceName) {
    const service = getServiceByName(serviceName);
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
