import React, { Component } from 'react';
import { Card, CardItem, Text, Body, Content, View, } from 'native-base';
import { connect } from 'react-redux';



class TotalsCard extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>Stats</Text>
                        <Text>Total Distance Traveled: {this.props.totals.distance.toFixed(2)} miles</Text>
                        <Text>Total Exercise Time: {this._formatTime()}</Text>
                        <View style={{ paddingTop: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ paddingHorizontal: 0, width: '32.66%', backgroundColor: '#06BEE1', alignItems: 'center' }} >
                                <Text>Runs: {this.props.totals.runs}</Text>
                            </View>
                            <View style={{ paddingHorizontal: 0, width: '32.66%', backgroundColor: '#1768AC', alignItems: 'center' }} >
                                <Text>Bikes: {this.props.totals.bikes}</Text>
                            </View>
                            <View style={{ paddingHorizontal: 0, width: '32.66%', backgroundColor: '#2541B2', alignItems: 'center' }} >
                                <Text>Hikes: {this.props.totals.hikes}</Text>
                            </View>
                        </View>
                    </Body>
                </CardItem>
            </Card>
        );
    }

    _formatTime() {
        let sec_num = this.props.totals.duration;
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

}

function mapStateToProps(state) {
    return {
        totals: state.totals
    };
}

export default connect(mapStateToProps)(TotalsCard);