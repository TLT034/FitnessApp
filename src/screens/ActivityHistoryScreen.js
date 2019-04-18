import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { Card, CardItem, Container, Content, Text, Button, Picker, List, ListItem, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationService from '../services/NavigationService';
import { filterActivities } from '../redux/actions/activityActions';
import { setActivity } from '../redux/actions/currentActivityActions';


class ActivityHistoryScreen extends Component {
    static navigationOptions = {
        title: 'Activities'
    }

    constructor(props) {
        super(props);

        this.state = {
            viewValue: 'All',
            sortValue: 'Date',
            rangeValue: 'Week',
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#f2f2f2' }} >
                <NavigationEvents
                    onWillFocus={() => this._applyFilters()}
                />
                <Content>
                    <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }} >
                        <Text style={{ fontSize: 15, color: '#2541B2' }}>View</Text>
                        <Text style={{ fontSize: 15, color: '#2541B2' }}>Sort By</Text>
                        <Text style={{ fontSize: 15, color: '#2541B2' }}>Range</Text>
                    </View>
                    <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }} >
                        <Picker
                            selectedValue={this.state.viewValue}
                            onValueChange={(value) => this.setState({ viewValue: value }) }
                        >
                            <Picker.Item label='All' value='All' />
                            <Picker.Item label='Runs' value='Run' />
                            <Picker.Item label='Bikes' value='Bike' />
                            <Picker.Item label='Hikes' value='Hike' />
                        </Picker>
                        <Picker
                            selectedValue={this.state.sortValue}
                            onValueChange={(value) => this.setState({ sortValue: value })}
                        >
                            <Picker.Item label='Date' value='Date' />
                            <Picker.Item label='Pace' value='Pace' />
                            <Picker.Item label='Duration' value='Duration' />
                        </Picker>
                        <Picker
                            selectedValue={this.state.rangeValue}
                            onValueChange={(value) => this.setState({ rangeValue: value })}
                        >
                            <Picker.Item label='Week' value='Week' />
                            <Picker.Item label='Month' value='Month' />
                            <Picker.Item label='Year' value='Year' />
                        </Picker>
                    </View>
                    <Button
                        style={{ width: '100%', height: 40, justifyContent: 'center', borderTopWidth: 1, borderBottomWidth: 1 }}
                        transparent
                        onPress={() => this._applyFilters()}
                    >
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2541B2' }}>Apply</Text>
                    </Button>
                    <List>
                        <FlatList
                            data={this.props.filteredActivities}
                            renderItem={this._renderItem}
                            keyExtractor={(item) => item.type + item.id.toString()}
                        />
                    </List>
                </Content>
            </Container>
        );
    }

    _applyFilters() {
        this.props.filterActivities(
            this.props.activities,
            this.state.viewValue,
            this.state.sortValue,
            this.state.rangeValue);
    }

    _renderItem = ({ item }) => {
        let iconName = '';
        let iconColor = '';
        switch (item.type) {
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
                    this.props.setActivity(item);
                    navigationService.navigate('IndividualActivity')
                }}>
                <Left>
                    <Button style={{ backgroundColor: iconColor }}>
                        <MaterialIcon name={iconName} size={25} />
                    </Button>
                </Left>
                <Body>
                    <Text>{item.type}</Text>
                </Body>
                <Right>
                    <Text>{item.date.dateStr}</Text>
                </Right>
            </ListItem>
        );
    }

}


function mapDispatchToProps(dispatch) {
    return {
        filterActivities: (a, t, s, r) => dispatch(filterActivities(a, t, s, r)),
        setActivity: (activityObj) => dispatch(setActivity(activityObj))
    };
}

function mapStateToProps(state) {
    return {
        activities: state.activities,
        filteredActivities: state.filteredActivities
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityHistoryScreen)