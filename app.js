// Weather App JavaScript
document.getElementById('loading').classList.remove('hidden');
document.getElementById('Weather').innerHTML = '';
document.getElementById('error').innerHTML = '';

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const apikey = 'af13ee5cee745958827e7a38ee0cee33'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    if (!city) {
        document.getElementById('error').innerHTML = 'Please enter a city name.';
        document.getElementById('loading').classList.add('hidden');
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();


        if (data.cod !== 200) {
            console.error("API Error:", data);
            document.getElementById('error').innerHTML = 'City not found. Please try again.';
            return;
        }

        const weatherHTML = `
            <h2 class="text-xl font-bold">${data.name}, ${data.sys.country}</h2>
            <p class="text-lg">${data.weather[0].description}</p>
            <p class="text-lg">${Math.round(data.main.temp)}°C</p>
        `;
        document.getElementById('Weather').innerHTML = weatherHTML;

        changeBackgroundColor(data.weather[0].main);

        updateSearchHistory(data.name);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('error').innerHTML = 'An error occurred while fetching the weather data.';
    } finally {
        // Hide loading state
        document.getElementById('loading').classList.add('hidden');
    }
}

function changeBackgroundColor(weatherCondition) {
    const WeatherApp = document.getElementById('WeatherApp');
    WeatherApp.className = ''; // Clear previous background classes
    if (weatherCondition.includes("Rain")) {
        WeatherApp.classList.add('bg-blue-400');
    } else if (weatherCondition.includes("Clouds")) {
        WeatherApp.classList.add('bg-gray-400');
    } else if (weatherCondition.includes("Clear")) {
        WeatherApp.classList.add('bg-yellow-400');
    } else {
        WeatherApp.classList.add('bg-green-400');
    }
}

function updateSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        renderHistory();
    }
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        historyList.appendChild(li);
    });
}

// Load history on page load
window.onload = renderHistory;
    

