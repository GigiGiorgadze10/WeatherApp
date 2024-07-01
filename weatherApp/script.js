document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'ef8f93326309546a501aa37c3ff952a1'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log('Fetching weather data for:', city);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data received:', data);
            if (data.cod === 200) {
                document.getElementById('weatherInfo').classList.add('visible');
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

                const iconCode = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
                document.getElementById('weatherIcon').src = iconUrl;
                document.getElementById('weatherIcon').alt = data.weather[0].description;
            } else {
                document.getElementById('weatherInfo').classList.remove('visible');
                document.getElementById('cityName').textContent = 'City not found';
                document.getElementById('temperature').textContent = '';
                document.getElementById('description').textContent = '';
                document.getElementById('humidity').textContent = '';
                document.getElementById('windSpeed').textContent = '';
                document.getElementById('weatherIcon').src = '';
                document.getElementById('weatherIcon').alt = '';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherInfo').classList.remove('visible');
            document.getElementById('cityName').textContent = 'Error fetching data';
            document.getElementById('temperature').textContent = '';
            document.getElementById('description').textContent = '';
            document.getElementById('humidity').textContent = '';
            document.getElementById('windSpeed').textContent = '';
            document.getElementById('weatherIcon').src = '';
            document.getElementById('weatherIcon').alt = '';
        });
});
