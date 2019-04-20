import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Card, CardItem, Container, Header, Content, ListItem, CheckBox, Text, Body, List, Separator, Button, Icon, Left, Right, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationEvents } from 'react-navigation';

import { deleteActivity } from '../redux/actions/activityActions';
import { clearActivity } from '../redux/actions/currentActivityActions';
import { updateTotals } from '../redux/actions/totalActions';
import { toggleEarned, personalBest } from '../redux/actions/rewardActions';

import WeatherCard from '../components/WeatherCard';
import MapCard from '../components/MapCard';
import navigationService from '../services/NavigationService';

class IndividualActivityScreen extends Component {
    static navigationOptions = {
        title: 'Activity'
    }

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        this.canDelete = navigation.getParam('canDelete', true);
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#f2f2f2' }}>
                <NavigationEvents
                    onDidBlur={() => this.props.clearActivity()}
                />
                <Header style={{ justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#03256C'}}>
                    <Text style={{fontSize: 25, color: 'white' }}>{this.props.currentActivity.type}</Text>
                    <Text style={{ fontSize: 25, color: 'white' }}>{this.props.currentActivity.date.dateStr}</Text>
                </Header>
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
                                disabled={!this.canDelete}
                                style={{ height: 40, alignSelf: 'center' }}
                                transparent
                                onPress={() => this._deleteActivity()}
                            >
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: this.canDelete ? 'red':'gray' }}>Delete Activity</Text>
                            </Button>
                            <Button
                                style={{ height: 40, alignSelf: 'center' }}
                                transparent
                                onPress={() => {
                                    this.props.clearActivity();
                                    navigationService.goBack();
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
                        this.props.updateTotals(
                            'Decrement',
                            this.props.currentActivity.distance,
                            this.props.currentActivity.duration,
                            this.props.currentActivity.type
                        );
                    }
                }
            ]
        );
    }

    _checkToRemoveRewards() {
        /******************************* Check for Level Down ******************************/
        for (let i = 10; i >= 1; i--) {
            // if this completed activity is number 4,9,14,...,49. Level Down.
            if (this.props.activities.length === (i * 5) - 1) {
                let newLvlName = "Level " + (i + 1).toString();
                this.props.toggleEarned(newLvlName, null, false);
            }
        }

        /*************************** Check activities and save best stats ******************************/
        let duration = 0;
        let durId;
        let distance = 0;
        let distId;
        let pace = 0;
        let paceId;
        let achievementPace = 0;
        let achievementPaceId;
        let activityIds = [];

        this.props.activities.forEach((activity) => {
            if (activity.duration > duration) {
                duration = activity.duration;
                durId = activity.id;
            }
            if (activity.distance > distance) {
                distance = activity.distance;
                distId = activity.id;
            }
            if (activity.pace > pace && activity.distance >= 0.25) {
                pace = activity.pace;
                paceId = activity.id;
            }
            if (activity.pace > achievementPace && activity.distance >= 1) {
                achievementPace = activity.pace;
                achievementPaceId = activity.id;
            }
            activityIds.push(activity.id);
        });

        /**************************** Check for RESET of Personal Best *****************************/
        // Update personal best rewards to the correct stat and activity Id.
        // If there are no activities over 0 in a stat, then reset the personal bests
        // to not yet earned.
        this.props.rewards.forEach((reward) => {
            switch (reward.name) {
                case 'Duration':
                    if (distance > 0) {
                        this.props.personalBest(
                            'Duration',
                            durId,
                            duration,
                            true
                        );
                    }
                    else {
                        this.props.personalBest(
                            'Duration',
                            null,
                            0,
                            false
                        );
                    }
                    break;
                case 'Distance':
                    if (duration > 0) {
                        this.props.personalBest(
                            'Distance',
                            distId,
                            distance,
                            true
                        );
                    }
                    else {
                        this.props.personalBest(
                            'Distance',
                            null,
                            0,
                            false
                        );
                    }
                    break;
                case 'Pace':
                    if (pace > 0) {
                        this.props.personalBest(
                            'Pace',
                            paceId,
                            pace,
                            true
                        );
                    }
                    else {
                        this.props.personalBest(
                            'Pace',
                            null,
                            0,
                            false
                        );
                    }
                    break;
            }
        });

        /***************************** Check to REMOVE Achievements *********************************/
        this.props.rewards.forEach((reward) => {
            if (reward.earned) {
                switch (reward.name) {
                    case 'Speedy':
                        if (achievementPace < 8) {
                            this.props.toggleEarned('Speedy', null, false);
                        }
                        else if (!activityIds.includes(reward.activityId)) {
                            this.props.toggleEarned('Speedy', achievementPaceId, true);
                        }
                        break;
                    case 'The Flash':
                        if (achievementPace < 9) {
                            this.props.toggleEarned('The Flash', null, false);
                        }
                        else if (!activityIds.includes(reward.activityId)) {
                            this.props.toggleEarned('The Flash', achievementPaceId, true);
                        }
                        break;
                    case 'Getting There':
                        if (this.props.totals.distance < 10) {
                            this.props.toggleEarned('Getting There', null, false);
                        }
                        else if (!activityIds.includes(reward.activityId)) {
                            this.props.toggleEarned('Getting There', achievementPaceId, true);
                        }
                        break;
                    case 'Going Places':
                        if (this.props.totals.distance < 50) {
                            this.props.toggleEarned('Going Places', null, false);
                        }
                        else if (!activityIds.includes(reward.activityId)) {
                            this.props.toggleEarned('Going Places', achievementPaceId, true);
                        }
                        break;
                    case 'Pioneer':
                        if (this.props.totals.distance < 100) {
                            this.props.toggleEarned('Pioneer', null, false);
                        }
                        else if (!activityIds.includes(reward.activityId)) {
                            this.props.toggleEarned('Pioneer', achievementPaceId, true);
                        }
                        break;
                }
            }
        });
    }

    componentDidUpdate(prevProps) {

        if (prevProps.totals !== this.props.totals) {
            this._checkToRemoveRewards();
            this.props.clearActivity();
            navigationService.goBack();
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteActivity: (id) => dispatch(deleteActivity(id)),
        clearActivity: () => dispatch(clearActivity()),
        updateTotals: (uType, dist, dur, aType) => dispatch(updateTotals(uType, dist, dur, aType)),
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

export default connect(mapStateToProps, mapDispatchToProps)(IndividualActivityScreen)