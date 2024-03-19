import { create } from 'zustand'
import axios from 'axios'

const useRecipeStore = create((set) => ({
  
  recipeData: [],

  getRecipe: async (url) => {
    console.log(url) // url이 잘 받아와지는지 확인
    try {
      const response = await axios.get(url)
      console.log('Backend response:', response.data) // 백엔드 응답 로깅
      set({ recipeData: response.data })
    } catch (error) {
      console.error('레시피 데이터 얻기 실패:', error)
    }
  },

}))

export default useRecipeStore
