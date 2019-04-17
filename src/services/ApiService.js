

let ApiService = class ApiService {
    constructor() {

        this.weatherApiHost = 'https://api.openweathermap.org/data/2.5/weather?';
        this.weatherApiKey = '729837df03eebad1e0334f5c9b9eb180';

        this.zipcodeApiHost = 'http://api.ipstack.com/check?';
        this.zipcodeApiKey = '29a74b293ccdcaa14b17ac78fb1b4da2';
    }


    /*
	* API addresses
	*/
    getZipcodeURL() {
        return `${this.zipcodeApiHost}access_key=${this.zipcodeApiKey}&fields=zip`;
    }

    getWeatherURL(zipcode) {
        return `${this.weatherApiHost}zip=${zipcode}&APPID=${this.weatherApiKey}&units=imperial`;
    }
}

const apiService = new ApiService();
export default apiService;