import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StyleSheet, Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import IconEntypo from 'react-native-vector-icons/Entypo';

interface RecipeCardProps {
  title: string
  imageSource: any
  day: string
}

const callMakeVideoApi = async (userId: string, bgmCategory: number) => {
  try {
    let response = await fetch('http://10.0.2.2:8000/maker/video_yk/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        bgm_category: bgmCategory,
      }),
    });
    let json = await response.json();
    console.log(json);
    // 성공했을 때
    if (response.ok) {
      Alert.alert("Success", "Video generation complete");
    } else {
      Alert.alert("Error", json.error || "Something went wrong");
    }
  } catch (error) {
    // 실패했을 때
    console.error(error);
    Alert.alert("Error", "Network request failed");
  }
};

const RecipeCard = ({
  title,
  imageSource,
  day,
}: RecipeCardProps)  => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardDay}>{day}</Text>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

function RecapScreen () {
  
  const navigation = useNavigation()

  const moveMakeShorts = () => {
    navigation.navigate("MakeShorts")
  }

  const goBack = () => {
   navigation.goBack()
  }
  

  // const rootNavigation = useRootNavigation<'Main'>();
  const myRecipes = [
    { title: '양념장 전', day: '일주일 전 먹은 음식', imageSource: require('../../assets/recommend/pizza.jpg') },
    { title: '한 접시 풀잎', day: '한 달 전 먹은 음식', imageSource: require('../../assets/recommend/chicken.jpg') },
  ];
  
  return (
    <>
      <TouchableOpacity onPress={goBack}>
        <Text>뒤로가기</Text>
      </TouchableOpacity>
      <View style={styles.container}>
      {/* <Header>
        <Header.Icon iconName="chevron-back" 
        onPress={() => {
          rootNavigation.replace('MainRecipe')
        }} />
      </Header> */}
        <Text style={styles.header}>나의 모찌 기록</Text>
      {myRecipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          day={recipe.day}
          title={recipe.title}
          imageSource={recipe.imageSource}
        />
      ))}
      <TouchableOpacity style={styles.button}
      //  onPress={() => {
      //   moveMakeShorts
      //   callMakeVideoApi('baloo365', 1);
      // }}
      onPress={moveMakeShorts}
      >
        <IconEntypo name="video" size={50} color="#000" />
        <Text style={styles.buttonText}>쇼츠 만들기</Text>
      </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF2',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#F9F7BB',
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardDay: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  button: {
    flexDirection: 'column',
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.2)', // 80% 투명도
    backgroundColor: '#FFFEF2',
    borderWidth: 2,
    elevation: 2,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecapScreen