/**
 * Created by Administrator on 2017/5/25.
 */
import React, { Component } from 'react';
import {
    Image,
    Button,
    View,
    Text,
    TextInput,
    FlatList,
    ListView,
    TouchableHighlight,
    StyleSheet,
    BackHandler,
    Platform
} from 'react-native';

import SearchBox from '../common/searchBox';

var classfyData = require('../common/mainlist.json');
let totalNumArr = [30,8,7,6,9];
var Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;
const cellWH = screenW*2/9;

export default class Search  extends Component{
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            left: -9999,
            text: "",
            dataSource: ds.cloneWithRows(classfyData.data),
	    selectCategoryIndex: 0,
	    leftCategoryData: ['全部信息','手机数码','衣帽服饰','家具家装','其他'],
	    totalNum: totalNumArr[0]
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            goBack: () => this.goBack(),
            setList: (left) => this.setList(left),
            text: ""
        });
        //BackHandler.addEventListener('hardwareBackPress', () => this.goBack());
    }
    componentWillUnmount() {
        //BackHandler.removeEventListener('hardwareBackPress', () => this.goBack());
    }

    static navigationOptions = ({ navigation }) => ({
        //title: `${navigation.state.params.name}`,
        headerTitle: Platform.OS === 'ios' ? "搜索":'',
        headerLeft: <TouchableHighlight style={styles.backBtn} underlayColor="transparent" onPress={() => navigation.state.params.goBack()}>
                        <Text style={styles.arrowBack}>&#xe901;</Text>
                    </TouchableHighlight>,
        headerRight: <SearchBox clickSearch={ (left)=> navigation.state.params.setList(left) } text={navigation.state.params.text} />,
        headerStyle: Platform.OS === 'ios' ? styles.headerStyleIOS:styles.headerStyleAndroid,
        headerTintColor: "#fff"
    });
    render() {
        return (
            <View style={{flex:1, justifyContent: "center"}}>
                {/*结果列表*/}
                {/*<FlatList
                    data={[{id:1, key: 'a'}, {id:2, key: 'b1213213213213213213'}]}
                    renderItem={({item}) => <Text style={{width:200,height:40}} onPress={() => this.onDetail(item.id)}>{item.key}</Text>}
                />*/}
                <View style={{flex:1, flexDirection: 'row', backgroundColor: '#eeeeee'}}>
                    <View style={{flex: 3, borderRightWidth: 1, borderRightColor: '#dddddd'}}>
                        <TouchableHighlight style={{flex:1}} onPress={() => this.setState({left:-9999})} underlayColor="transparent">
                            <View style={{flex:1}}>
                                {this.leftRendarRow()}
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 7}}>
                        <Text style={styles.totalNum}>共{this.state.totalNum}条商品信息</Text>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            contentContainerStyle={styles.listViewStyle}
                        />
                    </View>
                </View>

                {/*下拉列表*/}
                <View style={[styles.searchDownBox,{left: this.state.left}]}>
                    <View style={styles.ls}>
                        <Text>历史搜索记录</Text>
                        <TouchableHighlight style={styles.clearBtn} onPress={() => this.onClear()} underlayColor="#f7900f">
                            <Text style={{color:"#fff"}}>清空</Text>
                        </TouchableHighlight>
                    </View>
                    <FlatList
                        data={[{key: '笔记本电脑'}, {key: 'U盘'}, {key: 'Fall Out'}, {key: '鼠标'}]}
                        renderItem={({item}) =>
                            <TouchableHighlight onPress={() => this.onSearch(item.key)} underlayColor="transparent">
                                <View style={styles.ls}>
                                    <Text>{item.key}</Text>
                                    <Text style={[styles.arrow]}>&#xe902;</Text>
                                </View>
                            </TouchableHighlight>
                        }
                    />
                </View>
            </View>
        );
    }

    // 返回cell
    renderRow(data){
        if(data.time) {
            return (
                <View style={styles.innerViewStyle}>
                    <TouchableHighlight style={{flex:1}} onPress={() => this.toProductsDtl()} underlayColor="transparent">
                        <View style={{flex:1}}>
                            <View style={{flex: 3}}>
                                <View style={{flexDirection: 'row',flex: 1}}>
                                    <View style={{flex: 1}}>
                                        <Image
                                            style={styles.thumbnail}
                                            source={{uri: data.thumbnail}}/>
                                    </View>
                                    <View style={{flex: 2}}>
                                        <View style={{flex: 5}}><Text style={styles._name}>{data.name}</Text></View>
                                        <View style={{flexDirection: 'row',flex: 2}}>
                                            <Text style={styles._nprice}>{data.n_prive ? "￥" + data.n_prive : ""}</Text>
                                            <Text style={styles._price}>{data.price}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.userBox}>
                                <Text style={{color: '#999'}}>{data.time}由</Text>
                                <Text style={{color: '#1895ff'}}>{data.user}</Text>
                                <Text style={{color: '#999'}}>发布</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }else{
            return null;
        }
    };
    goBack() {
        this.props.navigation.goBack();
        return true;
    };
    //结果列表条目事件
    onSearch(str){
        console.log(str);
    };
    //链接详情
    onDetail(id){
        console.log(id);
    };
    //清空
    onClear(){

    };
    //点击输入框设置历史下拉列表显示与否
    setList(left){
        this.setState({left: left})
    };
    getText(){
        return this.state.text;
    };
    //左侧菜单
    leftRendarRow(){
        let leftDom = [];
        for(let i=0; i< this.state.leftCategoryData.length; i++){
            leftDom.push(
                <TouchableHighlight key={i}
                    style={(this.state.selectCategoryIndex == i ? styles.nameBoxHover: styles.nameBox)}
                    underlayColor={this.state.selectCategoryIndex == i? '#fff': '#eee'}
                    onPress={this.categoryClick.bind(this,i)}>
                        <Text style={{fontSize:16,
                            color: `${this.state.selectCategoryIndex == i? '#666': '#999'}`
                        }}>{this.state.leftCategoryData[i]}</Text>
                </TouchableHighlight>
            );
        }
        return (leftDom);
    };
    categoryClick(i){
        this.setState({
            selectCategoryIndex: i,
            totalNum: totalNumArr[i]
        });
    };
    toProductsDtl() {
        this.setState({left:-9999});
        this.props.navigation.navigate('ProductsDtl', { name: '商品详情' });
    }
}

const styles = StyleSheet.create({
    headerStyleAndroid:{
    	 backgroundColor: '#ff9123',
         height:40
    },
    headerStyleIOS:{
    	marginTop: 20,
    	padding:0,
    	backgroundColor: '#ff9123',
    	height:40,
    	flexDirection: 'row',
    	alignItems: 'flex-start'
    },
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
    icon: {
        width: 26,
        height: 26,
    },
    iconStyle: {
        paddingTop: 30,
        fontFamily:'icomoon',
        fontSize: 30,
        textAlign: 'center'
    },
    searchIpt: {
        margin:0,
        padding:0,
        width:100,
        height:20,
        fontSize:14,
        color: '#fff',
        backgroundColor: "#f00",
        borderWidth: 1,
        borderColor: '#0f0'
    },
    searchBtn: {
        marginRight: 10,
        fontFamily:'icomoon',
        fontSize: 20,
        color: "#fff"
    },
    searchDownBox: {
        position: 'absolute',
        top:0,
        width: screenW,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff'
    },
    ls: {
        width: screenW,
        height: 40,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    clearBtn: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        width: 50, height: 30, backgroundColor: '#f7900f'
    },
    arrowBox:{
        width:40,
        height:40,
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    arrow: {
        fontFamily:'icomoon',
        fontSize:20,
        textAlign: 'center',
        color: '#999'
    },

    //列表
    nameBox: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       height: 40,
       borderBottomWidth: 1,
       borderBottomColor: '#dddddd',
   },
   nameBoxHover: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#dddddd',
      marginRight: -3,
      borderRightWidth: 2,
      borderRightColor: '#ffffff',
      backgroundColor: '#ffffff'
   },
   totalNum: {
     fontSize: 14,
     paddingLeft: 5,
     height: 36,
     lineHeight: 30,
     backgroundColor: '#ffffff'
   },
    listViewStyle:{

    },
    innerViewStyle:{
        flex: 1,
        height:5/4*cellWH,
        backgroundColor: '#ffffff',
        marginBottom: 5
    },
    _name:{
        color: '#555',
        fontSize: 12
    },
    _nprice:{
        fontSize: 14,
        flex: 1,
        color: '#f7900f'
    },
    _price:{
        fontSize: 14,
        color: '#999999',
        alignSelf:'flex-end',
        textAlign:'right',
        textDecorationLine:'line-through',
        flex: 1,
        paddingRight: 10
    },
    thumbnail:{
        margin: 3,
        width: cellWH-6,
        height:9/10*cellWH-6
    },
    userBox: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor:'#dddddd',
        marginTop: 3,
        paddingLeft: 3
    }
});