import { create } from 'zustand'
import axios from '../../axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useRecipeStore = create((set) => ({
  
  recipeData: [],
  recipeDetailData: [],

  getRecipe: async () => {
    try {
      const response = await axios.get('recommend/datas/get_recipe_list/')
      set({ recipeData: response.data.foods })
    } catch (error) {
      console.error('레시피 데이터 얻기 실패:', error)
    }
  },

  getRecipeDetail: async (foodName) => {
    const token = await AsyncStorage.getItem('accessToken')
    console.log(foodName)
    try {
      const response = await axios.get('recommend/datas/recipe_detail/',
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { foodName } // 단일 값으로 쿼리 파라미터를 설정
        }
      )
      set({ recipeDetailData: response.data.data })
      console.log('레시피 상세 데이터 얻기 성공')
    } catch (error) {
      console.error('레시피 상세 데이터 얻기 실패:', error)
    }
  }

}))

export default useRecipeStore
