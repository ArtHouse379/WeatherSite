// OpenWeather API Key - d92da9be11a9ff634c79675141a4ba5a

const fetchAsyncWeather = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (error) {
        createErrorArticle(error);
    }
}