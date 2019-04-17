import React, { Component } from 'react';
import { Card, CardItem, Text, Body, Left, Thumbnail, Button } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { addStartWeather, addEndWeather } from '../redux/actions/currentActivityActions';

import weatherService from '../services/WeatherService';

class WeatherCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            zipcode: 0,
            weather: {}
        }
    }

    componentDidMount() {
        if (this.props.type != 'load') {
            this._loadWeatherInfo();
        } else if (this.props.type === 'loadStart') {
            this.setState({ weather: this.props.startWeather })
        } else if (this.props.type === 'loadEnd') {
            this.setState({weather: this.props.endWeather})
        }
    }

    render() {

        return (           
            <Card>
                <CardItem >
                    <Thumbnail source={{ uri: this.state.weather.iconURL }} />
                    <Body style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ fontSize: 35 }}>{this.state.weather.city}</Text>
                        <Text style={{ fontSize: 25 }}>{this.state.weather.description}</Text>
                    </Body>
                    {this._renderRefreshButton()}
                    {this._renderTitle()}
                </CardItem>
                <CardItem footer style={{  justifyContent: 'space-evenly', }}>
                        <Text>Temperature: {this.state.weather.temp} F</Text>
                        <Text>Humidity: {this.state.weather.humidity} %</Text>
                </CardItem>
            </Card>
        );
    }

    _renderRefreshButton() {
        if (this.props.refreshable) {
            return (
                <Button
                    transparent
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    onPress={() => this._loadWeatherInfo()}
                >
                    <MaterialIcon size={35} name={'refresh'} />
                </Button>
            );
        } else {
            return null;
        }
    }

    _renderTitle() {
        switch (this.props.type) {
            case 'loadStart':
                return (
                    <Text style={{ position: 'absolute', top: 5, left: 20 }}>Start Weather</Text>
                );
            case 'loadEnd':
                return (
                    <Text style={{ position: 'absolute', top: 5, left: 20 }}>End Weather</Text>
                );
            case 'end':
                return (
                    <Text style={{ position: 'absolute', top: 5, left: 20 }}>End Weather</Text>
                );
            default:
                return null;
        }
    }

    _loadWeatherInfo() {

        weatherService.getZipcode()
            .then((results) => {
                this.setState({ zipcode: results }, () => {
                    weatherService.getCurrentWeather(this.state.zipcode)
                        .then((results) => {
                            this.setState({ weather: results }, () => this._saveStartWeather(results))
                        })
                        .catch(error => {
                            console.error("Error: couldn\'t retrieve weather object");
                        });
                });
            })
            .catch((error) => {
                console.log('Error: couldn\'t retrieve zipcode.');
            });
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
        let time = ((today.getHours() % 13) + 1) + ":" + min;
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