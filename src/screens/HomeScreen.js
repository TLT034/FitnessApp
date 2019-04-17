import React, { Component } from 'react';
import { Container, Content, Text, Button, Fab } from 'native-base';
import { PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import { addActivityType } from '../redux/actions/currentActivityActions';

import WeatherCard from '../components/WeatherCard';
import TotalsCard from '../components/TotalsCard';
import RewardsCard from '../components/RewardsCard';
import navigationService from '../services/NavigationService';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home'
    }

    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    componentDidMount() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#f2f2f2' }}>
                <NavigationEvents
                    onDidBlur={() => this.setState({active: false})}
                />
                <Content>
                    <WeatherCard refreshable={true} />
                    <TotalsCard />
                    <RewardsCard />
                </Content>
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
                        <MaterialIcon size={25} name={'run-fast'} />
                    </Button>
                    <Button
                        style={{ backgroundColor: '#1768AC' }}
                        onPress={() => this._startActiviy('Bike')}
                    >
                        <MaterialIcon size={25} name={'bike'} />
                    </Button>
                    <Button
                        style={{ backgroundColor: '#2541B2' }}
                        onPress={() => this._startActiviy('Hike')}
                    >
                        <MaterialIcon size={25} name={'image-filter-hdr'} />
                    </Button>
                </Fab>
            </Container>
        );
    }

    _startActiviy(type) {
        this.props.addActivityType(type);
        navigationService.navigate('StartActivity');
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addActivityType: (activityType) => dispatch(addActivityType(activityType))
    };
}

export default connect(null, mapDispatchToProps)(HomeScreen)