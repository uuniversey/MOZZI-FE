import React, { useRef } from 'react'
import { ThemeProvider, styled } from 'styled-components/native';
import { setCustomText } from 'react-native-global-props'; 
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import MainStack from './src/navigation/MainStack'
import FridgeStack from './src/navigation/FridgeStack'
import RecommendStack from './src/navigation/RecommendStack'
import DiaryStack from './src/navigation/DiaryStack'
import UserStack from './src/navigation/UserStack'
import LoginStack from './src/navigation/LoginStack'

import useLoginStore from './src/store/LoginStore'

const customTextProps = {
  style: {
    fontFamily: 'Pretendard-Medium', // 실제 폰트 파일 내 정의된 이름 사용
  }
};

const theme = {
  fonts: {
    // main: 'NanumMyeongjo',
    landing: 'Pretendard-Bold',
    title: 'Pretendard-Bold',
    content: 'Pretendard-Regular',
    fridge: 'MaruBuri-Bold'
  },
  palette: {
    background: '#FFFEF2',
    font: '#1c1a11',
    gray: '#888',
    light: '#e1dfd4',
    point: '#F9F7BB',
    point2: '#F9F7BB',
    pointDark: '#E4E196',
  }
};


// 전역 폰트 설정 적용
setCustomText(customTextProps)

const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get('window').width

const App: React.FC = () => {

  const { isLogin } = useLoginStore()
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // 주사위 아이콘의 각도를 회전시키는 함수
  const rotate = () => {
    // 회전 애니메이션을 초기화
    rotateAnim.setValue(0)
    // 애니메이션 실행
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  };

  // rotateAnim 값에 따라 outputRange에서 정의된 각도로 회전
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });


return (
    <ThemeProvider theme={theme}>
      {isLogin ? (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarStyle: styles.tabBarStyle,
              tabBarHideOnKeyboard: true,
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ focused, size, color }) => {
                if (route.name === 'RecommendTab') {
                  return (
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                      <MaterialIcons name="casino" size={size} color={focused ? theme.palette.pointDark : theme.palette.light } />
                    </Animated.View>
                  );
                }

                const iconName = {
                  MainTab: 'home',
                  FridgeTab: 'kitchen',
                  DiaryTab: 'calendar-month',
                  UserTab: 'account-circle',
                }[route.name];

                const Icon = route.name === 'FridgeTab' || route.name === 'DiaryTab' ? MaterialIcons : MaterialCommunityIcons;
                return <Icon name={iconName} size={size} color={focused ? theme.palette.pointDark : theme.palette.light } />;
              },
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  onPress={() => {
                    if (route.name === 'RecommendTab') {
                      rotate();
                    }
                    props.onPress();
                  }}
                />
              ),
            })}
          >
            <Tab.Screen name="MainTab" component={MainStack} />
            <Tab.Screen name="FridgeTab" component={FridgeStack} />
            <Tab.Screen name="RecommendTab" component={RecommendStack} />
            <Tab.Screen name="DiaryTab" component={DiaryStack} />
            <Tab.Screen name="UserTab" component={UserStack} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <LoginStack />
        </NavigationContainer>
      )}
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#ffffff',
    shadowOpacity: 0,
    elevation: 0,
    bottom: 0,
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  fabContainer: {
    top: 8,
    backgroundColor: '#ffffff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabButton: {
    backgroundColor: '#fff9b9',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  regularTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60 + 20,
  },
})

export default App





