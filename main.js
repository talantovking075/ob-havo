const apiKey = '3bcfab247d2495c80244a57d75cfb755';
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey;

const cityElement = document.querySelector('.city');
const dateElement = document.querySelector('.date');
const tempElement = document.querySelector('.gradus');
const conditionElement = document.querySelector('.holat');
const inputElement = document.querySelector('.input');

function updateDate() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    dateElement.textContent = `${dayName} ${day} ${month} ${year}`;
}

function fetchWeather(city) {
    fetch(`${apiBaseUrl}&q=${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            cityElement.textContent = data.name;
            tempElement.textContent = `${Math.round(data.main.temp)}℃`;
            conditionElement.textContent = data.weather[0].main;
            updateDate();
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            alert('Shahar topilmadi');
        });
}

fetchWeather('Tashkent');

inputElement.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && inputElement.value.trim() !== '') {
        fetchWeather(inputElement.value.trim());
        inputElement.value = '';
    }
});