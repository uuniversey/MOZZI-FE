import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header/Header'
import { SearchBar } from '../../components/Search/search'

interface FoodItem {
  id: number;
  image: string;
  title: string;
}

function DiaryCreateSelectScreen () {

  const navigation = useNavigation() 

  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const handleSearch = () => {
    console.log('Performing search for:', searchQuery);
  }

  const [recipeData, setRecipeData] = useState<FoodItem[] | null>(null)

  useEffect(() => {
    setRecipeData([
      {id: 1, image: '', title: "cheese"},
      {id: 2, image: '', title: "cheesetoast"},
      {id: 3, image: '', title: "cheesetaco"},
      {id: 4, image: '', title: "cheeseball"},
      {id: 5, image: '', title: "issactoast"},
      {id: 1, image: '', title: "cheesea"},
      {id: 2, image: '', title: "cheesetoasta"},
      {id: 3, image: '', title: "cheesetacoa"},
      {id: 4, image: '', title: "cheeseballa"},
      {id: 5, image: '', title: "issactoasta"},
      {id: 1, image: '', title: "cheesea"},
      {id: 2, image: '', title: "cheesetoasta"},
      {id: 3, image: '', title: "cheesetacoa"},
      {id: 4, image: '', title: "cheeseballa"},
      {id: 5, image: '', title: "issactoasta"},
    ]);
  }, []);

  return (
    <>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>
      <View style={styles.container}>
        {/* 검색 컴포넌트 추가 */}
        {recipeData && <SearchBar data={recipeData} />}
      <View style={styles.enterContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFEF2',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  searchSection: {
    marginTop: 30,
    width: 350,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E196',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    width: 300,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  image: {
    width: 20,
    height: 20
  },
  list: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'transparent',
    maxHeight: 300,
    zIndex: 100,
  },
  listButton: {
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  longInput: {
    width: '85%',
  },
  enterContainer: {
    width: '85%',
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#F9F7BB',
    borderRadius: 10,
    padding: 10,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: -10
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
})

export default DiaryCreateSelectScreen