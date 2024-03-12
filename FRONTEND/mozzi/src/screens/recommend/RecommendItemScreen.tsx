// In DishOfTheDay.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Header } from '../components/Header/Header';
// import { useRootNavigation } from '../navigation/RootStackNavigation';

type Props = {
  date: string;
  question: string;
  dishName: string;
  imageUri: string;
  onSharePress: () => void;
  onRetryPress: () => void;
};

const RecommendItemScreen = ({
  date,
  question,
  dishName,
  imageUri,
  onSharePress,
  onRetryPress,
}: Props) => {

  // const rootNavigation = useRootNavigation<'Main'>();
  return (
    <View style={styles.container}>
       {/* <Header>
        <Header.Title title="글작성" />
        <Header.Icon iconName="close" onPress={rootNavigation.goBack} />
      </Header> */}
      <View style={styles.textContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.question}>{question}</Text>
      </View>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.dishName}>{dishName}</Text>
      <View style={styles.line} />
      <View style={styles.buttonContainer}>
      <View style={styles.timerContainer}>
        <Icon name="timer" size={20} color="#000" />
        <Text style={styles.time}>1시간</Text>
      </View>
        <TouchableOpacity onPress={onSharePress} style={styles.goRecipe}>
          <Text style={styles.buttonText}>레시피 보러가기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRetryPress} style={styles.retryRecipe}>
          <Text style={styles.buttonText}>다시 추천 받기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFEF2',
  },
  textContainer: {
    marginTop: 20,
    width: 350,
    justifyContent: 'flex-start',
  },
  date: {
    fontSize: 24,
    color: '#888',
  },
  question: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 300,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timerContainer: {
    flexDirection: 'row',
    width: 350,
    justifyContent: 'center',
    marginBottom: 15,
  },
  line: {
    borderBottomColor: '#000000',
    borderBottomWidth: 2, 
    width: '40%', 
    alignSelf: 'center', 
    marginBottom: 10, 
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10, 
  },
  buttonContainer: {
    flexDirection: 'column',
    width: 350,
  },
  goRecipe: {
    height: 60,
    backgroundColor: '#F9F7BB',
    borderRadius: 20,
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.2)', // 80% 투명도
    borderWidth: 2,
    elevation: 2,
    marginBottom: 15,
  },
  retryRecipe: {
    height: 60,
    backgroundColor: '#FFFEF2',
    borderRadius: 20,
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.2)', // 80% 투명도
    borderWidth: 2,
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default RecommendItemScreen;

