/**
 * Created by Administrator on 2017/5/27.
 */
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import {
    View,
    Image,
    Text,
    Button,
    Picker,
    StyleSheet,
    Platform
} from 'react-native';

class ReleasePicker extends Component{
    constructor(props) {
        super(props);
        this.state = {
            class: ""
        };
    }

    render(){
        if(Platform.OS === "ios"){
            return(<View style={styles.pickerBox}>
                <Picker style={styles.classSelectIOS} prompt={this.props.prompt} mode="dialog"
                        selectedValue={this.state.class}
                        onValueChange={(value) => this.setState({class: value})}
                        itemStyle={{fontSize: 14,textAlign: 'left'}}>
                    {renderPickerItem(this.props.dataArr)}
                </Picker>
            </View>)
        }else{
            return(<Picker style={styles.classSelectAndroid} prompt={this.props.prompt} mode="dialog"
                    selectedValue={this.state.class}
                    onValueChange={(value) => this.setState({class: value})}>
                {renderPickerItem(this.props.dataArr)}
            </Picker>)
        }
    }
}

const renderPickerItem=function(arr){
    var renderPickerItemLs=[];
    let i = 0;
    for (let item of arr) {
        renderPickerItemLs.push(
            <Picker.Item label={item.label} value={item.value} key={i} />
        );
        i++;
    }
    return renderPickerItemLs;
}

const styles = StyleSheet.create({
    pickerBox: {
        marginTop: 6,
        height:28,flexDirection:"row",justifyContent:"flex-end",alignItems:'center',
        overflow: 'hidden'
    },
    classSelectAndroid: {
        flex: 1,
        marginTop: 2,
        height: 40,
        color: '#999',
        backgroundColor: 'transparent'
    },
    classSelectIOS: {
        flex: 1
    },
});
module.exports = ReleasePicker;
