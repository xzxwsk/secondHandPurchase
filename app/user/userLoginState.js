/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

var STORAGE_KEY_ONE = '@AsyncStorageDemokeyone';
var STORAGE_KEY_MESSAGE = '@AsyncStorageDemokeymessage';
//简单封装一个组件
class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
};

class UserLoginState extends Component {
    constructor(props){
        super(props);
        this.state={
            messages:[],
        };
    }
    //组件挂载之后回调方法
    componentDidMount(){
        this._loadInitialState().done();
    }
    //初始化数据-默认从AsyncStorage中获取数据
    async _loadInitialState(){
        //try{
        //    var value=await AsyncStorage.getItem(STORAGE_KEY_ONE);
        //    if(value!=null){
        //        this._appendMessage('从存储中获取到数据为:'+value);
        //    }else{
        //        this._appendMessage('存储中无数据,初始化为空数据');
        //    }
        //}catch(error){
        //    this._appendMessage('AsyncStorage错误'+error.message);
        //}
        //load 读取
        storage.load({
            key: STORAGE_KEY_ONE,
        }).then(ret =>  {
            console.log("then");
            console.log(ret);
            this._appendMessage('从存储中获取到数据为:'+ret)
        })
        .catch(error =>{
            console.log("error:");
            console.log(error);
            this._appendMessage('AsyncStorage错误:'+error);
        }).done((ret) =>{
            console.log("done");
            console.log("ret:");
            console.log(ret);
        });
    }
    //进行储存数据_ONE
    async _saveValue_One(){
        storage.save({
            key: STORAGE_KEY_ONE,  // 注意:请不要在key中使用_下划线符号!
            data: 'some other site',

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: 1000 * 3600
        }).done(
            () => this._appendMessage('保存到存储的数据为:' + 'some other site')
        );
        //try{
        //    var value=await AsyncStorage.getItem(STORAGE_KEY_ONE);
        //    console.log(value);
        //    if(value!=null){
        //        this._appendMessage('已有存储的数据为:' + value);
        //    }else {
        //        await AsyncStorage.setItem(STORAGE_KEY_ONE, '我是老王');
        //        this._appendMessage('保存到存储的数据为:' + '我是老王');
        //    }
        //}catch(error){
        //    this._appendMessage('AsyncStorage错误'+error.message);
        //}
    }
    //进行存储数据删除_ONE
    async _removeValue_One(){
        //try{
        //    await AsyncStorage.removeItem(STORAGE_KEY_ONE);
        //    var value=await AsyncStorage.getItem(STORAGE_KEY_ONE);
        //    console.log(value);
        //    this._appendMessage('数据删除成功...');
        //}catch(error){
        //    this._appendMessage('AsyncStorage错误'+error.message);
        //}
        storage.remove({
            key: STORAGE_KEY_ONE,
        }).done(
            () => this._appendMessage('数据删除成功...')
        )
    }
    //进行把message信息添加到messages数组中
    _appendMessage(message){
        let newMsg = this.state.messages.concat(message);
        this.setState({messages: newMsg});
    }
    render() {
        return (
            <View>
                <Text style={styles.welcome}>
                    AsyncStorage使用实例
                </Text>
                <CustomButton text='点击存储数据' onPress={this._saveValue_One.bind(this)}/>
                <CustomButton text='点击删除数据' onPress={this._removeValue_One.bind(this)}/>
                <Text style={styles.content}>信息为:</Text>
                {this.state.messages.map((m,i) => <Text style={styles.content} key={i}>{m}</Text>)}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    welcome: {
        fontSize: 14,
        textAlign: 'left',
        margin: 10,
    },
    content:{
        fontSize: 13,
        textAlign: 'left',
        margin: 10,
    },
    button: {
        margin:5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    }
});

export default UserLoginState;