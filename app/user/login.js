/**
 * Created by Administrator on 2017/5/25.
 */
/**
 * secondHandPurchase React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TabNavigator, NavigationActions } from 'react-navigation';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Button,
    ScrollView,
    BackHandler,
    ToastAndroid,
    TouchableHighlight,
    Platform
} from 'react-native';

const STORAGE_KEY_LOGIN = "login";

class Login extends Component {
    constructor(props){
        super(props);
        this._onLoginBack = this.goLoginBack.bind(this);
    }
    
    componentWillMount(){
        console.log("WaitingLeaf Will Mount");
    }

    componentDidMount() {
        this.props.navigation.setParams({
            goLoginBack: () => this._onLoginBack()
        });
        console.log("WaitingLeaf Did Mount.");
        //BackHandler.addEventListener('hardwareBackPress', () => this._onLoginBack());//监听安卓回退按钮
    }
    componentWillUnmount() {
        console.log("WaitingLeaf Will Unmount.");
        //BackHandler.removeEventListener('hardwareBackPress', () => this._onLoginBack());
    }

    componentWillUpdate() {
        console.log("WaitingLeaf will Update");
    }    

    componentDidUpdate(){
        console.log("WaitingLeaf Did Update");
    };


    static navigationOptions = ({ navigation }) => ({
        //headerTitle: `${navigation.state.params.name}`,
        headerTitle: '用户登录',
        headerLeft: <TouchableHighlight style={Platform.OS === "ios"?styles.backBtnIOS:styles.backBtnAndroid} underlayColor="transparent" onPress={() => navigation.state.params.goLoginBack()}>
                        <Text style={styles.arrowBack}>&#xe901;</Text>
                    </TouchableHighlight>,
        headerTitleStyle: Platform.OS === 'ios' ? styles.headerTitleStyleIOS:styles.headerTitleStyleAndroid,
        headerStyle: Platform.OS === 'ios' ? styles.headerStyleIOS:styles.headerStyleAndroid,
        headerTintColor: "#fff"
    });

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{height: 560}}>
                    <View style={styles.logo}>
                        <Image style={styles.logoImg} source={require('../images/logo.png')} />
                        <Text style={{fontSize:16,color:'#999'}}>快速、安全、可靠</Text>
                    </View>
                    <View style={styles.loginBox}>
                        <View style={styles.iptLine}>
                            <Text style={styles.iconStyle}>&#xe916;</Text>
                            <TextInput style={styles.ipt} placeholder="请输入手机号" placeholderTextColor="#ccc" underlineColorAndroid="transparent" />
                        </View>
                        <View style={styles.iptLine}>
                            <Text style={styles.iconStyle}>&#xe915;</Text>
                            <TextInput style={styles.ipt} placeholder="请输入密码" placeholderTextColor="#ccc" underlineColorAndroid="transparent" />
                        </View>
                    </View>
                    <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',marginTop:10}}>
                        <Text style={{flex:1,color:'#e40011'}}>*用户名或密码错误</Text>
                        <TouchableHighlight style={styles.forgetPswBtn} underlayColor="transparent" onPress={() => this.onForgetPsw()}>
                            <Text style={{height:20,color:'#1895ff'}}>忘记密码？</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.btnBox}>
                        <TouchableHighlight style={styles.quickRegBtn} underlayColor="#259afe" onPress={() => this.onRegist()}>
                            <Text style={styles.btnText}>快速注册</Text>
                        </TouchableHighlight>
                        <Text style={styles.blank}>&nbsp;</Text>
                        <TouchableHighlight style={styles.loginBtn} underlayColor="#ff991a" onPress={() => this.onLogin()}>
                            <Text style={styles.btnText}>登录</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        );
    }

    goLoginBack() {
        //console.log(this.props.navigation);
        const navigateAction = NavigationActions.navigate({
            routeName: 'Main'
        });
        this.props.navigation.dispatch(navigateAction);
        //this.props.navigation.goBack();
        return true;
    };
    onRegist(){
        this.props.navigation.navigate('Regist', { name: '快速注册' });
    };
    onLogin(){
        console.log("login");
        storage.save({
            key: STORAGE_KEY_LOGIN,  // 注意:请不要在key中使用_下划线符号!
            data: true,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: 1000 * 3600
        }).done(() => {
            global.isLogin = true;
            this.goLoginBack();
        });
    };
    onForgetPsw(){
        console.log("onForgetPsw");
        this.props.navigation.navigate('ForgetPsw1', { name: '找回密码' });
    }
}

const styles = StyleSheet.create({
    headerTitleStyleAndroid: {
    	width: 230,
        textAlign: 'center'
    },
    headerTitleStyleIOS: {
    	width: 230,
        height: 40,
        textAlign: 'center'
    },
    headerStyleAndroid: {
    	backgroundColor: '#ff9123',
        height:40
    },
    headerStyleIOS: {
    	marginTop: 20,
        backgroundColor: '#ff9123',
        height:40
    },
    arrowBack: {
        fontFamily:'icomoon',
        fontSize: 20,
        textAlign: 'center',
        color: '#fff'
    },
    backBtnAndroid: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
    },
    backBtnIOS: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 40,
        height: 40
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 20
    },
    logo: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30
    },
    logoImg: {
        marginBottom: 20,
        width: 100,
        height: 100
    },

    loginBox: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderColor: '#ddd',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    iptLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: '#ddd',
        borderBottomWidth: 1
    },
    iconStyle: {
        flex: 1,
        fontFamily:'icomoon',
        fontSize: 30,
        textAlign: 'center',
        color: '#ccc'
    },
    ipt:{
        flex: 5,
        height:40,
        fontSize: 16
    },

    forgetPswBtn: {
        flex: 1,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },

    btnBox: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    quickRegBtn: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1794fe',
        height:45,
        borderRadius: 3
    },
    loginBtn:{
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7900f',
        height:45,
        borderRadius: 3
    },
    btnText: {
        color: '#fff',
        fontSize: 16
    },
    blank: {
        flex: 1
    }
});


export default Login;
