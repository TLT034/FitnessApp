import React, { Component } from 'react';
import { Card, CardItem, Text, Body, Content, View, Button } from 'native-base';
import { connect } from 'react-redux';

import { addActivityType } from '../redux/actions/currentActivityActions';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class ActivitySelectCard extends Component {

    render() {

        return (
            <Card>
                <CardItem style={{ flexDirection: 'column' }}>
                    <View style={{ paddingBottom: 5, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>Activity Type</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }} >
                        <Button
                            style={{
                                backgroundColor: this.props.currentActivity.type === 'Run' ?
                                    '#06BEE1' : 'lightgray',
                                margin: 5, height: 75, width: 75, justifyContent: 'center'
                            }}
                            onPress={() => this.props.addActivityType('Run')}
                        >
                            <MaterialIcon size={50} name={'run-fast'} />
                        </Button>
                        <Button
                            style={{
                                backgroundColor: this.props.currentActivity.type === 'Bike' ?
                                    '#1768AC' : 'lightgray',
                                margin: 5, height: 75, width: 75, justifyContent: 'center'
                            }}
                            onPress={() => this.props.addActivityType('Bike')}
                        >
                            <MaterialIcon size={50} name={'bike'} />
                        </Button>
                        <Button
                            style={{
                                backgroundColor: this.props.currentActivity.type === 'Hike' ?
                                    '#2541B2' : 'lightgray',
                                margin: 5, height: 75, width: 75, justifyContent: 'center'
                            }}
                            onPress={() => this.props.addActivityType('Hike')}
                        >
                            <MaterialIcon size={50} name={'image-filter-hdr'} />
                        </Button>
                    </View>
                </CardItem>
            </Card>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addActivityType: (activityType) => dispatch(addActivityType(activityType))
    };
}

function mapStateToProps(state) {
    return { currentActivity: state.currentActivity }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySelectCard)
