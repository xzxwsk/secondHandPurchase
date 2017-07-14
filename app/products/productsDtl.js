/**
 * Created by Administrator on 2017/7/3.
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
    ScrollView,
    TextInput,
    Modal,
    Platform
} from 'react-native';
// 导入json数据
var dtlData = require('./productDtl.json');
import Banner from '../common/banner';
export default class ProductsDtl  extends Component{
    static navigationOptions = {
        header: null
    }

  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds,
      dataSource: ds.cloneWithRows(dtlData.data.msglist),
      selectCategoryIndex: 0,
      modalVisible: false
    };
  }
  setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  render() {
    return (
      <View style={[styles.container,{marginTop:(Platform.OS === 'ios'?20:0)}]}>
        <Banner/>
        <TouchableHighlight style={styles.backArrow}  underlayColor="rgba(27,18,13,0.6)" onPress={() => {this.goBack()}}>
            <Text style={styles.backArrowWord}>&#xe901;</Text>
        </TouchableHighlight>
        <View style={Platform.OS === 'ios'?styles.priceLineIOS:styles.priceLineAndroid}>
            <Text style={{flex: 1,color: '#ffffff',fontSize: 18,lineHeight: 30}}>￥{dtlData.data.n_price}</Text>
            <Text style={{flex: 2,color: '#ffffff',fontSize: 16,lineHeight: 30,textDecorationLine:'line-through',}}>￥{dtlData.data.price}</Text>
        </View>
        <View style={{borderBottomWidth: 1,borderBottomColor: '#dddddd', padding: 10, backgroundColor: '#fff'}}>
          <Text style={{color: '#333333', fontSize: 16}}>{dtlData.data.name}</Text>
        </View>
        <ScrollView >
          <View style={{flexDirection: 'row', padding: 10, backgroundColor: '#fff'}}>
            <Text style={{flex:1, color: '#999', fontSize: 14}}>{dtlData.data.page_view}人已浏览</Text>
            <Text style={{flex:1, color: '#999', fontSize: 14, textAlign: 'right'}}>{dtlData.data.leave_msg}条留言</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 10, backgroundColor: '#eeeeee'}}>
            <View style={{flexDirection: 'row',flex:1}}>
                <View style={[styles.isTip, (dtlData.data.is_zp == 0 ? {backgroundColor: '#fc5f5f'} : '' )]}>
                    <Text style={styles.isTipWord}>正</Text>
                </View>
                <View style={[styles.isTip, (dtlData.data.is_fp == 0 ? {backgroundColor: '#1895ff'} : '' )]}>
                    <Text style={styles.isTipWord}>票</Text>
                </View>
                <View style={[styles.isTip, (dtlData.data.is_bx == 0 ? {backgroundColor: '#5ab026'} : '' )]}>
                    <Text style={styles.isTipWord}>修</Text>
                </View>
            </View>
            <TouchableHighlight  underlayColor="transparent" onPress={() => {this.setModalVisible(true)}}>
              <Text style={styles._help}>?</Text>
            </TouchableHighlight>
          </View>
          <View style={{backgroundColor: '#fff', marginBottom: 20}}>
            <Text style={{color: '#999', fontSize: 16,borderBottomWidth: 1,borderBottomColor: '#dddddd', padding: 10, }}>商品详情</Text>
            <Text style={{color: '#333', fontSize: 16, padding: 10 }}>{dtlData.data.dtl}</Text>
          </View>
          <View style={{backgroundColor: '#fff', marginBottom: 20}}>
            <Text style={{color: '#999', fontSize: 16,borderBottomWidth: 1,borderBottomColor: '#dddddd', padding: 10, }}>取货地址</Text>
            <Text style={{color: '#333', fontSize: 16, padding: 10 }}>{dtlData.data.addr}</Text>
          </View>
          <View style={{backgroundColor: '#fff', marginBottom: 20}}>
            <Text style={{color: '#333', fontSize: 16,borderBottomWidth: 1,borderBottomColor: '#dddddd', padding: 10, }}>留言（{dtlData.data.msgnum}）</Text>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
          </View>
        </ScrollView>

          <View style={{backgroundColor: '#fff',flexDirection: 'row',borderTopWidth:1,borderColor:'#ddd'}}>
              <Text style={{color: '#333', fontSize: 16, padding: 10, flex: 2}}>{dtlData.data.mobile}</Text>
              <View style={{flex: 3,flexDirection: 'row',paddingRight: 10}}>
                  <TouchableHighlight style={styles._mobileBtn} underlayColor="#098dfd" onPress={() => this._onPressMobileBtn()}>
                      <Text style={styles.btnText}>电话咨询</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles._lmsgBtn} underlayColor="#ff991a" onPress={() => this._onPressMsgBtn()}>
                      <Text style={styles.btnText}>给卖家留言</Text>
                  </TouchableHighlight>
              </View>
          </View>
        <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.modalVisible}
            onShow={() => {}}
            onRequestClose={() => {}}
        >
            <View style={styles.popConBox}>
                <View style={styles.popCon}>
                  <View style={{flex: 3,borderBottomWidth: 1, borderColor: '#ddd',flexDirection: 'row',alignItems:'center',padding: 10}}>
                      <View style={[styles.isTip, {backgroundColor: '#fc5f5f', marginTop: 5}]}>
                        <Text style={styles.isTipWord}>正</Text>
                      </View>
                      <Text style={{color: '#666', fontSize: 16,flex: 4, marginLeft: 5}}>点亮此图标表示卖家承诺商品为正品行货</Text>
                  </View>
                  <View style={{flex: 3,borderBottomWidth: 1, borderColor: '#ddd',flexDirection: 'row',alignItems:'center',padding: 10}}>
                      <View style={[styles.isTip, {backgroundColor: '#1895ff', marginTop: 5}]}>
                        <Text style={styles.isTipWord}>票</Text>
                      </View>
                    <Text style={{color: '#666', fontSize: 16,flex: 4, marginLeft: 5}}>点亮此图标表示卖家可提供 购买时开具的正规发票</Text>
                  </View>
                  <View style={{flex: 3,borderBottomWidth: 1, borderColor: '#ddd',flexDirection: 'row',alignItems:'center',padding: 10}}>
                      <View style={[styles.isTip, {backgroundColor: '#5ab026', marginTop: 5}]}>
                        <Text style={styles.isTipWord}>修</Text>
                      </View>
                    <Text style={{color: '#666', fontSize: 16,flex: 4, marginLeft: 5}}>点亮此图标表示卖家商品在 保修期以内</Text>
                  </View>

                  <View style={{flex: 2, flexDirection: 'row'}}>
                    <TouchableHighlight style={{flex:1,flexDirection:"row", padding: 10, justifyContent:'center',alignItems:'center'}} underlayColor="transparent" onPress={() => {this.setModalVisible(false)}}>
                      <Text style={{color: '#1895ff', fontSize: 16, textAlign: 'center'}}>知道了</Text>
                    </TouchableHighlight>
                  </View>

                </View>
            </View>
        </Modal>
      </View>
    );
  }
  // 返回cell
  renderRow(data: string, sectionID: number, rowID: number){
      return(
              <View style={styles._msgBoxStyle}>
                <TouchableHighlight style={{flex:1,paddingHorizontal: 10}} underlayColor="#ededed" onPress={() => this.showGuest(rowID)}>
                    <View style={{flex:1,flexDirection: 'column'}}>
                        <View style={{flex: 1,flexDirection:'row'}}>
                          <View style={{flex: 1,flexDirection:'row'}}>
                            <Image
                              style={styles.userImg}
                              source={{uri: data.user_img}} />
                              <Text style={styles.userName}>{data.user_name}</Text>
                              {(data.is_seller == 0 ? <Text style={styles._seller}>卖家</Text>:<Text></Text>)}
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={styles.qaTime}>{data.time}</Text>
                          </View>
                        </View>
                        <View style={{flex: 1}}>
                              <Text style={styles.msgContent}>{(data.is_seller == 0 ? <Text>回复<Text style={{color:'#1895ff',marginRight: 3}}>{data.reply}</Text></Text>:<Text></Text>)}{data.content}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={this.state.selectCategoryIndex==rowID?styles.guestInfo:styles.guestInfoHide} rowID={rowID}>
                   <TextInput
                      style={styles._input}
                      maxLength = {300}
                      underlineColorAndroid='transparent'
                   />
                   <View style={{flex: 1,flexDirection:'row'}}>
                     <Text style={{flex: 1,color:'#999', marginTop:8}}>你还可以输入300个字</Text>
                     <TouchableHighlight style={styles._replyBtn} underlayColor="#ff991a" onPress={() => this._onPressBtn(rowID)}>
                         <Text style={styles.btnText}>回复</Text>
                     </TouchableHighlight>
                   </View>
                </View>
              </View>
      );
  };
  goBack(){
      this.props.navigation.goBack();
      return true;
  };
  _onPressBtn(rowID){
      console.log("回复");
  }
  _onPressMobileBtn(){
    console.log("电话");
  }
  _onPressMsgBtn(){
    console.log("留言");
  }
  showGuest(rowId){
      this.setState({
          selectCategoryIndex: rowId,
          dataSource: this.state.ds.cloneWithRows(dtlData.data.msglist)
      });
  }
  onModify() {
      this.setState({show: true})
  };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    backArrow: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(27,18,13,0.8)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backArrowWord: {
        fontFamily:'icomoon',
        fontSize: 20,
        color: "#fff"
    },
    priceLineAndroid: {
        flexDirection: 'row', height: 40, backgroundColor: '#fc5f5f'
    },
    priceLineIOS: {
        flexDirection: 'row', alignItems: "center", height: 40, backgroundColor: '#fc5f5f'
    },
    isTip: {
        backgroundColor: '#aaa',
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    isTipWord: {
        color:'#fff'
    },
    _help: {
        color: '#666',
        fontSize: 18,
        textAlign: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        lineHeight: 26,
        borderWidth: 1,
        borderColor: '#666'
    },
    _msgBoxStyle: {
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingBottom: 10
    },
    userImg:{
      width: 30,
      height: 30,
      borderRadius: 15,
      marginLeft: 5,
      marginTop: 5
    },
    userName:{
      marginTop: 10,
      color:'#999999',
      marginLeft: 3,
      fontSize: 16
    },
    qaTime:{
      marginTop: 10,
      color:'#999999',
      fontSize: 16,
      textAlign: 'right',
      marginRight: 15
    },
    msgContent:{
      marginLeft: 5,
      color:'#333333',
      fontSize: 16,
      marginTop: 3
    },
    _input: {
        height: 35,
        borderWidth: 1,
        backgroundColor: '#fff',
        marginTop: 3,
        borderRadius: 3,
        borderColor: '#ccc',
        padding: 0,
        paddingLeft: 5
    },
    _replyBtn:{
        backgroundColor:'#f7900f',
        width: 60,
        height: 30,
        marginTop: 5,
        borderRadius: 3
    },
    btnText: {
        color: '#fff',
        marginTop: 5,
        textAlign: 'center'
    },
    _replyBoxHide: {
      height : 0,
      borderWidth: 0
    },
    _replyBoxShow: {
      padding: 5,
      height : 75
    },
    guestInfo: {
        flex:1,
        marginHorizontal: 10
    },
    guestInfoHide:{
        height:0,
        borderWidth: 0,
        paddingBottom:0,
        overflow: 'hidden'
    },
    _seller: {
      backgroundColor: '#f7900f',
      borderRadius: 2,
      color: '#fff',
      width: 40,
      height: 20,
      marginLeft: 5,
      marginTop: 10,
      textAlign: 'center'
    },
    _mobileBtn: {
      backgroundColor:'#1895ff',
      width: 90,
      height: 30,
      marginTop: 5,
      borderRadius: 3,
      marginRight: 5
    },
    _lmsgBtn: {
      backgroundColor:'#f7900f',
      width: 110,
      height: 30,
      marginTop: 5,
      borderRadius: 3
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
        height: 260,
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

});
