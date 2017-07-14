/**
 * Created by Administrator on 2017/5/27.
 */
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import {
    View,
    Image,
    StyleSheet,
    Platform
} from 'react-native';
var Dimensions = require('Dimensions');
var windowWidth=Dimensions.get('window').width;

export default class Banner extends Component{
    render(){
        return(
            <View>
                <Swiper height={windowWidth/3}
                    loop={true}
                    index={0}
                    autoplay={true}
                    autoplayTimeout={5}
                    horizontal={true}
                    paginationStyle={{bottom:5}} >
                        {renderImg()}
                </Swiper>
            </View>
        );
    }
}

const renderImg=function(){
    var imageViews=[];
    var images=[require('../images/bannerImg1.jpg'),require('../images/bannerImg2.jpg'),require('../images/bannerImg3.jpg')];
    for(var i=0;i<images.length;i++){
        imageViews.push(
            <Image
            style={{width:windowWidth,
                resizeMode:'contain',
                marginTop:(Platform.OS === 'ios'?0-(windowWidth/3)*0.5+5:0-(windowWidth/3)*0.5)}}
            key={i}
            source={images[i]} />
        );
    }
    return imageViews;
}