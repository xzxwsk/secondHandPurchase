/**
 * Created by Administrator on 2017/5/27.
 */
import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TextInput,
    Button,
    Picker,
    TouchableHighlight,
    StyleSheet,
    Platform
} from 'react-native';


class SearchBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    handleFocus(text) {
        this.props.clickSearch(("" == text || typeof(text) == "undefined") ? 0 : -9999);
    };

    render(){
        //const { navigate } = this.props.navigation;
        return(
             <View style={styles.container}>
                 <TextInput multiline={false} style={Platform.OS === 'ios'?styles.searchIptIOS:styles.searchIptAndroid} placeholder="请输入关键字" value={this.state.text} placeholderTextColor="#ccc" underlineColorAndroid="transparent"
                    clearButtonMode="while-editing"
                    onChangeText={(text) => {this.setText({text})}}
                    onFocus = {() => this.handleFocus()}
                 />
                 <TouchableHighlight style={styles.searchBtnBox} onPress={() => this.onSearch()} underlayColor="#ff991a">
                    <Text style={styles.searchBtn}>&#xe906;</Text>
                 </TouchableHighlight>
            </View>
        );
    };
    onSearch(){
        this.props.clickSearch(-9999);
    };
    setText(text){
        this.setState({text});
        this.props.clickSearch(0);
    };
}
const styles = StyleSheet.create({
  container: {
      flex:1,
      flexDirection:'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#ff9123',
      width: 300,
      height: 40
  },
  searchIptAndroid: {
      margin:0,
      paddingTop:0,
      paddingBottom:0,
      paddingLeft:20,
      paddingRight:20,
      width:270,
      height:30,
      fontSize:16,
      color: '#999',
      backgroundColor: "#fff"
  },
  searchIptIOS: {
      margin:0,
      paddingTop:0,
      paddingBottom:0,
      paddingLeft:10,
      paddingRight:10,
      width:280,
      height:30,
      fontSize:16,
      backgroundColor: "#fff",
      alignSelf:'center'
  },
    searchBtnBox:{
        width:40,
        height:40,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBtn: {
        fontFamily:'icomoon',
        fontSize: 20,
        color: "#fff"
    }
});
module.exports = SearchBox;
