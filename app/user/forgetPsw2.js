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
    TouchableHighlight,
    BackHandler,
    ToastAndroid,
    Platform
} from 'react-native';

// 获取屏幕宽度
var Dimensions = require('Dimensions');
const screenH = Dimensions.get('window').height;

class Regist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pswShow: true,
            confirmPswShow: true
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            goBack: () => this.goBack()
        });
        //BackHandler.addEventListener('hardwareBackPress', () => this.goBack());//监听安卓回退按钮
    }
    componentWillUnmount() {
        //BackHandler.removeEventListener('hardwareBackPress', () => this.goBack());
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: `${navigation.state.params.name}`,
        headerLeft: <TouchableHighlight style={Platform.OS === "ios"?styles.backBtnIOS:styles.backBtnAndroid} underlayColor="transparent" onPress={() => navigation.state.params.goBack()}>
                        <Text style={styles.arrowBack}>&#xe901;</Text>
                    </TouchableHighlight>,
        headerTitleStyle: Platform.OS === 'ios' ? styles.headerTitleStyleIOS:styles.headerTitleStyleAndroid,
        headerStyle: Platform.OS === 'ios' ? styles.headerStyleIOS:styles.headerStyleAndroid,
        headerTintColor: "#fff"
    });

    render() {
        const { goBack } = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.iptLine}>
                        <Text style={styles.iconStyle}>&#xe915;</Text>
                        <TextInput style={styles.psw} placeholder="密码6-16个字符" placeholderTextColor="#ccc" underlineColorAndroid="transparent" secureTextEntry={this.state.pswShow} />
                        <TouchableHighlight style={styles.eyeBtn} underlayColor="transparent" onPress={() => this.showPsw()}><Text style={[styles.eyeIcon,{color:`${this.state.pswShow?'#999':'#ff911e'}`}]}>&#xe908;</Text></TouchableHighlight>
                    </View>
                    <View style={styles.iptLine}>
                        <Text style={styles.iconStyle}>&#xe915;</Text>
                        <TextInput style={styles.psw} placeholder="请再次输入密码" placeholderTextColor="#ccc" underlineColorAndroid="transparent" secureTextEntry={this.state.confirmPswShow} />
                        <TouchableHighlight style={styles.eyeBtn} underlayColor="transparent" onPress={() => this.showConfirmPsw()}><Text style={[styles.eyeIcon,{color:`${this.state.confirmPswShow?'#999':'#ff911e'}`}]}>&#xe908;</Text></TouchableHighlight>
                    </View>
                    <TouchableHighlight style={styles.regBtn} underlayColor="#ff991a" onPress={() => this.onConfirm()}><Text style={{color:'#fff',fontSize: 16}}>确定</Text></TouchableHighlight>
                </View>
            </ScrollView>
        );
    }

    goBack() {
        this.props.navigation.goBack();
        return true;
    };
    showPsw() {
        this.setState({pswShow: !this.state.pswShow});
    };
    showConfirmPsw() {
        this.setState({confirmPswShow: !this.state.confirmPswShow});
    };
    onForgetPsw2() {
        this.props.navigation.navigate('ForgetPsw2', { name: '找回密码' });
    };
    onConfirm() {
        console.log(this.props.navigation);
        //const backAction = NavigationActions.back({
        //    key: "Login"
        //});
        const navigateAction = NavigationActions.navigate({
            routeName: 'Login',
            params : {
                name: '用户登录'
            }
        });
        this.props.navigation.dispatch(navigateAction);
    }
}

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 20
    },
    box: {
        height: screenH-80,
        paddingTop: 50
    },
    iptLine: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    iptLine2: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    voliCodeLine: {
        flex: 13,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    iconStyle: {
        flex: 3,
        fontFamily:'icomoon',
        fontSize: 30,
        textAlign: 'center',
        color: '#ccc'
    },
    eyeBtn: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45
    },
    eyeIcon: {
        fontFamily:'icomoon',
        fontSize: 16,
        textAlign: 'center'
    },
    voliCodeIconStyle: {
        flex: 5,
        fontFamily:'icomoon',
        fontSize: 40,
        textAlign: 'center',
        color: '#ccc'
    },
    ipt: {
        flex: 17,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16
    },
    psw: {
        flex: 14,
        height: 45,
        fontSize: 16
    },
    voliCodeIpt: {
        flex: 15,
        height: 45,
        fontSize: 16
    },

    regBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        height: 45,
        backgroundColor: '#f7900f',
        borderRadius: 3
    },

    protocal: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: "#999"
    }
});


export default Regist;
