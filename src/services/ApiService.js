

let ApiService = class ApiService {
    constructor() {

        this.weatherApiHost = 'https://api.openweathermap.org/data/2.5/weather?';
        this.weatherApiKey = '729837df03eebad1e0334f5c9b9eb180';

    }


    /*
	* API address
	*/

    getWeatherURL(lat, lng) {
        return `${this.weatherApiHost}lat=${lat}&lon=${lng}&APPID=${this.weatherApiKey}&units=imperial`;
    }
}

const apiService = new ApiService();
export default apiService;