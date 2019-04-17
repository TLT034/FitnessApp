import React, { Component } from 'react';
import { CameraRoll, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';

import { addImage } from '../redux/actions/currentActivityActions';

import navigationService from '../services/NavigationService';


class PicPreviewScreen extends Component {
    static navigationOptions = {
        title: 'Image Preview'
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.preview}
                    source={{uri: this.props.currentActivity.imgPath}}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this._retake()} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}>Retake</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._saveImage()} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _saveImage() {
        CameraRoll.saveToCameraRoll(this.props.currentActivity.imgPath);
        navigationService.navigate('PostActivity');
    };

    _retake() {
        this.props.addImage("No Image");
        navigationService.navigate('Camera');
    }
}


function mapDispatchToProps(dispatch) {
    return {
        addImage: (img) => dispatch(addImage(img))
    };
}

function mapStateToProps(state) {
    return {
        currentActivity: state.currentActivity,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PicPreviewScreen)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});