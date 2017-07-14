/**
 * Created by Administrator on 2017/5/25.
 */
import React, { Component } from 'react';
import {
    Image,
    Button,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ListView,
    Platform
} from 'react-native';
// 导入json数据
var classfyData = require('../common/mainlist.json');
var ProductsTop = require("./productsTop");
let totalNumArr = [30,8,7,6,9];
// 一些常量设置
var Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;
const cellWH = screenW*2/9;
export default class ProductsList  extends Component{
    static navigationOptions = {
        tabBarLabel: '分类',
        tabBarIcon: ({ tintColor }) => (
            <View style={Platform.OS === 'ios' ? styles.mainTabBarIconIOS: styles.mainTabBarIconAndroid}>
                <Text style={[styles.iconStyle, {color: tintColor}]}>&#xe90c;</Text>
                <Text style={{fontSize:16,color: tintColor}}>分类</Text>
            </View>
        ),
    }

    // 初始化模拟数据
    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(classfyData.data),
        selectCategoryIndex: 0,
        leftCategoryData: ['全部信息','手机数码','衣帽服饰','家具家装','其他'],
        totalNum: totalNumArr[0]
      };
    }

    render() {
        const { goBack } = this.props.navigation;
        const { navigate } = this.props.navigation;
        return (
            <View style={[styles.container, {marginTop:(Platform.OS === 'ios'?20:0)}]}>
              <ProductsTop  navigate={ navigate } />
              <View style={{flex:1, flexDirection: 'row', backgroundColor: '#eeeeee'}}>
                <View style={{flex: 3, borderRightWidth: 1, borderRightColor: '#dddddd'}}>
                    {this.leftRendarRow()}
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
            </View>
        );
    }
    // 返回cell
    renderRow(data){
        if(data.time) {
            return (
                <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => this.toProductsDtl()}>
                <View style={styles.innerViewStyle}>
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
            );
        }else{
            return null;
        }
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
        //console.log(this);
        this.props.navigation.navigate('ProductsDtl', { name: '商品详情' });
    }
}
const styles = StyleSheet.create({
    mainTabBarIconAndroid:{
    	flex:1,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'
    },
    mainTabBarIconIOS:{
    	flex:1,paddingVertical:10,flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    },
    icon: {
        width: 26,
        height: 26,
    },
    iconStyle: {
        flex: 1,
        fontFamily:'icomoon',
        fontSize: 30,
        textAlign: 'center'
    },
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
