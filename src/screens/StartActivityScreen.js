import React, { Component } from 'react';
import { Container, Content, Text, Button, Card, CardItem } from 'native-base';

import MapCard from '../components/MapCard';
import WeatherCard from '../components/WeatherCard';
import ActivitySelectCard from '../components/ActivitySelectCard';
import navigationService from '../services/NavigationService';


export default class StartActivityScreen extends Component {
    static navigationOptions = {
        title: 'Create Activity'
    }

    constructor(props) {
        super(props);

        this.state = {
            disabled: true
        }
    }


    render() {
        return (
            <Container style={{ backgroundColor: '#f2f2f2' }} >
                <Content>
                    <ActivitySelectCard />
                    <MapCard title={'Starting Position'} type={'start'} updated={() => this._updated()}/>
                    <WeatherCard refreshable={false} type={'start'} />
                    <Card style={{ height: 50, margin: 0, padding: 0}}>
                        <CardItem style={{ height: 40, margin: 0, padding: 0, justifyContent: 'space-evenly'}}>
                            <Button
                                style={{ height: 40, alignSelf: 'center' }}
                                transparent
                                onPress={() => navigationService.navigate('Home')}
                            >
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2541B2' }}>Cancel Activity</Text>
                            </Button>
                            <Button
                                disabled={this.state.disabled}
                                active={this.state.active}
                                style={{ height: 40, alignSelf: 'center' }}
                                transparent
                                onPress={() => navigationService.navigate('DuringActivity')}
                            >
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: this.state.disabled ? 'gray' : '#2541B2'}}>Start Activity</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }

    _updated() {
        setTimeout(() => { this.setState({ disabled: false }) }, 100);
    }
}

