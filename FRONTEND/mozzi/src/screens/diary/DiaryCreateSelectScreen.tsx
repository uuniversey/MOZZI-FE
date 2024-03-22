import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header/Header'
import { SearchBar } from '../../components/AutoWord/SearchRecipe'

import axios from '../../../axios'

interface FoodItem {
  id: number;
  image: string;
  title: string;
}

function DiaryCreateSelectScreen () {

  const navigation = useNavigation() 

  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [recipeData, setRecipeData] = useState<FoodItem[] | null>(null)
  const [selectedRecipeKey, setSelectedRecipeKey] = useState<number | null>(null)
  const [selectedRecipeName, setSelectedRecipeName] = useState<string>('')
  
  const handleSearch = () => {
    navigation.navigate('DiaryCreate', {
      recipeKey: selectedRecipeKey,
      recipeName: selectedRecipeName,
    })
  }
  
  // 검색에서 레시피 선택 시 호출될 함수
  const handleSelectRecipe = (recipeKey: number, recipeName: string) => {
    setSelectedRecipeKey(recipeKey)
    setSelectedRecipeName(recipeName)
    console.log(recipeKey, recipeName)
  }

  const getRecipeList = async () => {
    try {
      // console.log('gi')
      //http://a304.site/api/mozzi/diary/setmydiary
      // axios.get('/recommend/get_ingredients_from_refrigerator/
      // http://a304.site/api/recommend/datas/get_recipe_list/
      const response = await axios.get('recommend/datas/get_recipe_list/')
      console.log(response.data)
      setRecipeData(response.data)
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

  useEffect(() => {
    // getRecipeList()
    setRecipeData([
      {id: 1, image: '', title: "치즈"},
      {id: 2, image: '', title: "치즈그라탕"},
      {id: 3, image: '', title: "치즈피자"},
      {id: 4, image: '', title: "치즈떡볶이"},
      {id: 5, image: '', title: "포테이트치즈피자"},
      {id: 1, image: '', title: "페퍼로니피자"},
      {id: 2, image: '', title: "김치치즈돈가스"},
      {id: 3, image: '', title: "치즈돈가스"},
      {id: 4, image: '', title: "고르곤졸라피자"},
      {id: 5, image: '', title: "콤비네이션피자"},
      {id: 1, image: '', title: "고구마피자"},
      {id: 2, image: '', title: "블랙타이거피자"},
      {id: 3, image: '', title: "하와이안피자"},
      {id: 4, image: '', title: "하와이안치즈피자"},
      {id: 5, image: '', title: "햄버거"},
    ])


  }, []);

  return (
    <>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>
      <View style={styles.container}>
        {/* 검색 컴포넌트 추가 */}
        {recipeData && <SearchBar data={recipeData} onSelect={handleSelectRecipe}/>}
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