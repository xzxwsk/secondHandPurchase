/**
 * SplashScreen
 * 启动屏
 * from：http://www.devio.org
 * Author:CrazyCodeBoy
 * GitHub:https://github.com/crazycodeboy
 * Email:crazycodeboy@gmail.com
 * @flow
 */
'use strict';

import { NativeModules, Platform } from 'react-native';
if(Platform.OS === "ios"){
	module.exports = null;
}else{
	module.exports = NativeModules.SplashScreen;
}

