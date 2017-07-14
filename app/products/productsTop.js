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
    StyleSheet,
    TextInput
} from 'react-native';
class ProductsTop extends Component{
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
              <TextInput style={styles._input}
                  onChangeText={(text) => this.setState({text})}
                  clearButtonMode="while-editing"
                  value={this.state.text}
                  maxLength = {40}
                  underlineColorAndroid='transparent'
                  placeholder='搜索商品信息'
                  placeholderTextColor='#ccc'
              />
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
        //this.props.navigate('Search', { name: '搜索' });
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
      flex: 19,
      paddingRight: 30,
      marginLeft: 10
  },
  box2: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  _input: {
      height: 30,
      borderWidth: 1,
      backgroundColor: '#fff',
      marginTop: 3,
      borderRadius: 3,
      borderColor: '#fff',
      padding: 0,
      paddingLeft: 5

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
module.exports = ProductsTop;
