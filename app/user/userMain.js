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

import Swipeout from 'react-native-swipeout';
let dataLs = require('../common/mainlist.json');
let Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;

export default class UserMain  extends Component{
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLogin: null,
            dataSource: ds.cloneWithRows(dataLs.data),
            sectionID: null,
            rowID: null
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            login: () => this.login()
        });
        this.setState({isLogin: global.isLogin});
    }

    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '我',
        tabBarIcon: ({ tintColor }) => (
            <View style={Platform.OS === "ios"?styles.tarBarIconIOS:styles.tarBarIconAndroid}>
                <Text style={[styles.iconStyle, {color: tintColor}]}>&#xe911;</Text>
                <Text style={{fontSize:16,color: tintColor}}>我</Text>
            </View>
        ),
    });

    render() {
        if(this.state.isLogin){
            return (
                <View style={{flex:1, flexDirection:'column'}}>
                    <View style={styles.userInfo}>
                        <Image style={{flex: 1,width:screenW}} source={require('../images/userMain_bg_02.jpg')} resizeMode="cover">
                            <View style={{flex: 1, flexDirection:'row',justifyContent:'center',alignItems:'flex-start'}}>
                                <View style={{flex:8}}>
                                    <TouchableHighlight
                                        style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'flex-start'}}
                                        underlayColor="transparent"
                                        onPress={() => this.onUserInfo()}>
                                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                            <Image style={{marginHorizontal: 10,width:80,height:80,borderWidth:2,borderColor:'#fff',borderRadius:40}}
                                                   source={require('../images/userHead_img_04.jpg')}/>
                                            <View style={{flex: 1, flexDirection:'column',justifyContent:'center',alignItems:'flex-start'}}>
                                                <Text style={{marginBottom:10,fontSize:18,color:'#fff'}}>用户A</Text>
                                                <Text style={{fontSize:14,color:'#fff'}}>天下为公，和气生财</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View style={Platform.OS === "ios"?styles.userTopIOS:styles.userTopAndroid}>
                                    <TouchableHighlight style={styles.setIconBtn} underlayColor="transparent"
                                                        onPress={() => this.onSysSetting()}>
                                        <Text style={styles.setIcon}>&#xe907;</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Image>
                    </View>
                    <View style={styles.title}>
                        <Text style={{fontSize:16,color:'#666'}}>我发布的商品</Text>
                        <Text style={{fontSize:14,color:'#ccc'}}>向左滑动商品进行管理</Text>
                    </View>
                    <View style={{flex: 7}}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                        />
                    </View>
                </View>
            );
        }else if(this.state.isLogin != null){
            const navigateAction = NavigationActions.navigate({
                routeName: 'Login',
                params : {
                    name: '用户登录'
                }
            });
            this.props.navigation.dispatch(navigateAction);
            return null;
        }else{
            return null;
        }
    };

    renderRow(data: string, sectionID: number, rowID: number) {
        if(data.n_prive) {
            return (
                <Swipeout buttonWidth={80}
                  close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
                  right={[{component:this.xiajiaBtn()},{component:this.delBtn()},{component:this.releaseBtn()}]}
                  rowID={rowID}
                  sectionID={sectionID}
                  autoClose={true}
                  backgroundColor="#fff"
                  onOpen={(sectionID, rowID) => {
                  this.setState({
                    sectionID,
                    rowID
                  })
                }}
                >
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => this.toProductsDtl()}>
                    <View style={styles.line}>
                        <View style={{flex: 3}}>
                            <Image
                                style={styles.thumbnail}
                                source={{uri: data.thumbnail}}/>
                        </View>
                        <View style={{flex: 7, flexDirection: 'column'}}>
                            <View style={{flex: 6}}><Text style={styles._name}>{data.name}</Text></View>
                            <View style={{flex: 4,flexDirection: 'row', justifyContent: "space-between"}}>
                                <Text style={styles._nprice}>{data.n_prive ? "￥" + data.n_prive : ""}</Text>
                                <Text style={styles._state}>{data.state}</Text>
                            </View>
                        </View>
                    </View>
                    </TouchableHighlight>
                </Swipeout>
            );
        }else{
            return null;
        }
    };

    //下架按钮
    xiajiaBtn() {
        return (
            <TouchableHighlight style={[styles.swipeBtn,styles.xiajiaBtn]} underlayColor="#faaa46" onPress={() => this.onXiajia()}>
                <Text style={styles.swipeBtnTxt}>下架</Text>
            </TouchableHighlight>
        );
    };
    //删除按钮
    delBtn() {
        return (
            <TouchableHighlight style={[styles.swipeBtn,styles.delBtn]} underlayColor="#f42e3d" onPress={() => this.onDel()}>
                <Text style={styles.swipeBtnTxt}>删除</Text>
            </TouchableHighlight>
        );
    };
    //发布按钮
    releaseBtn() {
        return (
            <TouchableHighlight style={[styles.swipeBtn,styles.releaseBtn]} underlayColor="#6fbd41" onPress={() => this.onRelease()}>
                <Text style={styles.swipeBtnTxt}>发布</Text>
            </TouchableHighlight>
        );
    };
    //编辑按钮
    editBtn() {
        return (
            <TouchableHighlight style={[styles.swipeBtn,styles.editBtn]} underlayColor="#49abfe" onPress={() => this.onEdit()}>
                <Text style={styles.swipeBtnTxt}>编辑</Text>
            </TouchableHighlight>
        );
    };
    onXiajia() {
        console.log("onXiajia");
    };
    onDel() {
        console.log("onDel");
    };
    onRelease() {
        console.log("onRelease");
    };
    onEdit() {
        console.log("onEdit");
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
    onUserInfo() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'UserInfo',
            params : {
                name: '个人信息'
            }
        });
        this.props.navigation.dispatch(navigateAction);
    };
    onSysSetting() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Setting',
            params : {
                name: '设置'
            }
        });
        this.props.navigation.dispatch(navigateAction);
    };
    goBack() {
        this.props.navigation.goBack();
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
    tarBarIconAndroid: {
    	flex:1,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'
    },
    tarBarIconIOS: {
    	flex:1,paddingVertical:10,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'
    },
    userTopAndroid: {
    	flex:2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'
    },
    userTopIOS: {
    	flex:2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',marginTop: 10
    },
    userInfo: {
        flex: 3,
    },
    title: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    setIconBtn: {
        flexDirection:'row',justifyContent:'center',alignItems:'center',
        width: 50,
        height: 40
    },
    setIcon: {
        fontFamily:'icomoon',
        fontSize: 20,
        color: '#fff'
    },

    line: {
        flexDirection: 'row',justifyContent: 'center', alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    thumbnail: {
        flex: 1,
        height: 100,
        marginHorizontal: 10
    },
    _name: {
        fontSize: 16,
        color: '#666'
    },
    _nprice: {
        flex: 5,
        color: '#f7900f',
        fontWeight: "bold",
        fontSize: 18
    },
    _state: {
        marginRight: 10,
        fontSize: 16,
        color: '#afafaf',
        textAlign: 'right'
    },
    swipeBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 5,
        padding:0,
        height: 60
    },
    xiajiaBtn: {
        backgroundColor: '#f7900f'
    },
    delBtn: {
        backgroundColor: '#e70012'
    },
    releaseBtn: {
        backgroundColor: '#5ab027'
    },
    editBtn: {
        backgroundColor: '#1895ff'
    },
    swipeBtnTxt: {
        fontSize: 18,
        color: "#fff"
    }
});