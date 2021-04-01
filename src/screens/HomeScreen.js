import React, { Component } from 'react';
import { Container, Content, Button, Fab } from 'native-base';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import { addActivityType } from '../redux/actions/currentActivityActions';
import { loadTotals } from '../redux/actions/totalActions';
import { loadActivities } from '../redux/actions/activityActions';
import { loadRewards } from '../redux/actions/rewardActions';

import WeatherCard from '../components/WeatherCard';
import TotalsCard from '../components/TotalsCard';
import RewardsCard from '../components/RewardsCard';
import navigationService from '../services/NavigationService';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import dataController from '../services/DataController';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home'
    }

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            latitude: 0,
            longitude: 0,
        }
    }

    componentDidMount() {
        this._loadSavedData();
        this._bonusAlert();
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#f2f2f2' }}>
                {/* Hides activity fab on blur */}
                <NavigationEvents
                    onDidBlur={() => this.setState({active: false})}
                />

                <Content>
                    <WeatherCard refreshable={true} type={'home'} />
                    <TotalsCard />
                    <RewardsCard />
                </Content>

                {/* Activity fab for starting an activity */}
                <Fab
                    style={{ backgroundColor: '#03256C'}}
                    active={this.state.active}
                    direction={'up'}
                    onPress={() => this.setState({ active: !this.state.active })}
                >
                    <MaterialIcon name={'plus'} />
                    <Button
                        style={{ backgroundColor: '#06BEE1' }}
                        onPress={() => this._startActiviy('Run')}
                    >
                        <MaterialIcon size={25} name={'run-fast'} color={'white'} />
                    </Button>
                    <Button
                        style={{ backgroundColor: '#1768AC' }}
                        onPress={() => this._startActiviy('Bike')}
                    >
                        <MaterialIcon size={25} name={'bike'} color={'white'} />
                    </Button>
                    <Button
                        style={{ backgroundColor: '#2541B2' }}
                        onPress={() => this._startActiviy('Hike')}
                    >
                        <MaterialIcon size={25} name={'image-filter-hdr'} color={'white'} />
                    </Button>
                </Fab>
            </Container>
        );
    }

    /** Navigates to the start activity screen */
    _startActiviy(type) {
        this.props.addActivityType(type);
        navigationService.navigate('StartActivity');
    }

    /** Loads users 'totals', 'activities', and 'rewards' from local storage */
    _loadSavedData() {
        dataController.getStorageItem('totals')
            .then(result => {
                this.props.loadTotals(result);
            })
            .catch(error => console.log('No saved totals',error));

        dataController.getStorageItem('activities')
            .then(result => {
               this.props.loadActivities(result);
            })
            .catch(error => console.log('No saved activities', error));

        dataController.getStorageItem('rewards')
            .then(result => {
                this.props.loadRewards(result);
            })
            .catch(error => console.log("No saved rewards",error));
    }

    _bonusAlert() {
        Alert.alert(
            'Bonus Features | Extra Credit',
            '(15pts) Notifications (react-native-push-notifications): Sends notification when you complete and activity.\n\n' +
            '(15pts) Social Sharing (react-native-share): Button at end of activity to share your activity through any social apps you have installed.\n\n' +
            '(10pts) Stats: Stats Info on homescreen that shows your total distance, duration, runs, hikes, and bikes.\n\n' +
            '(5pts) Home Weather: Weather info on homescreen with refresh button and custom loading animation.\n\n' +
            '(5pts) Recent Rewards: Homescreen shows your 3 most recently earned rewards.'
        );
    }
}

/** Redux */
function mapDispatchToProps(dispatch) {
    return {
        addActivityType: (activityType) => dispatch(addActivityType(activityType)),
        loadTotals: (loadedTotals) => dispatch(loadTotals(loadedTotals)),
        loadActivities: (loadedActs) => dispatch(loadActivities(loadedActs)),
        loadRewards: (loadedRew) => dispatch(loadRewards(loadedRew))
    };
}

export default connect(null, mapDispatchToProps)(HomeScreen)