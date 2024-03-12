import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native'

function MainScreen() {
  const navigation = useNavigation()

  const moveSearch = () => {
    navigation.navigate("Search")
  }

  const moveRecap = () => {
    navigation.navigate("Recap")
  }
  
  return (
    <>
      <View>
        <Button title="검색 아이콘" onPress={moveSearch} />
      </View>
      <View style={styles.container}>
        {/* <Header>
          <Header.Title title="글작성" />
          <Header.Icon iconName="close" onPress={rootNavigation.goBack} />
        </Header> */}
          <View style={styles.contentContainer}>
            <Text style={styles.greeting}>환영해요, 아우엉님 님!</Text>
            <Text style={styles.question}>오늘은 어떤 레시피를 도전할까요?</Text>
            
            <View style={styles.card}>
              <Text style={styles.mealQuestion}>오늘 모찌에서 {"\n"}가장 많이 사랑받은 레시피는?</Text>
              <Image
                source={require('../../assets/recommend/pizza.jpg')} // Replace with your image URI
                style={styles.image}
              />
              <Text style={styles.mealName}>피자 최고</Text>
            </View>
            
            <TouchableOpacity style={styles.button}
              onPress={moveRecap}
              >
              <Text style={styles.buttonText}>나의 모찌 기록</Text>
            </TouchableOpacity>
          </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF2', 
  },
  contentContainer: {
    padding: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', 
    marginTop: 16,
  },
  question: {
    fontSize: 16,
    color: '#333', 
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(247, 207, 207, 0.7)', 
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  mealQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  image: {
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    marginBottom: 8,
  },
  mealName: {
    fontSize: 16,
    color: '#333', 
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'rgba(211, 236, 216, 0.7)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
  },
});

export default MainScreen