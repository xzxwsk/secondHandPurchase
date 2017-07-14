import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableHighlight
} from 'react-native';

// 获取屏幕宽度
var Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;

// 导入json数据
var shareData = require('./mainlist.json');


// 一些常亮设置
const cols = 2;
const cellWH = screenW/2-6;

const vMargin = (screenW - cellWH * cols) / (cols + 1);

const hMargin = 25;

class List  extends Component{
    // 初始化状态值(可以变化)
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(shareData.data)
        };
    }

    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                contentContainerStyle={styles.listViewStyle}
            />
        );
    }

    // 返回cell
    renderRow(data){
        return(
            <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.toProductsDtl()}>
                  <View style={styles.innerViewStyle}>
                    <Image source={{uri: data.thumbnail}} style={styles.iconStyle}/>

                      <View >
                          <Text style={styles._name} >{data.name}</Text>
                          <View style={{flexDirection: 'row',borderBottomWidth:0.5,borderColor:'#dddddd',marginTop:5,paddingBottom:5}}>
                            <Text style={styles._nprice}>{data.n_prive}</Text>
                            <Text style={styles._price}>{data.price}</Text>
                          </View>
                          <View style={{flexDirection: 'row',paddingTop:5,flex:1}}>
                            <Text style={styles._time}>{data.time}</Text>
                            <Text style={styles._user}>{data.user}</Text>
                          </View>
                      </View>
                  </View>
              </TouchableHighlight>
        );
    }
    toProductsDtl() {
        this.props.navigate('ProductsDtl', { name: '商品详情' });
    }
}

const styles = StyleSheet.create({
    listViewStyle:{
        // 主轴方向
        flexDirection:'row',
        // 一行显示不下,换一行
        flexWrap:'wrap',
        // 侧轴方向
        alignItems:'center', // 必须设置,否则换行不起作用
        backgroundColor: '#eeeeee'
    },

    innerViewStyle:{
        width:cellWH,
        height:48/35*cellWH,
        marginLeft:vMargin,
        marginTop:vMargin,
        // 文字内容居中对齐
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff'
    },

    iconStyle:{
        width:cellWH,
        height:26/35*cellWH,
        resizeMode:Image.resizeMode.cover //cover保留比例取垂直中间, contain保留比例取水平中间, stretch
    },
    _name:{
      color: '#555555',
      fontSize: 14,
      marginLeft: vMargin
    },
    _nprice:{
      marginTop: vMargin,
      paddingLeft: vMargin,
      fontSize: 18,
      flex: 2,
      color: '#f7900f'
    },
    _price:{
      marginTop: vMargin,
      paddingRight: vMargin,
      fontSize: 18,
      color: '#999999',
      alignSelf:'flex-end',
      textDecorationLine:'line-through',
      flex: 2,
      textAlign:'right'
    },
    _time:{
      fontSize: 14,
      color: '#999999',
      flex: 2,
      paddingLeft: vMargin,

    },
    _user:{
      paddingRight: vMargin,
      fontSize: 14,
      color: '#1895ff',
      flex: 2,
      textAlign:'right'

    }
});

module.exports = List;
