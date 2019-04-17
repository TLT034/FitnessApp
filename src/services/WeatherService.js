import apiService from './ApiService';

let WeatherService = class WeatherService {

    getCurrentWeather(lat, lng) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getWeatherURL(lat, lng))
                .then((response) => response.json())
                .then((data) => {
                    let weather = {
                        temp: data.main.temp,
                        humidity: data.main.humidity,
                        description: data.weather[0].description,
                        city: data.name,
                        iconURL: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
                    };
                    resolve(weather);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });

    }
}

const weatherService = new WeatherService();
export default weatherService;