let inputCityName = document.querySelector('#city-search');
let container = document.querySelector('.container');


inputCityName.addEventListener('input', () => {
    // when has input - make check text & propose a city list

    // validateText();
});

window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        console.log(e.code);
        // when input has veryfite city name --- NOT COMPLETE
        // send GET-request by openweatherAPI for this city --- ++
        if (inputCityName.value) {
            getUserCityWeather(inputCityName.value);
            inputCityName.value = '';
        }
    };
});

function getCityName() {

}

function getUserCityWeather(cityName) {
    let apiKey = 'd92da9be11a9ff634c79675141a4ba5a';
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

    fetchAsyncWeather(url)
        .then(data => {
            createCurrentWeatherArticle(data)
            inputCityName.setAttribute('placeholder', `${data.city.name},${data.city.country}`)
        })
};







function createCurrentWeatherArticle(weather) {
    let el = document.querySelector('.current_weather');
    if (el) el.remove();

    let date = new Date();

    let article = document.createElement('article');
    article.classList.add('current_weather');

    let content = `
            <div class="current__header">
                <h5 class="header--name">CURRENT WEATHER</h5>
                <h5 class="current__header--date" id="current_date">${date.toLocaleDateString()}</h5>
            </div>
            <div id="current-city">${weather.city.name},${weather.city.country}</div>
            <div class="current__content">
                <div>
                    <img id="weather-icon" src="http://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png" alt="alt">
                    <p id="main-weather">${weather.list[0].weather[0].main}</p>
                </div>
                <div id="main-temp">${Math.round(weather.list[0].main.temp)}C</div>
                <div>
                    <p>Sunrise: ${weather.city.sunrise}</p>
                    <p>Sunset: ${weather.city.sunset}</p>
                    <p>Day duration:${weather.city.sunset - weather.city.sunrise}</p>
                </div>
            </div>
    `;
    article.innerHTML = content;

    container.prepend(article);
}

function createErrorArticle(error) {
    let article = document.createElement('article');
    article.classList.add('error');

    let content = `
        <div class="error__inner">
            <img src="img/error.png" alt="alt">
            <h1>
                <strong>${error}</strong> could not be found. <br>
                Please enter a different location.
            </h1>
        </div>
    `;
    article.innerHTML = content;

    container.prepend(article);
}

