import React, { Component } from 'react';
import { Card, CardItem, Container, Content, Text, Button, ListItem, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { setActivity, clearActivity } from '../redux/actions/currentActivityActions';

import navigationService from '../services/NavigationService';

class IndividualRewardScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('name', 'Reward') + ' Reward'
        };
    }

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const rewardName = navigation.getParam('name', 'None');

        this.reward;
        this.props.rewards.forEach((reward) => {
            if (reward.name === rewardName) {
                this.reward = reward;
            }
        })

        this.activity = null;
        this.props.activities.forEach((activity) => {
            if (this.reward.activityId === activity.id) {
                this.activity = activity;
            }
        })
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#f2f2f2' }}>
                <Content>
                    <Card>
                        <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }} >
                            {this._renderIcon()}
                            <Text style={{ fontSize: 50, color: '#2541B2' }}>{this.reward.name}</Text>
                        </CardItem>
                        <CardItem style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2'}}>
                            <Text style={{ color: '#2541B2' }}>Description</Text>
                            <Text>{this.reward.description}</Text>
                        </CardItem>
                        <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                            <Text style={{ color: '#2541B2' }}>Activity Earned</Text>
                            {this._renderActivity()}
                        </CardItem>
                    </Card>
                    <Card style={{ height: 50}}>
                        <CardItem style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                style={{ height: 40, alignSelf: 'center' }}
                                transparent
                                onPress={() => {
                                    this.props.clearActivity();
                                    navigationService.navigate('Rewards');
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

    _renderIcon() {
        let iconColor = 'lightgray';
        if (this.reward.earned) { iconColor = 'gold'; }
        let iconName;
        let typeText;
        switch (this.reward.type) {
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

        return <MaterialIcon size={200} name={iconName} color={iconColor} />
    }

    _renderActivity() {

        if (this.activity) {
            let iconName = '';
            let iconColor = '';
            switch (this.activity.type) {
                case 'Run':
                    iconName = 'run-fast';
                    iconColor = '#06BEE1'
                    break;
                case 'Bike':
                    iconName = 'bike';
                    iconColor = '#1768AC'
                    break;
                case 'Hike':
                    iconName = 'image-filter-hdr';
                    iconColor = '#2541B2'
                    break;
            }

            return (
                <ListItem
                    icon
                    button
                    onPress={() => {
                        this.props.setActivity(this.activity);
                        navigationService.navigate('IndividualActivity', {canDelete: false});
                    }}>
                    <Left>
                        <Button style={{ backgroundColor: iconColor }}>
                            <MaterialIcon name={iconName} size={25} />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{this.activity.type}</Text>
                    </Body>
                    <Right>
                        <Text>{this.activity.date.dateStr}</Text>
                    </Right>
                </ListItem>
            );
        }
        else {
            return <Text>Activity Deleted or Reward Not Yet Earned!</Text>
        }
    }
}



function mapDispatchToProps(dispatch) {
    return {
        setActivity: (activityObj) => dispatch(setActivity(activityObj)),
        clearActivity: () => dispatch(clearActivity())
    };
}

function mapStateToProps(state) {
    return {
        rewards: state.rewards,
        activities: state.activities
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualRewardScreen)