import React, { Component } from 'react';
import {
    TabNavigator,StackNavigator,NavigationActions
} from 'react-navigation';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    ART,
    AsyncStorage,
    BackHandler,
    ToastAndroid,
    Platform,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import Storage from 'react-native-storage';

import SplashScreen from './js/SplashScreen';

import Main from './app/main'; //首页
import Classes from './app/products/productsList';//分类
import Release from './app/release/release';//发布
import Message from './app/message/messageList';//消息
import UserMain from './app/user/userMain';//我
import Setting from './app/user/setting';//设置
import UserInfo from './app/user/userInfo';//设置
//import UserLoginState from './app/user/userLoginState';//保存登录信息
import Login from './app/user/login';//登录
import Regist from './app/user/regist';//快速注册
import ForgetPsw1 from './app/user/forgetPsw1';//找回密码1
import ForgetPsw2 from './app/user/forgetPsw2';//找回密码2
import Search from './app/search/search';//快速注册
import ProductsDtl from './app/products/productsDtl';//商品详情

const {Surface, Shape, Path} = ART;

global.storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是写到另一个文件里，这里require引入
  // 或是在任何时候，直接对storage.sync进行赋值修改
  sync: () => {}  // 这个sync文件是要你自己写的
})
global.isLogin = false;

//发布页面中转空组件
class ReleaseAgent extends Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = {
    tabBarLabel: '发布',
    tabBarIcon: ({ tintColor }) => (
        <Text style={Platform.OS === 'ios'?styles.iconStyleIOS:styles.iconStyleAndroid}>&#xe912;</Text>
    ),
    //tabBarVisible: false
  };

  render() {
    //const resetAction = NavigationActions.reset({
    //  index:0,
    //  action: NavigationActions.navigate('Release', { name: '发布商品' })
    //});
    //this.props.navigation.dispatch(resetAction);

    const navigateAction = NavigationActions.navigate({
      routeName: 'Release',
      params : {
        name: '发布商品'
      }
    });
    this.props.navigation.dispatch(navigateAction);
    //this.props.navigation.navigate('Release', { name: '发布商品' });
    return null;
  }
}

//TabNavigator底部标签模块切换导航设置
const BottomNavigation = TabNavigator({
  MainTab: {screen: Main},//首页
  ClassesTab: {screen: Classes},//分类
  ReleaseTab: {screen: ReleaseAgent},//发布
  MessageTab: {screen: Message},//消息
  UserMainTab: {screen: UserMain}//我
}, {
  tabBarPosition:'bottom',
  swipeEnabled:false,
  animationEnabled:false,
  lazy:true,
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    labelStyle: {
      margin:0,
      padding:0,
      fontSize: 16
    },
    iconStyle:{
      margin:0,
      padding:0,
      width:60,
      height:60,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    activeTintColor: "#f7900f",
    inactiveTintColor: "#666",
    style: {
      flexDirection: (Platform.OS === 'ios' ? 'row' : 'column'), 
      justifyContent: 'flex-start',
      margin:0,
      padding:0,
      height: 75,
      borderColor: '#aaa',
      borderTopWidth: 1,
      backgroundColor: '#fafafa'
    }
  },
});


//StackNavigator前进后退导航设置
const  MainNavigation= StackNavigator({
      Main: {
        screen: BottomNavigation,
        navigationOptions: ({
          header: null
        })
      },
      Release: {screen: Release},
      Login: {screen: Login},
      Regist: {screen: Regist},
      ForgetPsw1: {screen: ForgetPsw1},
      ForgetPsw2: {screen: ForgetPsw2},
      Search: {screen: Search},
      Setting: {screen: Setting},
      UserInfo: {screen: UserInfo},
      ProductsDtl: {screen: ProductsDtl},
      //UserLoginState: {screen: UserLoginState}
  }, {
      initialRouteName: 'Main'
  });

//const defaultStateAction = MainNavigation.router.getStateForAction;
//MainNavigation.router.getStateForAction = (action,state) => {
//  if(state && "Release" == state.routes[state.index].routeName) {
//    const routes = [
//      ...state.routes
//    ];
//    return {
//      ...state,
//      routes,
//      index: 1,
//    };
//  }
//  return defaultStateAction(action,state);
//};

class Index extends Component {
  constructor(props){
    super(props);
    this._onExitApp = this.exitApp.bind(this);
  }
  componentDidMount() {
    if(Platform.OS === "ios"){
    }else{
    	SplashScreen.hide();
    }
    this.state = {
      lastBackPressed: Date.now()
    }
    BackHandler.addEventListener('hardwareBackPress', () => this._onExitApp());//监听安卓回退按钮
    //this.getLoginState();
  }
  componentWillUnmount() {
    console.log("main Unmount");
    BackHandler.removeEventListener('hardwareBackPress', () => this._onExitApp());
  }
  render() {
    return <MainNavigation ref="main" />;
    //return (
    //    <View style={{flex:1}}>
    //      <MainNavigation ref="main" />
    //      {/*<View style={styles.releaseBtn}>
    //        <View style={styles.releaseBtnArc}>
    //          <Surface width={100} height={27}>
    //            <Shape d="m19,37 a34,32 0 1,1 9,20" stroke="#aaa" strokeWidth={1}/>
    //          </Surface>
    //        </View>
    //        <TouchableHighlight underlayColor="#fff" style={styles.releaseBtnIcoBox} onPress={() => this.onRelease()}>
    //          <Text style={styles.releaseBtnIco}>&#xe912;</Text>
    //        </TouchableHighlight>
    //        <Text style={styles.releaseBtnText} onPress={() => this.onRelease()}>发布</Text>
    //      </View>*/}
    //    </View>
    //);
  }

  /**
   * 回退
   */
  exitApp() {
    let navigate = this.refs.main;
    let {state, goBack, dispatch} = navigate._navigation;
    let curObj = state.routes[state.index];
    console.log(state);
    console.log("Release" == curObj.routeName || "Login" == curObj.routeName);
    if("Main" == curObj.routeName){
      //最近2秒内按过back键，可以退出应用。
      if(this.state.lastBackPressed && this.state.lastBackPressed+2000 >= Date.now()){
        BackHandler.exitApp();
        return false;
      }

      this.setState({lastBackPressed : Date.now()});
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    }else if("Release" == curObj.routeName || "Login" == curObj.routeName){
      //const resetAction = NavigationActions.reset({
      //  index: 0,
      //  actions: [
      //  //    NavigationActions.navigate({routeName: 'Main'})
      //  ]
      //});
      //const backAction = NavigationActions.back({
      //  key: "Init"
      //});
      //navigate.dispatch(resetAction);
      const navigateAction = NavigationActions.navigate({
        routeName: 'Main'
      })
      dispatch(navigateAction);
    }else{
      goBack();
    }
    return true;
  };

  onRelease(){
    console.log(this.props.navigation);
    //this.props.navigation.navigate('Release', { name: '发布' });
  };
}

const styles = StyleSheet.create({
  iconStyleAndroid: {//发布图标
    flex: 1,
    margin: 0,
    width:60,
    height:60,
    fontFamily:'icomoon',
    fontSize: 57,
    textAlign: 'center',
    color: '#f7900f'
  },
  iconStyleIOS: {//发布图标
    flex: 1,
    marginTop: 5,
    width:60,
    height:60,
    fontFamily:'icomoon',
    fontSize: 57,
    textAlign: 'center',
    color: '#f7900f'
  },
  releaseBtn: {
    position:'absolute',
    bottom: 8,
    left: '40%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  releaseBtnArc: {
    position:'absolute',
    top: -8,
    left: -20.5
  },
  releaseBtnIcoBox: {
    marginTop: -3,
    width: 65,
    height: 65,
    backgroundColor: '#fafafa',
    borderRadius: 30
  },
  releaseBtnIco: {
    paddingTop: 3,
    textAlign: 'center',
    fontFamily:'icomoon',
    fontSize: 60,
    color:'#f7900f'
  },
  releaseBtnText: {
    color:'#9f9c9c',
    fontSize: 16
  }
});


console.ignoredYellowBox = ["Warning: BackAndroid is deprecated.  Please use BackHandler instead.",
  "source.uri should not be an empty string",
  "Warning: Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.",
  "Warning: Failed prop type: Invalid prop `value` of type `object` supplied to `TextInput`, expected `string`."
];
// console.disabledYellowBox = true;

export default Index;
//export default MainNavigation;
