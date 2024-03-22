import { create } from 'zustand';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFridgeStore = create((set) => ({
  allFoods: [],
  savedFoods: [],

  // 전체 식재료 데이터 불러오기 
  getAllFoods: async () => {
    const accessToken = await AsyncStorage.getItem('acessToken')
    try {
      const response = await axios.get('recommend/datas/get_ingredient_list/', {
        headers: {
          // Authorization: JSON.parse(accessToken),
        },
      });
      set({ allFoods: response.data.foods }) 
    } catch (error) {
      console.error('식재료 데이터 불러오기 실패:', error);
    }
  },

  // 냉장고에 이미 저장된 음식 불러오기
  getMyFoods: async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.get('recommend/get_ingredients_from_refrigerator/', {
        headers: {
          Authorization: JSON.parse(accessToken),
        },
      });
      set({ savedFoods: response.data.foods }) // 응답에서 받은 음식 리스트로 상태 업데이트
    } catch (error) {
      console.error('냉장고 내용물 로딩 실패:', error);
    }
  },

  // 냉장고에 새로운 음식 저장하기
  addFridge: async (food) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    set((state) => {
      const updatedFoods = [...state.savedFoods, food]
      return { savedFoods: updatedFoods }
    });

    try {
      await axios.post(
        'recommend/add_ingredients_to_refrigerator/',
        { foods: food },
        {
          headers: {
            Authorization: JSON.parse(accessToken),
          },
        }
      );
      console.log('냉장고 업데이트 성공')
    } catch (error) {
      console.error('냉장고 업데이트 실패:', error)
    }
  },
}));

export default useFridgeStore
