import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Card, CardItem, Container, Header, Content, ListItem, CheckBox, Text, Body, List, Separator, Button, Icon, Left, Right, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { deleteActivity } from '../redux/actions/activityActions';
import { clearActivity } from '../redux/actions/currentActivityActions';

import WeatherCard from '../components/WeatherCard';
import MapCard from '../components/MapCard';
import navigationService from '../services/NavigationService';

class IndividualActivityScreen extends Component {
    static navigationOptions = {
        title: `type - date`
    }

    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <Container>
                <Content>
                    <MapCard title={`Activity ${this.props.currentActivity.type} Path`} type={'end'} />
                    <Card>
                        <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                            <Text>Duration</Text>
                            <Text style={{ fontSize: 25, color: '#2541B2' }}>{this._formatTime()}</Text>
                        </CardItem>
                        <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                            <Text>Distance</Text>
                            <Text style={{ fontSize: 25, color: '#2541B2' }}>{this.props.currentActivity.distance.toFixed(3)} mi</Text>
                        </CardItem>
                        <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                            <Text>Pace</Text>
                            <Text style={{ fontSize: 25, color: '#2541B2' }}>{this.props.currentActivity.pace.toFixed(2).toString() + ' mph'}</Text>
                        </CardItem>
                    </Card>
                    <WeatherCard
                        refreshable={false}
                        type={'loadStart'}
                        startWeather={this.props.currentActivity.startWeather}
                    />
                    <WeatherCard
                        refreshable={false}
                        type={'loadEnd'}
                        endWeather={this.props.currentActivity.endWeather}
                    />
                    <Card>
                        <CardItem style={{ justifyContent: 'center' }}>
                            {this._renderImage()}
                        </CardItem>
                        <CardItem>
                            <Text>How you felt: {this.props.currentActivity.feeling}</Text>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 50, margin: 0, padding: 0 }}>
                        <CardItem style={{ height: 40, margin: 0, padding: 0, justifyContent: 'space-evenly', alignItems: 'center'  }}>
                            <Button
                                style={{ height: 40, alignSelf: 'center' }}
                                transparent
                                onPress={() => this._deleteActivity()}
                            >
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>Delete Activity</Text>
                            </Button>
                            <Button
                                style={{ height: 40, alignSelf: 'center' }}
                                transparent
                                onPress={() => {
                                    this.props.clearActivity();
                                    navigationService.navigate('Activities');
                                }}
                            >
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2541B2' }}>Done</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }

    _formatTime() {
        let sec_num = this.props.currentActivity.duration;
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }


    _renderImage() {
        if (this.props.currentActivity.imgPath === "No Image") {
            return (
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>No Image</Text>
            );
        }
        else {
            return (
                <Image
                    source={{ uri: this.props.currentActivity.imgPath }}
                    style={{ width: '100%', height: 300, resizeMode: 'contain' }}
                />
            );
        }
    }

    _deleteActivity() {
        Alert.alert(
            `Delete ${this.props.currentActivity.type}`,
            'Are you sure you want to delete this activity?',
            [
                { text: 'Cancel', style: 'default' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        this.props.deleteActivity(this.props.currentActivity.id);
                        this.props.clearActivity();
                        navigationService.navigate('Activities');
                    }
                }
            ]
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteActivity: (id) => dispatch(deleteActivity(id)),
        clearActivity: () => dispatch(clearActivity())
    };
}

function mapStateToProps(state) {
    return {
        currentActivity: state.currentActivity,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualActivityScreen)