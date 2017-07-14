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
    StyleSheet,
    Platform
} from 'react-native';


class CustomPicker extends Component{
    constructor(props) {
        super(props);
        this.state = {
            language: "java"
        }
    }

    render(){
        return(
            <View style={Platform.OS === 'ios' ? styles.containerIOS : styles.containerAndroid}>
                <Picker style={Platform.OS === 'ios' ? styles.downSelectIOS : styles.downSelectAndroid} prompt="请选择区县" mode="dialog"
                    selectedValue={this.state.language}
                    onValueChange={(lang) => this.setState({language: lang})}
		    itemStyle={{fontSize:16,width:70,color: '#fff'}}>
                        <Picker.Item label="华阳" value="java" />
                        <Picker.Item label="中和和和笔和" value="js" />
                </Picker>
                <View style={Platform.OS === 'ios' ? styles.arrowIOS : styles.arrowAndroid}>
                    <Text style={styles.downArrow}>&#xe900;</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
  containerAndroid: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#ff9123'
  },
  containerIOS: {
      flexDirection:'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#ff9123',
      width: 200,
      height: 30
  },
  downSelectAndroid: {
      width:90,
      margin:0,
      padding:0,
      flexDirection:'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      color: '#fff',
      backgroundColor: 'transparent'
  },
  downSelectIOS: {
      width:90,
      backgroundColor: 'transparent'
  },
  arrowAndroid: {
      position: 'absolute',
      right:10,
      top: 15
  },
  arrowIOS: {
      position: 'absolute',
      right:10,
      top: 4
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
  searchBtn: {
      marginRight: 10,
      fontFamily:'icomoon',
      fontSize: 20,
      color: "#fff"
  }
});
module.exports = CustomPicker;
