let inputCityName = document.querySelector('#city-search');
let container = document.querySelector('.container');
getUserCityWeather('Odesa');


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
            createHourlyWeatherArticle(data)
            createFiveDayForecastArticle(data)
            createNearbyPlacesArticle(data)
            inputCityName.setAttribute('placeholder', `${data.city.name},${data.city.country}`)
            console.log(data);
        })
        .catch(error => createErrorArticle(error));
};



function createNearbyPlacesArticle(weather) {
    let el = document.querySelector('.nearby__weather');
    if (el) el.remove();

    let article = document.createElement('article');
    article.classList.add('nearby__weather');

    let content = `
        <div class="nearby__header">
            <h5 class="header--name">NEARBY PLACES</h5>
        </div>

        <div class="nearby__weather--cities">

            <div class="nearby__city">
                <p>Baladzhary</p>
                <img src="img/sun.png" alt="alt">
                <p>36 C</p>
            </div>

            <div class="nearby__city">
                <p>Ballov</p>
                <img src="img/sun.png" alt="alt">
                <p>29 C</p>
            </div>

            <div class="nearby__city">
                <p>Badamdar</p>
                <img src="img/sun.png" alt="alt">
                <p>36 C</p>
            </div>

            <div class="nearby__city">
                <p>Cherni Gorod</p>
                <img src="img/sun.png" alt="alt">
                <p>29 C</p>
            </div>

        </div>
    `;
    article.innerHTML = content;

    container.append(article);
}





function createFiveDayForecastArticle(weather) {
    let el = document.querySelector('.fivedays__weather');
    if (el) el.remove();

    let weatherData = weather.list;

    let article = document.createElement('article');
    article.classList.add('fivedays__weather');
    
    let fiveDays = weatherData.filter((item) => {
        return item.dt_txt.slice(10, 13) == 12; 
    })
    
    let content = ``;

    fiveDays.forEach(el => {
        content += `
            <div class="fivedays__item">
                <h4 class="item__day">${new Date(el.dt_txt).toLocaleDateString('en-US', {weekday: 'short'})}</h4>
                <p class="item__date">${new Date(el.dt_txt).toLocaleDateString('en-US', {month: 'short', day: '2-digit'})}</p>
                <img src="http://openweathermap.org/img/w/${el.weather[0].icon}.png" alt="alt">
                <h3 class="item__temp">${Math.round(el.main.temp)} C</h3>
                <p class="item__wind">${el.weather[0].description}</p>
            </div>
        `;
    });

    article.innerHTML = content;

    container.append(article);
}

function createHourlyWeatherArticle(weather) {
    let data = weather.list;

    let el = document.querySelector('.hourly__weather');
    if (el) el.remove();

    let article = document.createElement('article');
    article.classList.add('hourly__weather');

    let content = `
        <div class="hourly__header">
            <h5 class="header--name">HOURLY</h5>
        </div>

        <div class="hourly__weather--table">
            <div class="weather__main--item">Today</div>
            <div>${(data[0].dt_txt).slice(10,16)}</div>
            <div>${(data[1].dt_txt).slice(10,16)}</div>
            <div>${(data[2].dt_txt).slice(10,16)}</div>
            <div>${(data[3].dt_txt).slice(10,16)}</div>
            <div>${(data[4].dt_txt).slice(10,16)}</div>
            <div>${(data[5].dt_txt).slice(10,16)}</div>
            <div></div>
            <div><img src="http://openweathermap.org/img/w/${data[0].weather[0].icon}.png" alt="alt"></div>
            <div><img src="http://openweathermap.org/img/w/${data[1].weather[0].icon}.png" alt="alt"></div>
            <div><img src="http://openweathermap.org/img/w/${data[2].weather[0].icon}.png" alt="alt"></div>
            <div><img src="http://openweathermap.org/img/w/${data[3].weather[0].icon}.png" alt="alt"></div>
            <div><img src="http://openweathermap.org/img/w/${data[4].weather[0].icon}.png" alt="alt"></div>
            <div><img src="http://openweathermap.org/img/w/${data[5].weather[0].icon}.png" alt="alt"></div>
            <div class="weather__main--item">Forecast</div>
            <div>${data[0].weather[0].main}</div>
            <div>${data[1].weather[0].main}</div>
            <div>${data[2].weather[0].main}</div>
            <div>${data[3].weather[0].main}</div>
            <div>${data[4].weather[0].main}</div>
            <div>${data[5].weather[0].main}</div>
            <div class="weather__main--item">Temp(C)</div>
            <div>${Math.round(data[1].main.temp)}</div>
            <div>${Math.round(data[2].main.temp)}</div>
            <div>${Math.round(data[3].main.temp)}</div>
            <div>${Math.round(data[4].main.temp)}</div>
            <div>${Math.round(data[5].main.temp)}</div>
            <div>${Math.round(data[6].main.temp)}</div>
            <div class="weather__main--item">Real Feel</div>
            <div>${Math.round(data[1].main.feels_like)}</div>
            <div>${Math.round(data[2].main.feels_like)}</div>
            <div>${Math.round(data[3].main.feels_like)}</div>
            <div>${Math.round(data[4].main.feels_like)}</div>
            <div>${Math.round(data[5].main.feels_like)}</div>
            <div>${Math.round(data[6].main.feels_like)}</div>
            <div class="weather__main--item">Wind (km/h)</div>
            <div>${Math.round(data[0].wind.speed)} ${getWindDirection(data[0].wind.deg)}</div>
            <div>${Math.round(data[1].wind.speed)} ${getWindDirection(data[1].wind.deg)}</div>
            <div>${Math.round(data[2].wind.speed)} ${getWindDirection(data[2].wind.deg)}</div>
            <div>${Math.round(data[3].wind.speed)} ${getWindDirection(data[3].wind.deg)}</div>
            <div>${Math.round(data[4].wind.speed)} ${getWindDirection(data[4].wind.deg)}</div>
            <div>${Math.round(data[5].wind.speed)} ${getWindDirection(data[5].wind.deg)}</div>
        </div>
    `;
    article.innerHTML = content;

    container.append(article);
}

function getWindDirection(deg) {
    if (deg >= 340 && deg < 360 || deg >= 0 && deg < 30) return 'N';
    if (deg >= 30 && deg < 70) return 'NE';
    if (deg >= 70 && deg < 110) return 'E';
    if (deg >= 110 && deg < 150) return 'SE';
    if (deg >= 150 && deg < 200) return 'S';
    if (deg >= 200 && deg < 240) return 'SW';
    if (deg >= 240 && deg < 290) return 'W';
    if (deg >= 290 && deg < 340) return 'NW';
}

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
                <div id="main-temp">${Math.round(weather.list[0].main.temp)} C</div>
                <div>
                    <p>Sunrise: ${weather.city.sunrise}???</p>
                    <p>Sunset: ${weather.city.sunset}???</p>
                    <p>Duration:${weather.city.sunset - weather.city.sunrise}???</p>
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

