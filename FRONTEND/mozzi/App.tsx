import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainStack from './src/navigation/MainStack';
import FridgeStack from './src/navigation/FridgeStack';
import RecommendStack from './src/navigation/RecommendStack';
import DiaryStack from './src/navigation/DiaryStack';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import LandingScreen from './src/screens/landing/LandingScreen';

const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get('window').width;

const App: React.FC = () => {
  const isLogin: boolean = true;
  // const isLogin: boolean = false;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // 주사위 아이콘의 각도를 회전시키는 함수
  const rotate = () => {
    // 회전 애니메이션을 초기화
    rotateAnim.setValue(0);
    // 애니메이션 실행
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  // rotateAnim 값에 따라 outputRange에서 정의된 각도로 회전
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });


  return (
    <>
      {isLogin ? (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarHideOnKeyboard: true,
              tabBarShowLabel: false,
              headerShown: false,
              tabBarStyle: styles.tabBarStyle,
              tabBarIcon: ({ focused, size }) => {
                const color = focused ? 'gray' : 'lightgray'; // Update color based on focused state
                let iconName;

                if (route.name === 'MainTab') {
                  iconName = 'home';
                } else if (route.name === 'FridgeTab') {
                  iconName = 'kitchen';
                } else if (route.name === 'DiaryTab') {
                  iconName = 'calendar-month';
                } else if (route.name === 'ProfileTab') {
                  iconName = 'account-circle';
                }

                if (route.name === 'RecommendTab') {
                  return (
                    <Animated.View style={{ transform: [{ rotate: spin }] }}> {/* Animated View */}
                      <MaterialCommunityIcons name="casino" size={size} color={color} />
                    </Animated.View>
                  );
                }

                // Choose the correct icon set for each tab
                const IconComponent = route.name === 'FridgeTab' || route.name === 'DiaryTab' ? MaterialIcons : MaterialCommunityIcons;
                
                return <IconComponent name={iconName} size={size} color={color} />;
              },
              tabBarButton: (props) => {
                if (route.name === 'RecommendTab') {
                  return (
                    <View style={styles.fabContainer} pointerEvents="box-none">
                      <TouchableOpacity
                        style={styles.fabButton}
                        onPress={() => {
                          props.onPress();
                          rotate(); // 주사위 아이콘 회전
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
                  );
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
            <Tab.Screen name="ProfileTab" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <LandingScreen />
      )}
    </>
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
});

export default App;
