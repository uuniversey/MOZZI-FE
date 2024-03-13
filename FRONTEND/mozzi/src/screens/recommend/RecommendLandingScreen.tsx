import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Animated } from 'react-native'

function RecommendLandingScreen () {
  
  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }
  
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Loop the animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 300], 
  });

  return (
    <>
      <TouchableOpacity onPress={goBack}>
        <Text>뒤로가기</Text>
      </TouchableOpacity>

      <View style={styles.container}>
      {/* <TouchableOpacity style={styles.backButton}
       onPress={rootNavigation.goBack} >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity> */}
      <Image
        source={require('../../assets/recommend/pizza.jpg')} // Replace with your local image path
        style={styles.diceImage}
      />
      <Text style={styles.description}>아우엉님 님의 {'\n'}레시피를 찾고 있어요!</Text>
       <View style={styles.outerBar}>
      <Animated.View
        // Apply the animated value to the inner bar
        style={[
          styles.innerBar,
          {
            // Use the translateX value as the transform
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
    </View>

    </>
  )
}

RecommendLandingScreen.options = {
  tabBarVisible: false, // 하단 탭 바 숨김
}


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
  diceImage: {
    width: 200, 
    height: 182.4,
    resizeMode: 'contain', 
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
})

export default RecommendLandingScreen