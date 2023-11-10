class Search {
    constructor(inputId) {
        this.input = document.querySelector(inputId);
        this.cityName = this.input.value;
    }
};

class View {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.currentWeatherArticle = null;
        this.hourlyArticle = null;
        this.nearbyPlacesArticle = null;
        this.fiveDayArticle = null;
        this.errorArticle = null;
    }

    // Create articles for container.
    createElement(tag, content, classEl, parent) {
        const el = document.createElement(tag);
        el.innerHTML = content;
        el.classList.add(classEl);
        parent.append(el);
        return el;
    }

    renderCurrentWeatherArticle(weather) {
        if (this.currentWeatherArticle) this.currentWeatherArticle.remove();

        let date = new Date(),
            sunset = new Date(weather.city.sunset * 1000).toLocaleTimeString(),
            sunrise = new Date(weather.city.sunrise * 1000).toLocaleTimeString();

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
                <div id="main-temp">${Math.round(weather.list[0].main.temp)}&deg;C</div>
                <div>
                    <p>Sunrise: ${sunrise}</p>
                    <p>Sunset: ${sunset}</p>
                </div>
            </div>
        `;

        this.currentWeatherArticle = this.createElement('article', content, 'current_weather', this.container);
    }

    renderHourlyArticle(weather) {
        let data = weather.list;

        if (this.hourlyArticle) this.hourlyArticle.remove();

        let content = `
            <div class="hourly__header">
                <h5 class="header--name">HOURLY</h5>
            </div>

            <div class="hourly__weather--table">
                <div class="weather__main--item">Today</div>
                <div>${(data[0].dt_txt).slice(10, 16)}</div>
                <div>${(data[1].dt_txt).slice(10, 16)}</div>
                <div>${(data[2].dt_txt).slice(10, 16)}</div>
                <div>${(data[3].dt_txt).slice(10, 16)}</div>
                <div>${(data[4].dt_txt).slice(10, 16)}</div>
                <div>${(data[5].dt_txt).slice(10, 16)}</div>
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
                <div class="weather__main--item">Temp(&deg;C)</div>
                <div>${Math.round(data[0].main.temp)}</div>
                <div>${Math.round(data[1].main.temp)}</div>
                <div>${Math.round(data[2].main.temp)}</div>
                <div>${Math.round(data[3].main.temp)}</div>
                <div>${Math.round(data[4].main.temp)}</div>
                <div>${Math.round(data[5].main.temp)}</div>
                <div class="weather__main--item">Real Feel</div>
                <div>${Math.round(data[0].main.feels_like)}</div>
                <div>${Math.round(data[1].main.feels_like)}</div>
                <div>${Math.round(data[2].main.feels_like)}</div>
                <div>${Math.round(data[3].main.feels_like)}</div>
                <div>${Math.round(data[4].main.feels_like)}</div>
                <div>${Math.round(data[5].main.feels_like)}</div>
                <div class="weather__main--item">Wind (km/h)</div>
                <div>${Math.round(data[0].wind.speed)} ${this.getWindDirection(data[1].wind.deg)}</div>
                <div>${Math.round(data[1].wind.speed)} ${this.getWindDirection(data[2].wind.deg)}</div>
                <div>${Math.round(data[2].wind.speed)} ${this.getWindDirection(data[0].wind.deg)}</div>
                <div>${Math.round(data[3].wind.speed)} ${this.getWindDirection(data[3].wind.deg)}</div>
                <div>${Math.round(data[4].wind.speed)} ${this.getWindDirection(data[4].wind.deg)}</div>
                <div>${Math.round(data[5].wind.speed)} ${this.getWindDirection(data[5].wind.deg)}</div>
            </div>
        `;

        this.hourlyArticle = this.createElement('article', content, 'hourly__weather', this.container);
    }

    renderFiveDayArticle(weather) {
        if (this.fiveDayArticle) this.fiveDayArticle.remove();

        let weatherData = weather.list;

        let fiveDays = weatherData.filter((item) => {
            return item.dt_txt.slice(10, 13) == 12;
        })

        let content = ``;

        fiveDays.forEach(el => {
            content += `
                <div class="fivedays__item">
                    <h4 class="item__day">${new Date(el.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</h4>
                    <p class="item__date">${new Date(el.dt_txt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}</p>
                    <img src="http://openweathermap.org/img/w/${el.weather[0].icon}.png" alt="alt">
                    <h3 class="item__temp">${Math.round(el.main.temp)}&deg;C</h3>
                    <p class="item__wind">${el.weather[0].description}</p>
                </div>
            `;
        });

        this.fiveDayArticle = this.createElement('article', content, 'fivedays__weather', this.container);
    }

    renderNearbyPlacesArticle() {
        if (this.nearbyPlacesArticle) this.nearbyPlacesArticle.remove();

        let content = `
            <div class="nearby__header">
                <h5 class="header--name">NEARBY PLACES</h5>
            </div>

            <div class="nearby__weather--cities">
            </div>
        `;

        this.nearbyPlacesArticle = this.createElement('article', content, 'nearby__weather', this.container);
    }

    renderNearbyCity(data) {
        let parent = document.querySelector('.nearby__weather--cities');
        let cities = document.querySelectorAll('.nearby__city');
        
        if (cities.length >= 4) parent.innerHTML = '';

        let city = document.createElement('div');
        city.classList.add('nearby__city');

        let content = `
            <p>${data.city.name}</p>
            <img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" alt="alt">
            <p>${Math.round(data.list[0].main.temp)}&deg;C</p>
        `;

        city.innerHTML = content;
        parent.append(city)
    }

    renderErrorArticle(error) {
        if (this.errorArticle) this.errorArticle.remove();
        this.container.innerHTML = '';

        let content = `
        <div class="error__inner">
            <img src="img/error.png" alt="alt">
            <h1>
                <strong>${error}</strong>. <br>
                Please enter a different location.
            </h1>
        </div>
        `;

        this.errorArticle = this.createElement('article', content, 'error', this.container);
    }

    showTodayForecast(data) {
        this.view.container.innerHTML = '';

        this.renderCurrentWeatherArticle(data)
        this.renderHourlyArticle(data)
        this.renderNearbyPlacesArticle()
        this.getNearbyCities(data)
    }

    showFiveDayForecast(data) {
        this.view.container.innerHTML = '';

        this.renderFiveDayArticle(data)
        this.renderHourlyArticle(data)
    }
};

class Model {

    // Make fetch request by city name.
    // Default - "Odesa"
    async fetchAsyncWeather(cityName) {
        cityName = cityName || 'Odesa';
        let apiKey = 'd92da9be11a9ff634c79675141a4ba5a';
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url)
            const data = await response.json()
            this.getApiData(data)

        }
        catch (error) {
            this.getApiData(error)
        }
    }

    // Make fetch request by city coordinates.
    async fetchAsyncLatLon(options) {
        let apiKey = 'd92da9be11a9ff634c79675141a4ba5a';
        options.forEach(async (city) => {
            let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.cityLat}&lon=${city.cityLon}&units=metric&appid=${apiKey}`;
            try {
                const response = await fetch(url)
                const data = await response.json()
                this.getNearbyCitiesData(data)

            }
            catch (error) {
                this.getApiData(error)
            }
        })
    }
};

class Controller {
    constructor(parent) {
        this.view = new View(parent);
        this.view.getWindDirection = this.getWindDirection.bind(this);
        this.renderCurrentWeatherArticle = this.view.renderCurrentWeatherArticle.bind(this.view);
        this.renderHourlyArticle = this.view.renderHourlyArticle.bind(this.view);
        this.renderFiveDayArticle = this.view.renderFiveDayArticle.bind(this.view);
        this.renderNearbyPlacesArticle = this.view.renderNearbyPlacesArticle.bind(this.view);
        this.renderErrorArticle = this.view.renderErrorArticle.bind(this.view);
        this.renderNearbyCity = this.view.renderNearbyCity.bind(this.view);
        this.showTodayForecast = this.view.showTodayForecast.bind(this);
        this.showFiveDayForecast = this.view.showFiveDayForecast.bind(this);

        this.model = new Model();
        this.fetchAsyncWeather = this.model.fetchAsyncWeather.bind(this);
        this.fetchAsyncLatLon = this.model.fetchAsyncLatLon.bind(this);

        this.search = new Search('#city-search');

        this.init()
    }

    // Make fetch request and return weather. 
    // Wait press "Enter" button for search by city name. 
    init() {
        this.fetchAsyncWeather();
        
        window.addEventListener('keydown', (e) => {
            if (e.code == 'Enter') {
                if (this.search.input.value) {
                    this.fetchAsyncWeather(this.search.input.value);
                    this.search.input.value = '';
                }
            };
        });

    }

    // Wait for fetch response.
    // In cases (Error404 || TypeError) - show Error article.
    // First auto-call to show Today Forecast when site was open.
    // Wait press "Today" || "FiveDay" button for show weather.
    getApiData(data) {
        if (data.cod === '404' || data == TypeError) return this.renderErrorArticle(data.message);
        this.search.input.setAttribute('placeholder', `${data.city.name},${data.city.country}`)
        
        this.showTodayForecast(data)

        document.querySelector('#today').addEventListener('click', () => {
            this.showTodayForecast(data)
        })

        document.querySelector('#fiveDay').addEventListener('click', () => {
            this.showFiveDayForecast(data)
        })
    }

    // Change deg-numbers to geographical wind direction.
    getWindDirection(deg) {
        if (deg >= 340 && deg < 360 || deg >= 0 && deg < 30) return 'N';
        if (deg >= 30 && deg < 70) return 'NE';
        if (deg >= 70 && deg < 110) return 'E';
        if (deg >= 110 && deg < 150) return 'SE';
        if (deg >= 150 && deg < 200) return 'S';
        if (deg >= 200 && deg < 240) return 'SW';
        if (deg >= 240 && deg < 290) return 'W';
        if (deg >= 290 && deg < 340) return 'NW';
    }

    // Change coordinates of current city to get Array includes 4 nearby cities coordinates.
    // Make fetch request by this cities coordinates.
    getNearbyCities(data) {
        let lat = Math.round(data.city.coord.lat),
            lon = Math.round(data.city.coord.lon);

        let nearbyCities = [{
            cityLat: lat-0.2,
            cityLon: lon-0.2
        },
        {
            cityLat: lat-0.4,
            cityLon: lon-0.4
        }, {
            cityLat: lat+0.2,
            cityLon: lon+0.2
        }, {
            cityLat: lat+0.4,
            cityLon: lon+0.4
        }];

        this.fetchAsyncLatLon(nearbyCities);
    }

    // Get data from fetch requests (4 times) and call for render function.
    getNearbyCitiesData(data) {
        this.renderNearbyCity(data);
    }
};

const controller = new Controller('.container');