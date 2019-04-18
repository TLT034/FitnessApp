import React, { Component } from 'react';
import { Card, CardItem, Container, Header, Content,  Text, Body, Button, Left, Right, View } from 'native-base';
import { connect } from 'react-redux';
import haversine from 'haversine';
import BackgroundTimer from 'react-native-background-timer';
import { NavigationEvents } from 'react-navigation';

import { addStats, addRouteCoords } from '../redux/actions/currentActivityActions';

import WeatherCard from '../components/WeatherCard';
import navigationService from '../services/NavigationService';


const LONGITUDE_DELTA = 0.009;
const LATITUDE_DELTA = 0.009;


class DuringActivityScreen extends Component {
    static navigationOptions = {
        title: 'Current Activity'
    }

    constructor(props) {
        super(props);

        this.timer;

        this.state = {
            time: 0,
            distance: 0,
            paused: false,
            routeCoordinates: [],
            prevCoordinate: {}
        }
    }

    componentDidMount() {
        this.timer = BackgroundTimer.setInterval(() => {
            this.setState((prevState) => { return { time: prevState.time + 1 } })
        }, 1000);

        this.gpsID = navigator.geolocation.watchPosition(
            (position) => {

                const routeCoordinates = this.state.routeCoordinates;
                const distanceTravelled = this.state.distance;

                const newCoordinate = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                }

                this.setState({
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distance: distanceTravelled + (this.state.paused ? 0 : this._calcDistance(newCoordinate)),
                    prevCoordinate: newCoordinate
                });
            },
            (error) => console.log("Error:", error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5 },
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#f2f2f2' }}>
                <Content>
                    <Card>
                        <CardItem style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text>Duration</Text>
                            <Text style={{ fontSize: 75, color: '#2541B2'}}>{this._formatTime()}</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text>Distance</Text>
                            <Text style={{ fontSize: 75, color: '#2541B2' }}>{this.state.distance.toFixed(3)} mi</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text>Pace</Text>
                            <Text style={{ fontSize: 75, color: '#2541B2' }}>{this._calcPace()}</Text>
                        </CardItem>
                    </Card>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Button
                            rounded
                            style={{
                                justifyContent: 'center', alignSelf: 'center',
                                height: 55, width: 150, marginTop: 50, borderColor: '#2541B2',
                                borderWidth: 2, backgroundColor: '#f2f2f2'
                            }}
                            onPress={() => this._togglePause()}
                        >
                            <Text style={{ fontSize: 25, color: '#2541B2' }}>{this._renderBtnTxt()}</Text>
                        </Button>
                        <Button
                            rounded
                            style={{
                                justifyContent: 'center', alignSelf: 'center',
                                height: 55, width: 150, marginTop: 50, borderColor: '#2541B2',
                                borderWidth: 2, backgroundColor: '#f2f2f2'
                            }}
                            onPress={() => this._endActivity()}
                        >
                            <Text style={{ fontSize: 25, color: '#2541B2' }}>End {this.props.currentActivity.type}</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }

    _calcDistance(newCoord) {
        const prevCoord = this.state.prevCoordinate;
        let km = haversine(prevCoord, newCoord) || 0;
        let mi = km * 0.6213711922;
        
        return mi;
    }


    _formatTime() {
        let sec_num = this.state.time;
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

    _calcPace() {
        let mph = this.state.distance / (this.state.time / 3600);
        return mph.toFixed(2).toString() + ' mph';
    }

    _togglePause() {
        if (this.state.paused) {
            this.timer = BackgroundTimer.setInterval(() => {
                this.setState((prevState) => { return { time: prevState.time + 1 } })
            }, 1000);

        } else {
            BackgroundTimer.clearInterval(this.timer);
        }

        this.setState((prevState) => {
            return { paused: !prevState.paused }
        });
    }

    _renderBtnTxt() {
        if (this.state.paused) {
            return 'Resume';
        }
        return 'Pause';
    }

    _endActivity() {

        navigator.geolocation.clearWatch(this.gpsID);
        this.props.addStats(this.state.time, this.state.distance, (this.state.distance / (this.state.time / 3600)))
        this.props.addRouteCoords(this.state.routeCoordinates);
        BackgroundTimer.clearInterval(this.timer);
        navigationService.navigate('PostActivity');
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.gpsID);
        BackgroundTimer.clearInterval(this.timer);
    }
}


function mapDispatchToProps(dispatch) {
    return {
        addStats: (dur, dist, p) => dispatch(addStats(dur, dist, p)),
        addRouteCoords: (routeCoords) => dispatch(addRouteCoords(routeCoords))
    };
}

function mapStateToProps(state) {
    return { currentActivity: state.currentActivity }
}

export default connect(mapStateToProps, mapDispatchToProps)(DuringActivityScreen)