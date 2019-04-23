import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native'; 
import { Card, CardItem, Container, Content, Text, Button, Form, Input, Label, Item } from 'native-base';
import { connect } from 'react-redux';
import NotificationService from '../services/NotificationService';

import { clearActivity, addFeeling } from '../redux/actions/currentActivityActions';
import { addActivity } from '../redux/actions/activityActions';
import { updateTotals } from '../redux/actions/totalActions';
import { toggleEarned, personalBest } from '../redux/actions/rewardActions';

import WeatherCard from '../components/WeatherCard';
import MapCard from '../components/MapCard';
import navigationService from '../services/NavigationService';


class PostActivityScreen extends Component {
    static navigationOptions = {
        title: 'Activity Report'
    }

    constructor(props) {
        super(props);

        this.notificationService = new NotificationService();
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#f2f2f2' }}>
                <Content>
                    <MapCard title={`Activity ${this.props.currentActivity.type} Path`} type={'end'} />
                    <Card>
                        <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2'}}>
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
                    <WeatherCard refreshable={false} type={'end'} />
                    <Card>
                        <CardItem style={{ justifyContent: 'center'}}>
                            {this._renderImage()}
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Form>
                                <Item stackedLabel>
                                    <Label>How Do You Feel?</Label>
                                    <Input onChangeText={(text) => this.props.addFeeling(text)} />
                                </Item>
                            </Form>
                        </CardItem>
                    </Card>
                    <Card style={{ height: 50, margin: 0, padding: 0 }}>
                        <CardItem style={{ height: 40, justifyContent: 'space-evenly', alignItems: 'center'  }}>
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
                                onPress={() => this._saveActivity()}
                            >
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2541B2' }}>Save Activity</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }


    _renderImage() {
        if (this.props.currentActivity.imgPath === "No Image") {
            return (
                <Button
                    style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                    transparent
                    onPress={() => navigationService.navigate('Camera')}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2541B2' }}>Take Picture!</Text>
                </Button>
            );
        }
        else {
            return (
                <Image
                    source={{ uri: this.props.currentActivity.imgPath }}
                    style={{width: '100%', height: 300, resizeMode: 'contain'}}
                />
            );
        }
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

    _saveActivity() {
        this.notificationService.activityNotification(
            "Activity Complete!",
            `Your ${this.props.currentActivity.type} has been saved`,
            `Your ${this.props.currentActivity.type} has been saved\n` +
            `Duration: ${this._formatTime()}\n` +
            `Distance: ${this.props.currentActivity.distance.toFixed(3)} miles\n` +
            `Pace: ${this.props.currentActivity.pace.toFixed(2)} mph`,
            '#03256C'
        );
        this.props.addActivity(this.props.currentActivity);
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
                        this.props.clearActivity();
                        navigationService.navigate('Home');
                    }
                }
            ]
        );
    }


    _checkForRewards() {
        // current activity - can't use currentActivity prop/global state bc it may be deleted by now.
        let currActivity = this.props.activities[this.props.activities.length - 1];

        /******************************* Check for Level Up ******************************/
        for (let i = 10; i >= 1; i--) {
            // if this completed activity is number 5,10,15,...,50. Level Up.
            if (this.props.activities.length === (i * 5)) {
                let newLvlName = "Level " + (i + 1).toString();
                let activityId = currActivity.id;
                console.log(`Level Up! - ${newLvlName}`);
                this.props.toggleEarned(newLvlName, activityId, true);
            }
        }

        /**************************** Check for Personal Best *****************************/

        // find current personal bests
        this.props.rewards.forEach((reward) => {
            switch (reward.name) {
                case 'Duration':
                    if (currActivity.duration > reward.stat) {
                        this.props.personalBest(
                            'Duration',
                            currActivity.id,
                            currActivity.duration,
                            true
                        );
                    }
                    break;
                case 'Distance':
                    if (currActivity.distance > reward.stat) {
                        this.props.personalBest(
                            'Distance',
                            currActivity.id,
                            currActivity.distance,
                            true
                        );
                    }
                    break;
                case 'Pace':
                    if (currActivity.pace > reward.stat && currActivity.distance >= 0.25) {
                        this.props.personalBest(
                            'Pace',
                            currActivity.id,
                            currActivity.pace,
                            true
                        );
                    }
                    break;
            }
        });

        /***************************** Check for Achievements *********************************/
        this.props.rewards.forEach((reward) => {
            if (!reward.earned) {
                switch (reward.name) {
                    case 'Speedy':
                        if (currActivity.pace >= 8 && currActivity.distance >= 1) {
                            this.props.toggleEarned('Speedy', currActivity.id, true);
                        }
                        break;
                    case 'The Flash':
                        if (currActivity.pace >= 9 && currActivity.distance >= 1) {
                            this.props.toggleEarned('The Flash', currActivity.id, true);
                        }
                        break;
                    case 'Getting There':
                        if (this.props.totals.distance >= 10) {
                            this.props.toggleEarned('Getting There', currActivity.id, true);
                        }
                        break;
                    case 'Going Places':
                        if (this.props.totals.distance >= 50) {
                            this.props.toggleEarned('Going Places', currActivity.id, true);
                        }
                        break;
                    case 'Pioneer':
                        if (this.props.totals.distance >= 100) {
                            this.props.toggleEarned('Pioneer', currActivity.id, true);
                        }
                        break;
                }
            }
        });

    }

    componentDidUpdate(prevProps) {
        if (prevProps.activities !== this.props.activities) {
            this.props.updateTotals(
                'Increment',
                this.props.currentActivity.distance,
                this.props.currentActivity.duration,
                this.props.currentActivity.type
            );
        }
        if (prevProps.totals !== this.props.totals) {
            this._checkForRewards();
            this.props.clearActivity();
            navigationService.navigate('Home');
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        /* currentActivity */
        addFeeling: (feeling) => dispatch(addFeeling(feeling)),
        clearActivity: () => dispatch(clearActivity()),
        /* activities */
        addActivity: (activityObj) => dispatch(addActivity(activityObj)),
        /* totals */
        updateTotals: (uType, dist, dur, aType) => dispatch(updateTotals(uType,dist, dur, aType)),
        /* rewards */
        toggleEarned: (name, id, earned) => dispatch(toggleEarned(name, id, earned)),
        personalBest: (name, id, stat, earned) => dispatch(personalBest(name, id, stat, earned))
    };
}

function mapStateToProps(state) {
    return {
        currentActivity: state.currentActivity,
        activities: state.activities,
        totals: state.totals,
        rewards: state.rewards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostActivityScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});