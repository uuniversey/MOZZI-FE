import React, { useRef } from 'react'
import { styled, ThemeProvider } from 'styled-components/native';
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
// import LandingScreen from './src/screens/landing/LandingScreen';
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
    title: 'Pretendard-Medium',
    content: 'Pretendard-Regular',
    fridge: 'MaruBuri-Regular'
  },
  palette: {
    main: '#1c1a11',
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
              tabBarHideOnKeyboard: true,
              tabBarShowLabel: false,
              headerShown: false,
              tabBarStyle: styles.tabBarStyle,
              tabBarIcon: ({ focused, size }) => {
                const color = focused ? 'gray' : 'lightgray' // Update color based on focused state
                let iconName

                if (route.name === 'MainTab') {
                  iconName = 'home'
                } else if (route.name === 'FridgeTab') {
                  iconName = 'kitchen'
                } else if (route.name === 'DiaryTab') {
                  iconName = 'calendar-month'
                } else if (route.name === 'UserTab') {
                  iconName = 'account-circle'
                }

                if (route.name === 'RecommendTab') {
                  return (
                    <Animated.View style={{ transform: [{ rotate: spin }] }}> {/* Animated View */}
                      <MaterialCommunityIcons name="casino" size={size} color={color} />
                    </Animated.View>
                  )
                }

                // Choose the correct icon set for each tab
                const IconComponent = route.name === 'FridgeTab' || route.name === 'DiaryTab' ? MaterialIcons : MaterialCommunityIcons;
                
                return <IconComponent name={iconName} size={size} color={color} />
              },
              tabBarButton: (props) => {
                if (route.name === 'RecommendTab') {
                  return (
                    <View style={styles.fabContainer} pointerEvents="box-none">
                      <TouchableOpacity
                        style={styles.fabButton}
                        onPress={() => {
                          props.onPress()
                          rotate() // 주사위 아이콘 회전
                        }}
                        activeOpacity={0.9} // 클릭시 투명해지는 효과 없앰
                      >
                        <MaterialCommunityIcons 
                          name="dice-multiple" 
                          size={40} 
                          color={props.color} 
                        />
                      </TouchableOpacity>
                    </View>
                  )
                } else {
                  return (
                    <TouchableOpacity style={styles.regularTab} {...props} />
                  );
                }
              },
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
  )
}

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





