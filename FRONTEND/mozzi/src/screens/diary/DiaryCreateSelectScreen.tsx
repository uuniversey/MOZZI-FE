import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header/Header'
import { SearchBar } from '../../components/AutoWord/SearchRecipe'

import axios from '../../../axios'
import useRecipeStore from '../../store/RecipeStore'

interface FoodItem {
  photoUrl: string
  foodName: string
}

function DiaryCreateSelectScreen () {
  const navigation = useNavigation()
  // const { recipeData } = useRecipeStore()

  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [recipeData, setRecipeData] = useState<FoodItem[] | null>(null)
  const [selectedRecipeName, setSelectedRecipeName] = useState<string>('')
  
  const handleSearch = () => {
    navigation.navigate('DiaryCreate', {
      recipeName: selectedRecipeName,
    })
  }
   
  // 검색에서 레시피 선택 시 호출될 함수
  const handleSelectRecipe = (recipeName: string) => {
    setSelectedRecipeName(recipeName)
  }

  const getRecipeList = async () => {
    try {
      // console.log('gi')
      //http://a304.site/api/mozzi/diary/setmydiary
      // axios.get('/recommend/get_ingredients_from_refrigerator/
      // http://a304.site/api/recommend/datas/get_recipe_list/
      const response = await axios.get('recommend/datas/get_recipe_list/')
      // console.log(response.data.foods)
      setRecipeData(response.data.foods)
    } catch (error) {
      //응답 실패
      console.error(error)
    }
  }

  useEffect(() => {
    // console.log(recipeData)
    getRecipeList()

  }, [])

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
    zIndex: -10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
})

export default DiaryCreateSelectScreen