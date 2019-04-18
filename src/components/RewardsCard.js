import React, { Component } from 'react';
import { Card, CardItem, Text, Body, Content, View, } from 'native-base';
import { connect } from 'react-redux';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


class RewardsCard extends Component {

    render() {
        return (
            <Card>
                <CardItem header style={{justifyContent: 'center'}}>
                    <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>Recently Earned Rewards</Text>
                </CardItem>
                <CardItem style={{justifyContent: 'space-evenly'}}>
                    {this._renderRewards()}
                </CardItem>
            </Card>
        );
    }

    _renderRewards() {
        let earnedRewards = [];
        this.props.rewards.forEach((reward) => {
            if (reward.earned) {
                earnedRewards.push(reward);
            }
        })

        let recentRewards = earnedRewards.slice(Math.max(earnedRewards.length - 3, 0));

        let rewardComponents = [];

        recentRewards.forEach((reward) => {
            let iconName;
            let typeText;
            switch (reward.type) {
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

            rewardComponents.push(
                <View key={reward.name}
                    style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}
                >
                    <MaterialIcon size={100} name={iconName} color={'gold'} />
                    <Text style={{ alignSelf: 'center' }}>{reward.type} {typeText}</Text>
                    <Text style={{ alignSelf: 'center' }}>{reward.name}</Text>
                </View>
            )
        })

        return (<View style={{flexDirection: 'row', justifyContent: 'space-evenly' }}>{rewardComponents}</View>);
    }

}

function mapStateToProps(state) {
    return {
        rewards: state.rewards
    };
}

export default connect(mapStateToProps)(RewardsCard);