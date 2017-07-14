/**
 * Created by Administrator on 2017/5/27.
 */
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import {
    View,
    Image,
    Text,
    Button,
    Picker,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import CustomPicker from './customPicker';

class Top extends Component{
    constructor(props) {
        super(props);
        this.state = {
            language: "java"
        }
    }

    render(){
        return(
             <View style={styles.container}>
                <View style={styles.box}>
                    <CustomPicker/>
                </View>
                 <View style={styles.box2}>
                    <TouchableHighlight style={styles.searchBtnBox} onPress={() => this.onSearch()} underlayColor="#f7900f">
                        <Text style={styles.searchBtn}>&#xe906;</Text>
                    </TouchableHighlight>
                 </View>
            </View>
        );
    }

    onSearch(){
        this.props.navigate('Search', { name: '搜索' });
    }
}
const styles = StyleSheet.create({
  container: {
      flexDirection:'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#ff9123',
      height: 40
  },
  box: {
      flex: 2,
      flexDirection:'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: 30
  },
  box2: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  downSelect: {
      width: 80,
      margin:0,
      padding:0,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff'
  },
  addr: {
      fontSize: 18,
      color: '#ffffff'
  },
  downArrow: {
      fontFamily:'icomoon',
      fontSize: 20,
      color: "#fff"
  },
  searchBtnBox:{
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      width:40,
      height:40
  },
  searchBtn: {
      fontFamily:'icomoon',
      fontSize: 20,
      color: "#fff"
  }
});
module.exports = Top;
