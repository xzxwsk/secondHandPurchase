/**
 * Created by Administrator on 2017/5/25.
 */
import React, { Component } from 'react';
import {
    Image,
    Button,
    View,
    Text,
    StyleSheet,
    ListView,
    TextInput,
    Alert,
    TouchableHighlight,
    Platform
} from 'react-native';

import Banner from '../common/banner';

// 导入json数据
var msgData = require('./msglist.json');
// 一些常量设置
var Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;
export default class MessageList  extends Component{
    static navigationOptions = {
        tabBarLabel: '消息',
        tabBarIcon: ({ tintColor }) => (
            <View style={Platform.OS==="ios"?styles.tarBarIconIOS:styles.tarBarIconAndroid}>
                <Text style={[styles.iconStyle, {color: tintColor}]}>&#xe90e;</Text>
                <Text style={{fontSize:16,color: tintColor}}>消息</Text>
            </View>
        ),
    };
    // 初始化模拟数据
    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        ds: ds,
        dataSource: ds.cloneWithRows(msgData.data),
        selectCategoryIndex: 0
      };
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
          <View style={[styles.container,{marginTop:(Platform.OS === 'ios'?20:0)}]}>
              <Text style={styles.msgTop}>消息</Text>
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
              />
          </View>
        );
    }
    // 返回cell
    renderRow(data: string, sectionID: number, rowID: number){
        return(
          <View style={styles.innerViewStyle}>
            <View style={{flex: 1, backgroundColor: '#ffffff', marginBottom: 10}}>
                <TouchableHighlight style={{flex: 1}}
                    underlayColor="transparent"
                    onPress={() => this.toProductsDtl()}>
                <View style={{flex: 1, flexDirection: 'row',paddingHorizontal:5,paddingVertical: 3}}>
                  <View style={{flex: 2}}>
                    <Image
                      style={styles.thumbnail}
                      source={{uri: data.thumbnail}} />
                  </View>
                  <View style={{flex: 3}}>
                    <View style={{flex: 5}}><Text style={styles._name} >{data.name}</Text></View>
                    <View style={{flex: 1,flexDirection:'row'}}>
                        <Text style={styles._nprice}>￥{data.n_prive}</Text>
                        <View style={{flex: 1,flexDirection:'row'}}>
                          <Text style={{marginTop: 3,color:'#999999'}}>{data.num}条留言</Text>
                          <View style={styles.replyStyle}>
                            <Text style={{color: '#ffffff'}}>{data.unread_num}</Text>
                          </View>
                        </View>
                    </View>
                  </View>
                </View>
                </TouchableHighlight>
                <View style={styles._msgBoxStyle}>
                  <TouchableHighlight style={{flex:1,paddingHorizontal: 10}} underlayColor="#ededed" onPress={() => this.showGuest(rowID)}>
                      <View style={{flex:1,flexDirection: 'column'}}>
                          <View style={{flex: 1,flexDirection:'row'}}>
                            <View style={{flex: 1,flexDirection:'row'}}>
                              <Image
                                style={styles.userImg}
                                source={{uri: data.user_img}} />
                                <Text style={styles.userName}>{data.user_name}</Text>
                            </View>
                            <View style={{flex: 1}}>
                              <Text style={styles.qaTime}>{data.time}</Text>
                            </View>
                          </View>
                          <View style={{flex: 1}}>
                                <Text style={styles.msgContent}>{data.content}</Text>
                          </View>
                      </View>
                  </TouchableHighlight>
                  <View style={this.state.selectCategoryIndex==rowID?styles.guestInfo:styles.guestInfoHide} rowID={rowID}>
                     <TextInput
                        style={styles._input}
                        maxLength = {300}
                        underlineColorAndroid='transparent'
                     />
                     <View style={{flex: 1,flexDirection:'row'}}>
                       <Text style={{flex: 1,color:'#999', marginTop:8}}>你还可以输入300个字</Text>
                       <TouchableHighlight style={styles._replyBtn} underlayColor="#ff991a" onPress={() => this._onPressBtn(rowID)}>
                           <Text style={styles.btnText}>回复</Text>
                       </TouchableHighlight>
                     </View>
                  </View>
                </View>
              </View>
          </View>
        );
    }
    _onPressBtn(rowID){
        console.log("回复");
    };
    showGuest(rowId){
        this.setState({
            selectCategoryIndex: rowId,
            dataSource: this.state.ds.cloneWithRows(msgData.data)
        });
    };
    toProductsDtl() {
        this.props.navigation.navigate('ProductsDtl', { name: '商品详情' });
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        flex: 1,
        fontFamily:'icomoon',
        fontSize: 30,
        textAlign: 'center'
    },
    tarBarIconAndroid:{
    	flex:1,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'
    },
    tarBarIconIOS:{
    	flex:1,paddingVertical:10,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#eeeeee',
    },
    innerViewStyle: {
      backgroundColor: '#eeeeee'
    },
    msgTop: {
      backgroundColor: '#ff9123',
      height: 40,
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 18,
      lineHeight: 30
    },
    thumbnail:{
      margin: 5,
      width: 2/5*screenW-25,
      height:4/13*screenW-25
    },
    _nprice:{
      color: '#f7900f',
      fontSize: 16,
      flex: 1
    },
    replyStyle:{
      backgroundColor:'#e60012',
      height:20,
      marginTop:5,
      paddingLeft:8,
      paddingRight:8,
      borderRadius:3,
      marginLeft: 5
    },
    _msgBoxStyle:{
      flex: 1,
      borderWidth: 1,
      borderColor: '#dddddd',
      paddingBottom: 10
    },
    guestInfo: {
        flex:1,
        marginHorizontal: 10
    },
    guestInfoHide:{
        height:0,
        borderWidth: 0,
        paddingBottom:0,
        overflow: 'hidden'
    },
    userImg:{
      width: 30,
      height: 30,
      borderRadius: 15,
      marginLeft: 5,
      marginTop: 5
    },
    userName:{
      marginTop: 10,
      color:'#999999',
      marginLeft: 3,
      fontSize: 16
    },
    qaTime:{
      marginTop: 10,
      color:'#999999',
      fontSize: 16,
      textAlign: 'right',
      marginRight: 15
    },
    msgContent:{
      marginLeft: 5,
      color:'#333333',
      fontSize: 16,
      marginTop: 3
    },
    _input: {
        height: 35,
        borderWidth: 1,
        backgroundColor: '#fff',
        marginTop: 3,
        borderRadius: 3,
        borderColor: '#ccc',
        padding: 0,
        paddingLeft: 5
    },
    _replyBtn:{
        backgroundColor:'#f7900f',
        width: 60,
        height: 30,
        marginTop: 5,
        borderRadius: 3
    },
    btnText: {
        color: '#fff',
        marginTop: 5,
        textAlign: 'center'
    },
    _replyBoxHide: {
      height : 0,
      borderWidth: 0
    },
    _replyBoxShow: {
      padding: 5,
      height : 75
    }
});
