// OpenWeather API Key - d92da9be11a9ff634c79675141a4ba5a

fetch(' https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=d92da9be11a9ff634c79675141a4ba5a')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch()