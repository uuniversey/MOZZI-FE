import { create } from 'zustand'
import axios from '../../axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useRecipeStore = create((set) => ({
  
  recipeData: [],
  worldcupData: [],
  recipeDetailData: [],
  ingredientData: [],

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
  },

  //////// 월드컵 관련 axios ////////
  // 월드컵 음식 선호도 업데이트 함수
  getWorldcupRecipe: async () => {
    try {
      const response = await axios.get('recommend/datas/random_food/')
      set({ worldcupData: response.data.data.foods });
    } catch (error) {
      console.error('월드컵용 레시피 데이터 가져오기 실패:', error);
    }
  },

  updatePreferences: async (foodPreferences) => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log(token)
    try {
      const response = await axios({
        method: 'put',
        url: 'recommend/datas/worldcup/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Bearer 토큰 사용
        },
        data: {
          foods: foodPreferences, // 음식 선호도 배열
        },
      });

      // 요청 성공 여부를 확인하고 적절한 액션을 취합니다.
      if (response.status === 200) {
        console.log('음식 선호도가 성공적으로 업데이트 되었습니다.');
      } else {
        console.error('음식 선호도 업데이트에 실패했습니다:', response.data);
      }
    } catch (error) {
      console.error('음식 선호도 업데이트 중 오류가 발생했습니다:', error);
    }
  },

}))

export default useRecipeStore
