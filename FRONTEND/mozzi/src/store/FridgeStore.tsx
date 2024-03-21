import { create } from 'zustand';
import axios from '../../axios';

const useFridgeStore = create((set) => ({
  savedTexts: [],

  // 냉장고에 이미 저장된 음식 불러오기
  getFoods: async () => {
    try {
      const response = await axios.get('/recommend/get_ingredients_from_refrigerator/', {
        headers: {
          // Authorization: token,
        },
      });
      set({ savedTexts: response.data.foods }) // 응답에서 받은 음식 리스트로 상태 업데이트
    } catch (error) {
      console.error('냉장고 내용물 로딩 실패:', error);
    }
  },

  // 냉장고에 새로운 음식 저장하기
  addFood: async (text) => {
    set((state) => {
      const updatedTexts = [...state.savedTexts, text];
      return { savedTexts: updatedTexts };
    });

    try {
      await axios.post(
        '/recommend/add_ingredients_to_refrigerator/',
        { texts: text },
        // { headers: { Authorization: token } }
      );
      console.log('냉장고 업데이트 성공');
    } catch (error) {
      console.error('냉장고 업데이트 실패:', error)
    }
  },
}));

export default useFridgeStore