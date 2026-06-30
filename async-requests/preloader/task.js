const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');
const API_URL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

function renderCurrencies(data) {
    itemsContainer.innerHTML = '';
    const valute = data.response.Valute;
    for (const key in valute) {
        if (valute.hasOwnProperty(key)) {
            const currency = valute[key];
            const item = document.createElement('div');
            item.className = 'item';
            item.innerHTML = `
                <div class="item__code">${currency.CharCode}</div>
                <div class="item__value">${currency.Value}</div>
                <div class="item__currency">руб.</div>
            `;
            itemsContainer.appendChild(item);
        }
    }
}

function hideLoader() {
    loader.classList.remove('loader_active');
}

function fetchData() {
    loader.classList.add('loader_active');

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            renderCurrencies(data);
            hideLoader();
        })
        .catch(error => {
            console.error('Ошибка:', error);
            hideLoader();
            itemsContainer.innerHTML = '<p>Не удалось загрузить курсы.</p>';
        });
}

document.addEventListener('DOMContentLoaded', fetchData);