// Переключение темы
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const button = document.getElementById('theme-toggle');
    button.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// Фильтрация новостей на главной странице
function filterNews(category) {
    const newsSection = document.querySelector('.news');
    // Если выбрана рубрика "Все", применяем грид-раскладку
    if (category === 'all') {
        newsSection.classList.add('grid');
    } else {
        newsSection.classList.remove('grid');
    }
    document.querySelectorAll('.news-item').forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Обновление отображения новостей согласно выбранной категории (на главной)
function updateNewsDisplay(category) {
    // Обновляем активное состояние кнопок
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === category);
    });
    filterNews(category);
}

// Обработчик для кнопок фильтра (на главной и детальном просмотре)
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        // Если детальный просмотр открыт, скрываем его и показываем главную новостную ленту
        if (!document.getElementById('news-detail').classList.contains('hidden')) {
            document.getElementById('news-detail').classList.add('hidden');
            document.querySelector('.news').style.display = 'block';
        }
        updateNewsDisplay(category);
    });
});

// Обработчик для кнопок "Читать дальше" на главной странице
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const newsItem = button.closest('.news-item');
        openDetailView(newsItem);
    });
});

// Функция открытия детального просмотра новости
function openDetailView(newsItem) {
    // Получаем данные выбранной новости
    const title = newsItem.querySelector('h2').textContent;
    const mainImg = newsItem.querySelector('img').src;
    const fullArticleHTML = newsItem.querySelector('.full-article').innerHTML;
    const category = newsItem.getAttribute('data-category');

    // Заполняем блок детального просмотра
    const detailContent = document.getElementById('news-detail-content');
    detailContent.innerHTML = `
        <h1>${title}</h1>
        <img src="${mainImg}" alt="${title}">
        ${fullArticleHTML}
    `;

    // Формируем список рекомендуемых новостей той же рубрики
    const recommendedContainer = document.getElementById('recommended-news');
    recommendedContainer.innerHTML = '';
    const allNewsItems = document.querySelectorAll('.news-item');
    allNewsItems.forEach(item => {
        if (item.getAttribute('data-category') === category && item !== newsItem) {
            const recTitle = item.querySelector('h2').textContent;
            const recImg = item.querySelector('img').src;
            const recDiv = document.createElement('div');
            recDiv.className = 'recommended-item';
            recDiv.innerHTML = `
                <img src="${recImg}" alt="${recTitle}">
                <h4>${recTitle}</h4>
            `;
            recDiv.addEventListener('click', () => {
                openDetailView(item);
                window.scrollTo({top: 0, behavior: 'smooth'});
            });
            recommendedContainer.appendChild(recDiv);
        }
    });

    // Отображаем детальный просмотр и скрываем главную страницу новостей
    document.getElementById('news-detail').classList.remove('hidden');
    document.querySelector('.news').style.display = 'none';
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Обработчик для кнопки "Назад" в детальном просмотре
document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('news-detail').classList.add('hidden');
    document.querySelector('.news').style.display = 'block';
});
