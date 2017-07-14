/**
 * Created by Administrator on 2017/5/25.
 */
import React, { Component } from 'react';
import {
    Image,
    Button,
    Text,
    View,
    ListView,
    StyleSheet,
    BackHandler,
    TouchableHighlight,
    Platform
} from 'react-native';
import {
    TabNavigator,NavigationActions
} from 'react-navigation';

let Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;

export default class Setting  extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            login: () => this.login(),
            goBack: () => this.goBack()
        });
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
        if(this.state.isLogin) {
            return (
                <View style={{flex:1, flexDirection:'column',backgroundColor: '#eee'}}>
                    <TouchableHighlight style={[styles.lineBtn,{marginTop: 10}]} underlayColor="transparent" onPress={() => this.onClearCache()}>
                        <View style={styles.line}>
                            <Text style={styles.title}>清理缓存</Text>
                            <Text style={styles.arrowIcon}>11.6MB &#xe902;</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.lineBtn,{marginTop: 10}]} underlayColor="transparent" onPress={() => this.onServicesProtocal()}>
                        <View style={styles.line}>
                            <Text style={styles.title}>服务协议</Text>
                            <Text style={styles.arrowIcon}>&#xe902;</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.lineBtn,{borderTopWidth: 1,borderColor:'#eee'}]} underlayColor="transparent" onPress={() => this.onContactServices()}>
                        <View style={styles.line}>
                            <Text style={styles.title}>联系客服</Text>
                            <Text style={styles.arrowIcon}>&#xe902;</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.lineBtn,{marginTop: 10}]} underlayColor="transparent" onPress={() => this.onCheckUpdate()}>
                        <View style={styles.line}>
                            <Text style={styles.title}>检查更新</Text>
                            <Text style={styles.arrowIcon}>V1.0.0 &#xe902;</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }else{
            const navigateAction = NavigationActions.navigate({
                routeName: 'Login',
                params : {
                    name: '用户登录'
                },
                action: NavigationActions.navigate({routeName: 'Regist'})
            });
            this.props.navigation.dispatch(navigateAction);
            return null;
        }
    };

    goBack() {
        this.props.navigation.goBack();
    };
    login(){
        const navigateAction = NavigationActions.navigate({
            routeName: 'Login',
            params : {
                name: '用户登录'
            }
        });
        this.props.navigation.dispatch(navigateAction);
    };
    onClearCache() {
        console.log("清理缓存");
    };
    onServicesProtocal() {
        console.log("服务协议");
    };
    onContactServices() {
        console.log("联系客服");
    };
    onCheckUpdate() {
        console.log("检测更新");
    };
}

const styles = StyleSheet.create({
    arrowBack: {
        fontFamily:'icomoon',
        fontSize: 20,
        textAlign: 'center',
        color: '#fff'
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
    lineBtn: {
        height: 50
    },
    line: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    title: {
        color: '#5a5a5a',
        fontSize: 16
    },
    arrowIcon: {
        fontFamily:'icomoon',
        color: '#999',
        fontSize: 16,
        textAlign: 'right'
    }
});