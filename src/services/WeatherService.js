import apiService from './ApiService';

let WeatherService = class WeatherService {

    constructor() {
        this.zip = 0;
    }

    getZipcode() {
        return new Promise((resolve, reject) => {
            fetch(apiService.getZipcodeURL())
                .then((response) => response.json())
                .then((zipcodeData) => {
                    resolve(zipcodeData.zip);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    getCurrentWeather(zipcode) {
        this.getLocation();
        return new Promise((resolve, reject) => {
            fetch(apiService.getWeatherURL(zipcode))
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