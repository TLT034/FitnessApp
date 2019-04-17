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
                <CardItem style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                    <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Stats</Text>
                </CardItem>
                <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                    <Text>Total Distance Traveled</Text>
                    <Text style={{ fontSize: 25, color: '#2541B2' }}>{this.props.totals.distance.toFixed(2)} miles</Text>
                </CardItem>
                <CardItem style={{ flexDirection: 'column', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }}>
                    <Text>Total Exercise Time</Text>
                    <Text style={{ fontSize: 25, color: '#2541B2' }}>{this._formatTime()}</Text>
                </CardItem>
                <CardItem style={{ justifyContent: 'space-evenly' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Runs</Text>
                        <Text style={{ fontSize: 25, color: '#06BEE1' }}>{this.props.totals.runs}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Bikes</Text>
                        <Text style={{ fontSize: 25, color: '#1768AC' }}>{this.props.totals.bikes}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Hikes</Text>
                        <Text style={{ fontSize: 25, color: '#2541B2' }}>{this.props.totals.hikes}</Text>
                    </View>
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