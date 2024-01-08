const axios = require('axios');

const URL = 'https://api.weatherapi.com/v1/forecast.json';
const FORECAST_DAYS = 3;

async function fetchForecast(location){
    return await axios({
        url: URL,
        method: 'get',
        params: {
            q: location,
            days: FORECAST_DAYS,
            key: process.env.WEATHER_API_KEY
        },
        responseType: 'json',
    })
    .then((response) => {
        const city = response.data.location.name;
        const country = response.data.location.country;
        const locationName = `${city}, ${country}`;

        const weatherData = response.data.forecast.forecastday.map((day) => {
            return {
                date: day.date,
                temperatureMinC: day.day.mintemp_c,
                temperatureMaxC: day.day.maxtemp_c,
                temperatureMinF: day.day.mintemp_f,
                temperatureMaxF: day.day.maxtemp_f,

                sunriseTime: day.astro.sunrise,
                sunsetTime: day.astro.sunset,
                moonriseTime: day.astro.moonrise,
                moonsetTime: day.astro.moonset,
            }
        });

        return {
            locationName,
            weatherData,
        };
    })
    .catch((error) => {
        console.error(error);
        throw new Error(`Error fetching forecast for ${location}.`);
    });
};

module.exports = {
    fetchForecast,
};
