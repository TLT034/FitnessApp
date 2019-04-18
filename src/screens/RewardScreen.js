import React, { Component } from 'react';
import { Segment, Container, Header, Content, Text, View, Button, Card, CardItem, Left, Right, ProgressBar } from 'native-base';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { filterRewards } from '../redux/actions/rewardActions';

import navigationService from '../services/NavigationService';
import filteredRewards from '../redux/reducers/filteredRewards';

class RewardScreen extends Component {
    static navigationOptions = {
        title: 'Rewards'
    }

    constructor(props) {
        super(props);

        this.state = {
            allActive: true,
            personalActive: false,
            levelActive: false,
            achievementActive: false
        }
    }

    render() {
        return (
            <Container>
                <NavigationEvents
                    onWillFocus={() => {
                        switch (true) {
                            case this.state.allActive:
                                this._allPressed();
                                break;
                            case this.state.personalActive:
                                this._personalPressed();
                                break;
                            case this.state.levelActive:
                                this._levelPressed();
                                break;
                            case this.state.achievementActive:
                                this._achievementPressed();
                                break;
                        }
                    }}
                />
                <Segment style={{backgroundColor: '#03256C'}}> 
                    <Button first active={this.state.allActive}
                        onPress={() => this._allPressed()}>
                        <Text>All</Text>
                    </Button>
                    <Button active={this.state.personalActive}
                        onPress={() => this._personalPressed()}>
                        <Text>Personal</Text>
                    </Button>
                    <Button active={this.state.levelActive}
                        onPress={() => this._levelPressed()}>
                        <Text>Level</Text>
                    </Button>
                    <Button last active={this.state.achievementActive}
                        onPress={() => this._achievementPressed()}>
                        <Text>Achievement</Text>
                    </Button>
                </Segment>
                <Content>
                    {this._renderLevel()}
                    {this._renderBests()}
                    {this._renderRewards()}
                </Content>
            </Container>
        );
    }

    _renderLevel() {
        if (this.state.levelActive) {
            let t = this.props.totals;
            let numActivities = t.runs + t.hikes + t.bikes;
            let level = (Math.floor(numActivities / 5)) + 1;
            let numToLvlUp = 5 - (numActivities % 5);
            let barProgress = (((numActivities % 5) / 5) * 100).toString() + '%';

            return (
                <Card>
                    <CardItem style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <Text style={{ fontSize: 35, color: '#2541B2' }}>Level {level}</Text>
                        <Text>{numToLvlUp} more activities until level {level + 1}!</Text>
                    </CardItem>
                    <CardItem style={{flexDirection: 'column'}}>
                        <Text>Level Up Progress</Text>
                        <View
                            style={{
                                justifyContent: 'center', borderWidth: 2, borderColor: '#03256C',
                                width: '90%', height:28, backgroundColor: 'lightgray'
                            }}>
                            <View
                                style={{
                                    width: barProgress, height: 24, backgroundColor: '#06BEE1'
                                }} />
                        </View>
                    </CardItem>
                </Card>
            );
        }
    }

    _renderBests() {
        if (this.state.personalActive) {
            return (   
                <Card>
                    <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                        <Text>Best Duration</Text>
                        <Text style={{ fontSize: 15, color: '#2541B2' }}>{this._getDuration()}</Text>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                        <Text>Best Distance</Text>
                        <Text style={{ fontSize: 15, color: '#2541B2' }}>{this._getDistance()}</Text>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                        <Text>Best Pace</Text>
                        <Text style={{ fontSize: 15, color: '#2541B2' }}>{this._getPace()}</Text>
                    </CardItem>
                </Card>
            );
        }
    }

    _renderRewards() {
        let rewards = [];

        this.props.filteredRewards.forEach((reward) => {
            let iconColor = 'lightgray';
            if (reward.earned) { iconColor = 'gold'; }
            let iconName;
            let typeText;
            switch (reward.type) {
                case 'Level':
                    iconName = 'trophy';
                    typeText = 'Up!';
                    break;
                case 'Personal':
                    iconName = 'account-star';
                    typeText = 'Best!';
                    break;
                case 'Achievement':
                    iconName = 'trophy-award';
                    typeText = '';
                    break;
            } 

            rewards.push(
                <View key={reward.name}
                    style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
                >
                    <Button
                        transparent
                        onPress={() => navigationService.navigate('IndividualReward', { name: reward.name })}
                    >
                        <MaterialIcon size={100} name={iconName} color={iconColor} />
                    </Button>
                    <Text style={{ paddingTop: 25, alignSelf: 'center' }}>{reward.type} {typeText}</Text>
                    <Text style={{ paddingBottom: 20, alignSelf: 'center' }}>{reward.name}</Text>
                </View>
            );
        });

        return (<View style={{ paddingTop: 25, flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>{rewards}</View>);
    }

    _allPressed() {
        this.setState({
            allActive: true,
            personalActive: false,
            levelActive: false,
            achievementActive: false
        }, () => this._filterRewards('All'));
    }

    _personalPressed() {
        this.setState({
            allActive: false,
            personalActive: true,
            levelActive: false,
            achievementActive: false
        }, () => this._filterRewards('Personal'));
    }

    _levelPressed() {
        this.setState({
            allActive: false,
            personalActive: false,
            levelActive: true,
            achievementActive: false
        }, () => this._filterRewards('Level'));
    }

    _achievementPressed() {
        this.setState({
            allActive: false,
            personalActive: false,
            levelActive: false,
            achievementActive: true
        }, () => this._filterRewards('Achievement'));
    }

    _filterRewards(type) {
        this.props.filterRewards(this.props.rewards,type);
    }

    _getDuration() {
        let sec_num;

        this.props.rewards.forEach((reward) => {
            if (reward.name === 'Duration') {
                sec_num = reward.stat;
            }
        })

        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

    _getDistance() {
        let dist;
        this.props.rewards.forEach((reward) => {
            if (reward.name === 'Distance') {
                dist = reward.stat;
            }
        })
        return dist.toFixed(3) + ' mi';
    }

    _getPace() {
        let pace;
        this.props.rewards.forEach((reward) => {
            if (reward.name === 'Pace') {
                pace = reward.stat;
            }
        })
        return pace.toFixed(2) + ' mph';
    }
}


function mapDispatchToProps(dispatch) {
    return {
        filterRewards: (rewards, type) => dispatch(filterRewards(rewards,type))
    };
}

function mapStateToProps(state) {
    return {
        rewards: state.rewards,
        filteredRewards: state.filteredRewards,
        totals: state.totals
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardScreen);