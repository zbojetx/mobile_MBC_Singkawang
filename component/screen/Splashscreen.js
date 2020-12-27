
//
//  
//  Tele health monitor App
//  Copyright © 2020 perfeXia Health Technologies Ltd. All rights reserved.
//

import * as React from 'react';
import { Component } from "react";
import {
    Dimensions,
    Image,
    Text,
    View,
    Animated,
    StatusBar,
    StyleSheet
} from 'react-native';
import Video from 'react-native-video';
import ResponsiveScreen from 'react-native-auto-responsive-screen'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const docPosStrt = (screenWidth / 2) * -1;
const docPosEnd = (screenWidth / 12);
const mePosStrt = (screenWidth / 2)
const mePosEnd = -3
const pfxPosStrt = screenHeight / 2
const pfxPosEnd = screenHeight / 4
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            screen: '',
            showLogin: false,
            fadeAnim: new Animated.Value(0),
            fadeScreen: new Animated.Value(1),
            fadeText: new Animated.Value(0),
            docPos: new Animated.Value(docPosStrt),
            mePos: new Animated.Value(mePosStrt),
            pfxPos: new Animated.Value(pfxPosStrt),
        }
    }

    fadeIn = (fadeTime, fadeVar, nextAnim) => {
        Animated.timing(fadeVar, {
            toValue: 1,
            duration: fadeTime,
            useNativeDriver: true
        }).start(nextAnim);
    };

    fadeOut = (fadeTime, fadeVar, nextAnim) => {
        Animated.timing(fadeVar, {
            toValue: 0,
            duration: fadeTime,
            useNativeDriver: true
        }).start(nextAnim);
    };

    moveX = (moveTime, moveVar, finalPos, nextAnim) => {
        Animated.timing(moveVar, {
            toValue: finalPos,
            duration: moveTime,
            useNativeDriver: true
        }).start(nextAnim);
    };

    firstScreen = () => {
        this.state.fadeAnim,
            this.moveX(1000, this.state.mePos, mePosEnd);
    }

    componentDidMount() {
        console.log('width: ' + screenWidth + ', height: ' + screenHeight)

        this.fadeIn(
            2500,
            this.state.fadeAnim,
            this.moveX(2000, this.state.pfxPos, pfxPosEnd,
                () => {
                    setTimeout(() => {
                        this.fadeOut(3000, this.state.fadeScreen);
                        this.fadeOut(3000, this.state.fadeAnim, () => {
                            this.props.navigation.navigate("Main");
                        });
                    }, 1500)
                }
            ),
        );
    }

    render() {
        StatusBar.setBarStyle('dark-content', true);

        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar translucent backgroundColor='transparent' />




                <Animated.Image style={[{ resizeMode: 'contain', width: wp('80%'), opacity: this.state.fadeAnim }]} source={require("./../assets/img/logox.png")} />


            </View>

        );
    }


}

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: ResponsiveScreen.normalize(0),
        left: ResponsiveScreen.normalize(0),
        bottom: ResponsiveScreen.normalize(0),
        right: ResponsiveScreen.normalize(0),
        zIndex: -999
    },
    Button: {
        width: '100%',
        height: ResponsiveScreen.normalize(50),
        backgroundColor: '#053FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ResponsiveScreen.normalize(10)
    }
});

