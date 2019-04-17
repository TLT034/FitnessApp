import React, { Component } from 'react';
import { CameraRoll, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { addImage } from '../redux/actions/currentActivityActions';

import navigationService from '../services/NavigationService';


class CameraScreen extends Component {
    static navigationOptions = {
        title: 'Capture Image'
    }

    constructor(props) {
        super(props);
        this.state = {
            frontCamera: true
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    
                    type={
                        this.state.frontCamera ?
                            RNCamera.Constants.Type.front :
                            RNCamera.Constants.Type.back
                    }
                    flashMode={RNCamera.Constants.FlashMode.auto}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.takePicture()} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._flipCamera()} style={styles.capture}>
                        <MaterialIcon name={'camera-party-mode'} size={35} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    takePicture() {
        if (this.camera) {
            const options = {
                quality: 0.5,
                base64: true,
                forceUpOrientation: true,
                fixOrientation: true,
                mirrorImage: this.state.frontCamera
            };
            this.camera.takePictureAsync(options)
                .then(result => {
                    this.props.addImage(result.uri);
                })
                .catch(error => console.log('error:', error));
        }

        navigationService.navigate('PicPreview');
    };

    _flipCamera() {
        this.setState((prevState) => {
            return {
                frontCamera: !prevState.frontCamera
            };
        });
    }
}


function mapDispatchToProps(dispatch) {
    return {
        addImage: (img) => dispatch(addImage(img))
    };
}


export default connect(null, mapDispatchToProps)(CameraScreen)



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