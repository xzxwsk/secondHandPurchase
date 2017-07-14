/**
 * Created by Administrator on 2017/5/25.
 */
import React, { Component } from 'react';
import {
    TabNavigator, NavigationActions
} from 'react-navigation';
import {
    Image,
    Button,
    Text,
    TextInput,
    View,
    Picker,
    ListView,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
    BackHandler,
    Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ReleasePicker from '../common/releasePicker';
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

// 获取屏幕宽度
let Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;

let imgListSource = [//图片列表
    {
        id: 1,
        src: require('../images/img_03.jpg')
    },
    {
        id: 2,
        src: require('../images/img_03.jpg')
    },
    {
        id: 3,
        src: require('../images/img_03.jpg')
    },
    {
        id: 4,
        src: require('../images/img_03.jpg')
    },
    {
        id: -1,
        src: null
    }
];

export default class Release extends Component{
    constructor(props) {
        super(props);
        // 创建数据源
        var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = {
            ds: ds,
            nameTxt: "",//名称
            yjTxt: "",//原价
            sjTxt: "",//售价
            class: '',//分类
            addr: '', //地址
            avatarSource: {uri:('content://media/external/images/media/19541')}, //照片选择器选择图片
            imgList: ds.cloneWithRows(imgListSource), //图片列表
            zphh: true,//三包：正品行货
            fp: false,//三包：开具发票
            wx: false,//三包：保修期
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            goBack: () => this.goBack(),
            release: () => this.onRelease()
        });
        //BackHandler.addEventListener('hardwareBackPress', () => this.goBack());//监听安卓回退按钮
    }
    componentWillUnmount() {
        //BackHandler.removeEventListener('hardwareBackPress', () => this.goBack());
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: `${navigation.state.params.name}`,
        headerLeft: <TouchableHighlight style={styles.backBtn} underlayColor="transparent" onPress={() => navigation.state.params.goBack()}>
                        <Text style={styles.arrowBack}>&#xe901;</Text>
                    </TouchableHighlight>,
        headerRight: <TouchableHighlight style={styles.releaseBtn} underlayColor="#fff2e4" onPress={() => navigation.state.params.release()}>
                        <Text style={{color:'#f7900f'}}>发布</Text>
                    </TouchableHighlight>,
        headerTitleStyle: Platform.OS === 'ios' ? styles.headerTitleStyleIOS:styles.headerTitleStyleAndroid,
        headerStyle: Platform.OS === 'ios' ? styles.headerStyleIOS:styles.headerStyleAndroid,
        headerTintColor: "#fff"
    });

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.line}>
                        <Text style={styles.label}>名称</Text>
                        <TextInput style={styles.ipt} placeholder="请输入商品名称(必填)" value={this.state.nameTxt} placeholderTextColor="#ccc" underlineColorAndroid="transparent"
                             onChangeText={(text) => {this.setState({nameTxt: text})}}
                        />
                    </View>
                    <View style={styles.imgLine}>
                        <ListView dataSource={this.state.imgList} contentContainerStyle={styles.listViewStyle}
                              renderRow={(rowData, sectionID, rowID) => {
                                  if(-1 != rowData.id){
                                      return (
                                        <View style={{margin:5,width: screenW/3-10, height:80}}>
                                            <Image style={{margin:5,width: screenW/3-20, height:70, resizeMode:Image.resizeMode.contain }} source={rowData.src} />
                                            <TouchableHighlight style={{position:'absolute',right:0,top:0}} onPress={() => this.onDelImg(rowData.id)} underlayColor="#fff2e4" underlayColor="transparent">
                                                <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                                                    <Text style={styles.delIcon}>&#xe904;</Text>
                                                    <Text style={styles.delIcon2}>&#xe905;</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                      )
                                  }else{
                                      return(
                                        <View style={{margin:5,width: screenW/3-10, height:80, flexDirection: 'row',justifyContent: "center", alignItems: "center",}}>
                                            <TouchableHighlight style={{flex:1}} onPress={this.choosePic.bind(this)} underlayColor="#fff2e4" underlayColor="transparent">
                                                <View style={{margin:5,width: screenW/3-20, height:70, flexDirection: 'column',justifyContent:'center',alignItems:'center',borderWidth:2,borderColor: '#ccc',borderStyle:'dashed'}}>
                                                    <Text style={Platform.OS === "ios"?styles.addImgIconIOS:styles.addImgIconAndroid}>+</Text>
                                                    <Text style={{color:'#999',fontSize: 16}}>添加图片</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                      )
                                  }
                              }}
                        />

                        <View style={{flex:1, paddingLeft: 16}}>
                            <Text style={{color:"#ccc"}}>说明：最多可上传6张图片</Text>
                        </View>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.label}>原价</Text>
                        <TextInput style={styles.ipt} placeholder="当初购买商品的价格" value={this.state.yjTxt} placeholderTextColor="#ccc" underlineColorAndroid="transparent"
                             onChangeText={(text) => {this.setState({yjTxt: text})}}
                        />
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.label}>售价</Text>
                        <TextInput style={styles.ipt} placeholder="您想要出手的价格，0为议价(必填)" value={this.state.sjTxt} placeholderTextColor="#ccc" underlineColorAndroid="transparent"
                             onChangeText={(text) => {this.setState({sjTxt: text})}}
                        />
                    </View>
                    <View style={styles.selectLine}>
                        <Text style={styles.label}>分类</Text>
                        <View style={{flex: 8, height: 40}}>
                            <View style={styles.arrow}>
                                <Text style={styles.downArrow}>&#xe902;</Text>
                            </View>
			    <ReleasePicker prompt="请选择分类" dataArr={[{label:"分类一",value:1},{label:"分类二",value:2}]} />
			    {/*if(Platform.OS === "ios"){
			    	<View style={styles.pickerBox}>
	                            <Picker style={styles.classSelectIOS} prompt="请选择分类" mode="dialog"
	                                selectedValue={this.state.class}
	                                onValueChange={(value) => this.setState({class: value})}
	                                itemStyle={{fontSize: 14,textAlign: 'left'}}>
	                                    <Picker.Item label="分类一" value="1" />
	                                    <Picker.Item label="分类二" value="2" />
	                            </Picker>
	                        </View>
			    }else{	
	                        <Picker style={styles.classSelectAndroid} prompt="请选择分类" mode="dialog"
	                            selectedValue={this.state.class}
	                            onValueChange={(value) => this.setState({class: value})}>
	                                <Picker.Item label="分类一" value="1" />
	                                <Picker.Item label="分类二" value="2" />
	                        </Picker>
			    }*/}
                         </View>
                    </View>
                    <View style={styles.selectLine}>
                        <Text style={styles.label}>地址</Text>
                        <View style={{flex: 8, height: 40}}>
                            <View style={styles.arrow}>
                                <Text style={styles.downArrow}>&#xe902;</Text>
                            </View>
			    <ReleasePicker prompt="请选择地址" dataArr={[{label:"地址一",value:1},{label:"地址二",value:2}]} />                            
                        </View>
                    </View>
                    <View style={styles.threeBaoBox}>
                        <TouchableHighlight style={styles.threeBaoBtn} underlayColor="#fef1e4" onPress={() => this.setThreeBao("zphh")}>
                            <View style={[styles.threeBaoItem,{borderRightWidth:1,borderColor:'#ddd'}]}>
			    	<View style={[styles.icoText,{backgroundColor: `${this.state.zphh?'#fb605e':'#999'}`}]}>
                                    <Text style={{color: '#fff'}}>正</Text>
				</View>
                                <Text style={[{flex: 8},{color:`${this.state.zphh?'#666':'#ccc'}`}]}>承诺商品为正品行货</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.threeBaoBtn} underlayColor="#fef1e4" onPress={() => this.setThreeBao("fp")}>
                            <View style={styles.threeBaoItem}>
			    	<View style={[styles.icoText,{backgroundColor: `${this.state.fp?'#fb605e':'#999'}`}]}>
                                    <Text style={{color: '#fff'}}>票</Text>
				</View>
                                <Text style={[{flex: 8},{color:`${this.state.fp?'#666':'#ccc'}`}]}>可提供购买时开具的正规发票</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.threeBaoBtn} underlayColor="#fef1e4" onPress={() => this.setThreeBao("wx")}>
                            <View style={[styles.threeBaoItem,{borderRightWidth:1,borderColor:'#ddd'}]}>
			    	<View style={[styles.icoText,{backgroundColor: `${this.state.wx?'#fb605e':'#999'}`}]}>
                                <Text style={{color: '#fff'}}>修</Text>
				</View>
                                <Text style={[{flex: 8},{color:`${this.state.wx?'#666':'#ccc'}`}]}>商品在保修期以内</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.threeBaoBtn}>
                            <Text>&nbsp;</Text>
                        </View>
                    </View>
                    <View style={styles.detailLine}>
                        <Text style={{fontSize: 18}}>商品详情</Text>
                        <Text style={{color:'#ccc'}}>你还可以输入1000个字</Text>
                    </View>
                    <View>
                        <TextInput multiline={true} placeholder="请输入商品详情" style={styles.textArea} placeholderTextColor="#ccc" underlineColorAndroid="transparent" textAlignVertical="top"></TextInput>
                    </View>
                </View>
            </ScrollView>
        );
    }

    goBack() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Main'
        })
        this.props.navigation.dispatch(navigateAction)
        return true;
    };
    onRelease() {
        console.log("release");
    };
    onDelImg(id) {
        let curIdx = 0;
        imgListSource.forEach(function(val, i, me){
            if(val.id == id){
                curIdx = i;
            }
        });
        imgListSource.splice(curIdx,1);
        this.setState({
            nameTxt: `${id}`,
            imgList: this.state.ds.cloneWithRows(imgListSource)
        });
    };
    setThreeBao(str){
        switch (str){
            case "zphh":
                this.setState({
                    zphh: !this.state.zphh
                })
                break;
            case "fp":
                this.setState({
                    fp: !this.state.fp
                })
                break;
            case "wx":
                this.setState({
                    wx: !this.state.wx
                })
                break;
        }
    };
    //选择照片按钮点击
    choosePic() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

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
                let insetId = 1;
                if(imgListSource.length>2){
                    insetId = imgListSource[imgListSource.length-2].id + 1
                }
                imgListSource.splice(imgListSource.length-1,0,{src:source, id:insetId});
                this.setState({
                    imgList: this.state.ds.cloneWithRows(imgListSource)
                });
            }
        });
    }
}
const styles = StyleSheet.create({
    arrowBack: {
        fontFamily:'icomoon',
        fontSize: 20,
        textAlign: 'center',
        color: '#fff'
    },
    backBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
    },
    headerTitleStyleAndroid: {
    	width: 230,
        textAlign: 'center'
    },
    headerTitleStyleIOS: {
    	marginTop: 20,
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
    	height:40,
    	flexDirection: 'row',
    	justifyContent: 'center',
    	alignItems: 'flex-start'
    },
    addImgIconAndroid: {
    	color:'#999',fontSize: 40, lineHeight: 25
    },
    addImgIconIOS: {
    	color:'#999',fontSize: 40, height: 35, lineHeight: 35
    },
    scrollContainer: {
        flex: 1
    },
    container: {
        height: 730,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    releaseBtn: {
        marginRight: 5,
        backgroundColor: '#fff',
        width: 60,
        height: 30,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    label: {
        flex: 2,
        textAlign: 'center',
        fontSize: 16
    },
    ipt: {
        flex: 8,
        marginTop: 2,
        height: 40,
        color: '#999',
        fontSize: 16
    },

    imgLine: {
        width: screenW,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    listViewStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap'
    },

    selectLine: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },    
    arrow: {
        position: 'absolute',
        right:10,
        top: 12
    },
    downArrow: {
        fontFamily:'icomoon',
        fontSize: 20,
        color: "#ccc"
    },
    delIcon: {
        fontFamily:'icomoon',
        fontSize: 25,
        color: "#e70012"
    },
    delIcon2: {
        position: 'absolute',
        fontFamily:'icomoon',
        fontSize: 25,
        color: "#fff"
    },

    threeBaoBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    threeBaoBtn: {
        width: screenW/2,
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    threeBaoItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    icoText: {
        flex: 2,
        marginHorizontal: 10,
        borderRadius: 15,	
	width:15,
	height:30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    detailLine:{
        marginHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: screenW - 20,
        height: 50
    },
    textArea: {
        width: screenW - 20,
        height: 150,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#999',
        fontSize: 16
    }
});