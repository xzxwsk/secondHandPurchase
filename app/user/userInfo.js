/**
 * Created by Administrator on 2017/5/25.
 */
import React, { Component } from 'react';
import {
    Image,
    Button,
    Text,
    TextInput,
    View,
    ListView,
    Picker,
    StyleSheet,
    BackHandler,
    Modal,
    TouchableHighlight,
    Platform
} from 'react-native';
import {
    TabNavigator,NavigationActions
} from 'react-navigation';
//图片选择器
import  ImagePicker from 'react-native-image-picker'; //第三方相机
//图片选择器参数设置
const options = {
    title: '请选择图片来源',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'相册图片',
    //customButtons: [
    //    {name: 'hangge', title: 'hangge.com图片'},
    //],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

let Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;
const STORAGE_KEY_LOGIN = "login";

export default class UserInfo  extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sex: 'male',
            show: false,
            headImg: require('../images/userHead_img_03.png')
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
        return (
            <View style={{flex:1, flexDirection:'column',backgroundColor: '#eee'}}>
                <TouchableHighlight style={[styles.lineBtn]} underlayColor="transparent" onPress={() => this.onModifyHeadImg()}>
                    <View style={styles.line}>
                        <Text style={styles.title}>修改头像</Text>
                        <View style={styles.headimgBox}>
                            <Image style={{marginHorizontal: 10,width:48,height:48,borderRadius:25}} source={this.state.headImg} />
                            <Text style={styles.arrowIcon}>&#xe902;</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.phoneLine}>
                    <Text style={styles.title}>手机号</Text>
                    <Text style={styles.arrowIcon}>13844154244</Text>
                </View>
                <TouchableHighlight style={[styles.lineBtn,{borderTopWidth: 1,borderColor:'#eee'}]} underlayColor="transparent" onPress={() => this.onModify("name")}>
                    <View style={styles.line}>
                        <Text style={styles.title}>姓名</Text>
                        <Text style={styles.arrowIcon}>庄员外 &#xe902;</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.lineBtn,{borderTopWidth: 1,borderColor:'#eee'}]} underlayColor="transparent" onPress={() => this.onModify("nickname")}>
                    <View style={styles.line}>
                        <Text style={styles.title}>昵称</Text>
                        <Text style={styles.arrowIcon}>小二哥 &#xe902;</Text>
                    </View>
                </TouchableHighlight>
                <View style={[styles.lineBtn,{borderTopWidth: 1,borderColor:'#eee'}]}>
                    <View style={styles.line}>
                        <Text style={styles.title}>性别</Text>
                        <View style={Platform.OS === "ios"?styles.sexBoxIOS:styles.sexBoxAndroid}>
                            <Picker style={Platform.OS === 'ios'?styles.downSelectIOS:styles.downSelectAndroid} prompt="请选择性别" mode="dialog"
                                    selectedValue={this.state.sex}
                                    onValueChange={(value) => this.setState({sex: value})}
				    itemStyle={{fontSize:16,color:"#999"}}>
                                <Picker.Item label="男" value="male" />
                                <Picker.Item label="女" value="female" />
                            </Picker>
                            <Text style={styles.arrowIcon}>&#xe902;</Text>
                        </View>
                    </View>
                </View>
                <TouchableHighlight style={[styles.lineBtn,{borderTopWidth: 1,borderColor:'#eee'}]} underlayColor="transparent" onPress={() => this.onModify("sign")}>
                    <View style={styles.line}>
                        <Text style={styles.title}>个性签名</Text>
                        <Text style={styles.arrowIcon}>天上下为 &#xe902;</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.lineBtn,{borderTopWidth: 1,borderColor:'#eee'}]} underlayColor="transparent" onPress={() => this.onModify("addr")}>
                    <View style={styles.line}>
                        <Text style={styles.title}>收货地址</Text>
                        <View style={styles.addrBox}>
                            <Text style={styles.addr} /*numberOfLines={1}*/>四川省成都市高新区四川省成都市高新区G区4栋1楼</Text>
                            <Text style={styles.arrowIcon}>&#xe902;</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.lineBtn,{marginTop: 10}]} underlayColor="transparent" onPress={() => this.onModifyPsw()}>
                    <View style={styles.line}>
                        <Text style={styles.title}>修改密码</Text>
                        <Text style={styles.arrowIcon}>&#xe902;</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.logoutBtn} underlayColor="#ffae48" onPress={() => this.onLogout()}>
                    <Text style={styles.logoutTxt}>退出登录</Text>
                </TouchableHighlight>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.show}
                    onShow={() => {}}
                    onRequestClose={() => {}}
                >
                        <View style={styles.popConBox}>
                            <View style={styles.popCon}>
			    	<View style={{flex:2, flexDirection:'row',justifyContent:"center",alignItems:"center"}}>
				    <View style={{width: 260,height: 60,}}>
                                    	<TextInput style={Platform.OS === "ios"?styles.modifyInputIOS:styles.modifyInputAndroid} multiline={true} underlineColorAndroid="transparent" />
				    </View>
				</View>
                                <View style={styles.popBtnBox}>
                                    <TouchableHighlight style={styles.popConfirmBtn} underlayColor="#ffae48" onPress={() => this.onConfirmSet()}>
                                        <Text style={styles.btnLabel}>确定</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.popCancelBtn} underlayColor="#eee" onPress={() => this.onCancelSet()}>
                                        <Text style={styles.btnLabel}>取消</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                </Modal>
            </View>
        );
    };

    goBack() {
        this.props.navigation.goBack();
    };
    onModifyHeadImg() {
        //console.log("修改头像");
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('用户取消了选择！');
            }
            else if (response.error) {
                alert("ImagePicker发生错误：" + response.error);
            }
            else if (response.customButton) {
                alert("自定义按钮点击：" + response.customButton);
            }
            else {
                // You can also display the image using data:
                let extName, source;
                if(!!response.fileName){
                    extName = response.fileName.split(".")[1];
                    source = { uri: 'data:image/'+extName+';base64,' + response.data };
                }else{
                    source = { uri: response.uri };
                }
                this.setState({
                    headImg: source
                });
            }
        });
    };
    onModify(str) {
        this.setState({show: true})
    };
    onModifyPsw() {
        console.log("修改密码");
    };
    onLogout() {
        storage.remove({
            key: STORAGE_KEY_LOGIN,
        }).done(() => {
            const navigateAction = NavigationActions.navigate({
                routeName: 'Login',
                params: {
                    name: "用户登录"
                }
            });
            this.props.navigation.dispatch(navigateAction);
        })
    };
    onConfirmSet() {
        this.setState({show: false})
    };
    onCancelSet() {
        this.setState({show: false})
    };
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
        textAlign: 'center',
        fontSize: 18
    },
    headerTitleStyleIOS: {
    	width: 230,
        height: 40,
        textAlign: 'center',
        fontSize: 18
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
    phoneLine: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderTopWidth: 1,borderColor:'#eee'
    },
    title: {
        color: '#5a5a5a',
        fontSize: 16
    },
    arrowIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontFamily:'icomoon',
        color: '#999',
        fontSize: 16,
        borderWidth: 1,borderColor: 'transparent'
    },

    headimgBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sexBoxAndroid: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    sexBoxIOS: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 40,
        overflow: 'hidden'
    },
    downSelectAndroid: {
        width:60,
        marginRight:-24,
        padding:0,
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
	color:'#999',
        backgroundColor: 'transparent'
    },
    downSelectIOS: {
        width:60,
        padding:0,
    },
    addrBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    addr: {
        width: 200,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        color: '#999',
        fontSize: 16
    },

    logoutBtn: {
        marginTop: 10,marginHorizontal:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#f7900f'
    },
    logoutTxt: {
        fontSize: 16,
        color: '#fff'
    },

    popConBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    popCon: {
        width: 300,
        height: 160,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        shadowColor:'#666',
        shadowOffset:{h:3,w:3},
        shadowOpacity:0.8
    },
    modifyInputAndroid: {
        marginBottom: 10,
        width: 260,
        height: 60,
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 16
    },
    modifyInputIOS: {
        width: 260,
        height: 60,
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 16,
        textAlignVertical: 'center'
    },
    popBtnBox: {
    	flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 20
    },
    popConfirmBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7900f',
        marginRight: 10,
        height: 40
    },
    popCancelBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        height: 40
    },
    btnLabel: {
        fontSize: 16,
        color: '#fff'
    }
});