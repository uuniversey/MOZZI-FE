import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const ShortsLandingScreen: React.FC = () => {
  // const rootNavigation = useRootNavigation<'Main'>();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      // 5초 후에 실행할 작업을 여기에 넣음
      // 예를 들어, 다른 화면으로 이동:
      // rootNavigation.replace('ShortsDownload');
    }, 5000); // 5초 = 5000밀리초

    // 컴포넌트가 언마운트될 때 타이머를 정리함
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    return () => clearTimeout(timer);
    
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 300], 
  });

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => startAnimation()); 
    };

    startAnimation();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-20deg', '20deg'],
  });
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}
      //  onPress={rootNavigation.goBack} 
       >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <View>
        <Animated.Image
          source={require('../assets/recommend/ladle.png')}
          style={[
            styles.filmReel,
            { transform: [{ rotate: spin }] }, 
          ]}
        />
        <Image
          source={require('../assets/recommend/pot.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.description}>아우엉님 님의 {'\n'} 추억을 요리하고 있어요!</Text>
       <View style={styles.outerBar}>
      <Animated.View
        style={[
          styles.innerBar,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFEF2', 
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  filmImage: {
    width: 150, 
    height: 50, 
    top: 10,
    left: 20,
  },
  image: {
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    marginBottom: 8,
  },
  description: {
    fontSize: 24,
    marginTop: 24,
    textAlign: 'center',
    color: '#000',
  },
  outerBar: {
    backgroundColor: '#F9F7BB', 
    width: '65%', 
    height: 6, 
    marginTop: 40,
    borderRadius: 10, 
    overflow: 'hidden', 
  },
  innerBar: {
    backgroundColor: '#E4E196', 
    width: '15%', 
    height: 6,
    borderRadius: 10, 
  },
  filmReel: {
    width: 100, 
    height: 100, 
    position: 'absolute', 
    left: 130,
    top: -30,
  },
});


export default ShortsLandingScreen;
