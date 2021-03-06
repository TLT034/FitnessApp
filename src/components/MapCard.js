import React, { Component } from 'react';
import { Card, CardItem, Text, Body, Content, View, Spinner } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Callout, Marker, Polyline} from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

const LONGITUDE_DELTA = 0.005;
const LATITUDE_DELTA = 0.005;

class MapCard extends Component {

    constructor(props) {
        super(props);

        
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            positionLoading: true,
        }
        
    }

    componentDidMount() {
        /** If the mapcard is being used to display the map before starting the activity */
        if (this.props.type === 'start') {

            this.gpsID = navigator.geolocation.watchPosition(
                (position) => {
                    this.setState({
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            longitudeDelta: LONGITUDE_DELTA,
                            latitudeDelta: LATITUDE_DELTA
                        },
                        positionLoading: false
                    });
                    this.props.updated();
                },
                (error) => console.log("Error:", error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5 },
            );
        }
        /** If the mapcard is being used to display activity path in activity report */
        else if (this.props.type === 'end') {

            if (this.props.currentActivity.routeCoordinates.length > 1) {
                let numCoords = this.props.currentActivity.routeCoordinates.length;

                let lat = this.props.currentActivity.routeCoordinates[parseInt(numCoords/2)].latitude;
                let long = this.props.currentActivity.routeCoordinates[parseInt(numCoords/2)].longitude;

                this.setState({
                    region: {
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009
                    },
                    positionLoading: false
                });
            }

        }
    }


    render() {

        return (

            <Card>
                <NavigationEvents
                    onWillBlur={() => {
                        if (this.props.type === 'start') {
                            navigator.geolocation.clearWatch(this.gpsID);
                        }
                    }}
                />
                <CardItem style={{ flexDirection: 'column' }}>
                    <View style={{ paddingBottom: 5, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>{this.props.title}</Text>
                    </View>
                    <View style={styles.mapContainer}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            region={this.state.region}
                            //onRegionChange={(region) => this._changeRegion(region)}
                        >
                            {this._drawMarkers()}
                            
                        </MapView>
                        {this._renderPositionLoad()}
                    </View>
                </CardItem>
            </Card>
        );
    }

    /** Simple feedback message to user if map loading is taking a while */
    _renderPositionLoad() {
        if (this.state.positionLoading) {
            if (this.props.type === 'start') {
                return (
                    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                        <Text>Loading current position...</Text>
                        <Spinner color={'#03256C'} />
                    </View>
                );
            }
            else if (this.props.type === 'end' &&
                this.props.currentActivity.routeCoordinates.length > 1) {
                return (
                    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                        <Text>Loading activity path...</Text>
                        <Spinner color={'#03256C'} />
                    </View>
                );
            }
            else {
                return (
                    <View style={{ justifyContent: 'center', alignSelf: 'center', flexWrap: 'wrap' }}>
                        <Text>You have to actually MOVE to track an activity path, lazy..</Text>
                    </View>
                );
            }
        }
    }

    /** Draws a path by drawing a line between every captured coordinate */
    _drawMarkers() {
        if (this.props.type === 'start') {
            return (
                <Marker
                    coordinate={this.state.region}
                    pinColor={'#06BEE1'}
                >
                    <Callout>
                        <View>
                            <Text>Current Position</Text>
                        </View>
                    </Callout>
                </Marker> 
            );
            
        }
        else if (this.props.type == 'end') {
            
            if (this.props.currentActivity.routeCoordinates.length > 1) {
                return (
                    <View>
                        <Polyline
                            coordinates={this.props.currentActivity.routeCoordinates}
                            strokeWidth={3}
                            strokeColor={'#2541B2'}
                        />
                        <Marker
                            coordinate={this.props.currentActivity.routeCoordinates[0]}
                            pinColor={'green'}
                        >
                            <Callout>
                                <View>
                                    <Text>Start Position</Text>
                                </View>
                            </Callout>
                        </Marker>
                        <Marker
                            coordinate={this.props.currentActivity.routeCoordinates[this.props.currentActivity.routeCoordinates.length - 1]}
                            pinColor={'red'}
                        >
                            <Callout>
                                <View>
                                    <Text>End Position</Text>
                                </View>
                            </Callout>
                        </Marker>
                    </View>);
            }
            else {
                return null;
            }
        }
    }


    componentWillUnmount() {
        if (this.props.type === 'start') {
            navigator.geolocation.clearWatch(this.gpsID);
        }
    }
}


function mapStateToProps(state) {
    return { currentActivity: state.currentActivity }
}

export default connect(mapStateToProps)(MapCard)


const styles = StyleSheet.create({
    mapContainer: {
        alignSelf: 'center',
        position: 'relative',
        //top: 5,
        //left: 0,
        //right: 0,
        //bottom: 0,
        height: 285,
        width: '100%',
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    map: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
});