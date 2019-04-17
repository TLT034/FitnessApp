import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Button, View, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';

import MapCard from '../components/MapCard';
import WeatherCard from '../components/WeatherCard';
import ActivitySelectCard from '../components/ActivitySelectCard';
import navigationService from '../services/NavigationService';


export default class StartActivityScreen extends Component {
    static navigationOptions = {
        title: 'Create Activity'
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#f2f2f2' }} >
                <Content>
                    <ActivitySelectCard />
                    <WeatherCard refreshable={false} type={'start'} />
                    <MapCard title={'Starting Position'} type={'start'}/>
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
                                style={{ height: 40, alignSelf: 'center' }}
                                transparent
                                onPress={() => navigationService.navigate('DuringActivity')}
                            >
                                <Text style={{fontSize: 15, fontWeight: 'bold', color: '#2541B2'}}>Start Activity</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }

}

