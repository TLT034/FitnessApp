import React, { Component } from 'react';
import { Card, CardItem, Text, Body, Content, View, Button } from 'native-base';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { addActivityType } from '../redux/actions/currentActivityActions';
import styles from '../styles/ASelectStyles';

class ActivitySelectCard extends Component {

    render() {

        return (
            /* Card similar to radio button group, allowing user to select what type of activity they are doing */
            <Card>
                <CardItem style={{ flexDirection: 'column' }}>
                    <View style={styles.header}>
                        <Text style={styles.headerFont}>Activity Type</Text>
                    </View>
                    <View style={styles.selectContainer} >
                        <Button
                            style={{
                                backgroundColor: this.props.currentActivity.type === 'Run' ?
                                    '#06BEE1' : 'lightgray',
                                ...styles.activity
                            }}
                            onPress={() => this.props.addActivityType('Run')}
                        >
                            <MaterialIcon size={50} name={'run-fast'} />
                        </Button>
                        <Button
                            style={{
                                backgroundColor: this.props.currentActivity.type === 'Bike' ?
                                    '#1768AC' : 'lightgray',
                                ...styles.activity
                            }}
                            onPress={() => this.props.addActivityType('Bike')}
                        >
                            <MaterialIcon size={50} name={'bike'} />
                        </Button>
                        <Button
                            style={{
                                backgroundColor: this.props.currentActivity.type === 'Hike' ?
                                    '#2541B2' : 'lightgray',
                                ...styles.activity
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
