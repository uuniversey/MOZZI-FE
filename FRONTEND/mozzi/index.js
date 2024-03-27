/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// App.tsx 파일 상단에 다음을 추가
import { setCustomText } from 'react-native-global-props'

const customTextProps = {
  style: {
    fontFamily: 'MaruBuri-Bold', // 실제 폰트 파일 내 정의된 이름 사용
  }
};

// 전역 폰트 설정 적용
setCustomText(customTextProps)


AppRegistry.registerComponent(appName, () => App);
