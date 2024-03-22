import { create } from 'zustand'
import axios from '../../axios'

const useRecipeStore = create((set) => ({
  
  recipeData2: [],

  getRecipe: async () => {
    try {
      const response = await axios.get('recommend/datas/get_recipe_list/')
      console.log('Backend response:', response.data) // 백엔드 응답 로깅
      set({ recipeData: response.data })
    } catch (error) {
      console.error('레시피 데이터 얻기 실패:', error)
    }
  },

}))

export default useRecipeStore
