/**
 * Created by Administrator on 2017/5/25.
 */
/**
 * secondHandPurchase React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ART,
    TouchableHighlight,
    BackHandler,
    ToastAndroid,
    ListView,
    Platform
} from 'react-native';

import SplashScreen from '../js/SplashScreen';
import Banner from './common/banner';

const {Surface, Shape, Path} = ART;
const STORAGE_KEY_LOGIN = "login";

var MainList = require("./common/list");
var MainTop = require("./common/top");

class Main extends Component {
    constructor(props){
        super(props);
        //this._onExitApp = this.exitApp.bind(this);
    }

    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({ tintColor }) => (
            <View style={Platform.OS === 'ios' ? styles.mainTabBarIconIOS: styles.mainTabBarIconAndroid}>
                <Text style={[styles.iconStyle, {color: tintColor}]}>&#xe90a;</Text>
                <Text style={{fontSize:16,color: tintColor}}>首页</Text>
            </View>
        )
    }
    componentDidMount() {
        //SplashScreen.hide();
    //    this.state = {
    //        lastBackPressed: Date.now()
    //    }
    //    BackHandler.addEventListener('hardwareBackPress', () => this.exitApp());//监听安卓回退按钮
        this.getLoginState();
    }
    componentWillUnmount() {
    //    console.log("main Unmount");
    //    BackHandler.removeEventListener('hardwareBackPress', () => this.exitApp());
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
              <View style={{marginTop:(Platform.OS === 'ios'?20:0)}}>
                  <MainTop navigate={ navigate }/>
              </View>
              <Banner/>
              <Text style={styles.main_title}>最新信息</Text>
              <MainList navigate={ navigate }/>
            </View>
        );
    }
    /**
     * 回退
     */
    exitApp() {
        console.log(this.props.navigation);
        //最近2秒内按过back键，可以退出应用。
        //if(this.state.lastBackPressed && this.state.lastBackPressed+2000 >= Date.now()){
            //BackHandler.exitApp();
        //    return false;
        //}
        //
        //this.setState({lastBackPressed : Date.now()});
        //ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    };
    onPressRegist() {
        this.props.navigation.navigate('Regist', { name: '快速注册' });
    };
    //获取登录信息
    getLoginState() {
        storage.load({
            key: STORAGE_KEY_LOGIN,
        }).then(ret =>  {
            //console.log("then");
            //console.log(ret);
            if(ret != null) {
                global.isLogin = true;
            }else{
                global.isLogin = false;
            }
        }).catch(error =>{
            //console.log("error:");
            //console.log(error);
            global.isLogin = false;
        }).done((ret) =>{
            //console.log("done");
            //console.log(ret);
        });
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    },
    mainTabBarIconAndroid:{
    	flex:1,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'
    },
    mainTabBarIconIOS:{
    	flex:1,paddingVertical:10,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    iconStyle: {
        flex: 1,
        fontFamily:'icomoon',
        fontSize: 30,
        textAlign: 'center'
    },
    releaseBtn: {
        position:'absolute',
        bottom: -20,
        left: '35%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    main_title: {
        color: '#666666',
        fontSize: 16,
        textAlign: 'left',
        margin: 10,
    }
});

export  default Main;
