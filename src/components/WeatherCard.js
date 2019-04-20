import React, { Component } from 'react';
import { Card, CardItem, Text, Body, Left, Thumbnail, Button, View, Spinner } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { PermissionsAndroid, Alert } from 'react-native';

import { addStartWeather, addEndWeather } from '../redux/actions/currentActivityActions';

import weatherService from '../services/WeatherService';

class WeatherCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            latitude: 0,
            longitude: 0,
            weather: {},
        }
    }

    componentDidMount() {

        if (this.props.type === 'loadStart') {
            this.setState({ weather: this.props.startWeather })
        }
        else if (this.props.type === 'loadEnd') {
            this.setState({ weather: this.props.endWeather })
        }
        else {
            this.setState({ loading: true });

            PermissionsAndroid.requestMultiple(
                [
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                ]
            ).then((result) => {
                if (result['android.permission.ACCESS_FINE_LOCATION']
                    && result['android.permission.READ_EXTERNAL_STORAGE']
                    && result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {

                    this.gpsID = navigator.geolocation.watchPosition(
                        (position) => {

                            this.setState({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }, () => this._loadWeatherInfo());
                        },
                        (error) => {
                            console.log("Error:", error)
                            navigator.geolocation.clearWatch(this.gpsID);
                        },
                        { enableHighAccuracy: true, timeout: 100000, maximumAge: 1000, distanceFilter: 10000 },
                    );
                }
                else {
                    Alert.alert(
                        'Permissions Required',
                        'Refresh app and allow permissions or Go into Settings ->' +
                        ' Applications -> APP_NAME -> Permissions and Allow permissions to use app',
                        [{ text: 'Okay', style: 'default' }]
                    );
                }
            });
        }
    }

    render() {

        return (
            <View>
                {this._renderWeather()}
            </View>
        );
    }

    _renderWeather() {
        if (this.state.loading && this.props.type != 'loadStart' && this.props.type != 'loadEnd') {
            return (
                <Card>
                    <CardItem style={{ justifyContent: 'center', alignSelf: 'center' }}>
                        <Text>Loading current weather   </Text>
                        <Spinner color={'#03256C'} />
                    </CardItem>
                </Card>
            );
        }
        else {
            return (
                <Card>
                    <CardItem style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Thumbnail
                            source={{ uri: this.state.weather.iconURL }}
                            style={{ position: 'absolute', top: 20, left: 10 }}
                        />
                        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>{this.state.weather.city}</Text>
                        <Text style={{ fontSize: 25 }}>{this.state.weather.description}</Text>
                        {this._renderRefreshButton()}
                        {this._renderTitle()}
                        <View style={{ width: '100%', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 35, color: '#2541B2' }}>{this.state.weather.temp}{'\u00B0'} F</Text>
                            <Text style={{ fontSize: 35, color: '#2541B2' }}>{this.state.weather.humidity}% H</Text>
                        </View>
                    </CardItem>
                </Card>
            );
        }
    }

    _renderRefreshButton() {
        if (this.props.refreshable) {
            return (
                <Button
                    transparent
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    onPress={() => this._refreshPressed()}
                >
                    <MaterialIcon size={35} name={'refresh'} />
                </Button>
            );
        } else {
            return null;
        }
    }

    _refreshPressed() {
        this.setState({ loading: true });
        this.gpsID = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }, () => this._loadWeatherInfo());
            },
            (error) => console.log("Error:", error),
            { enableHighAccuracy: true, timeout: 100000, maximumAge: 1000, distanceFilter: 10000 },
        );
    }

    _renderTitle() {
        switch (this.props.type) {
            case 'loadStart':
                return (
                    <Text style={{ position: 'absolute', top: 1, left: 10 }}>Start Weather</Text>
                );
            case 'loadEnd':
                return (
                    <Text style={{ position: 'absolute', top: 1, left: 10 }}>End Weather</Text>
                );
            case 'end':
                return (
                    <Text style={{ position: 'absolute', top: 1, left: 10 }}>End Weather</Text>
                );
            default:
                return null;
        }
    }

    _loadWeatherInfo() {
        weatherService.getCurrentWeather(this.state.latitude, this.state.longitude)
            .then((results) => {
                this.setState({ weather: results, loading: false }, () => this._saveStartWeather(results))
            })
            .catch(error => {
                console.error("Error: couldn\'t retrieve weather object");
            });
        navigator.geolocation.clearWatch(this.gpsID);
    }

    _saveStartWeather(weatherObj) {

        let today = new Date();
        let date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
        let ampm = 'am';
        if (today.getHours() >= 12) {
            ampm = 'pm';
        }
        let min = today.getMinutes();
        if (min < 10) { min = '0' + min.toString()}
        let time = (((today.getHours() + 11) % 12) + 1) + ":" + min;
        let dateTime = date + " - " + time + ampm;
        let dateObj = {
            dateStr: dateTime,
            dateNum: today.getTime()
        }

        if (this.props.type === 'start') {
            this.props.addStartWeather(weatherObj, dateObj);
        } else if (this.props.type === 'end') {
            this.props.addEndWeather(weatherObj);
        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.gpsID);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addStartWeather: (startWeather, date) => dispatch(addStartWeather(startWeather, date)),
        addEndWeather: (endWeather) => dispatch(addEndWeather(endWeather)),
    };
}

function mapStateToProps(state) {
    return { currentActivity: state.currentActivity }
}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherCard)