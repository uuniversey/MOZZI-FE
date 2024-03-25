import { create } from 'zustand';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFridgeStore = create((set) => ({
  allFoods: [],
  savedFoods: [],

  // 전체 식재료 데이터 불러오기 
  getAllFoods: async () => {
    const token = await AsyncStorage.getItem('accessToken')
    // console.log('토큰:', token)
    try {
      const response = await axios.get('recommend/datas/get_ingredient_list/', {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰 포함
        }
      });
      set({ allFoods: response.data.data.ingredients }) 
    } catch (error) {
      console.error('식재료 데이터 불러오기 실패:', error);
    }
  },

  // 냉장고에 이미 저장된 음식 불러오기
  // 번호를 인자로 받아야 함
  // getMyFoods: async (categoryIds) => {
  //   const token = await AsyncStorage.getItem('accessToken');
  //   // console.log('토큰:', token);
  //   try {
  //     const response = await axios.post(
  //       'recommend/datas/get_ingredient_list_per_category/',
  //       { category: categoryIds },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     set({ savedFoods: response.data.data.foods }); // 응답에서 받은 음식 리스트로 상태 업데이트
  //   } catch (error) {
  //     console.error('냉장고 내용물 로딩 실패:', error);
  //   }
  // },


  // 각 카테고리별 저장된 음식 호출
  getMyFoods: async (categoryId) => {
    const token = await AsyncStorage.getItem('accessToken');
    try {
      // 단일 카테고리 ID에 대한 요청 전송
      const response = await axios.post(
        'recommend/datas/add_ingredients_to_refrigerator/',
        { category: [categoryId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // 응답에서 받은 음식 리스트로 상태를 업데이트
      set((state) => ({
        savedFoods: [...state.savedFoods, ...response.data.data.foods] // 이전 상태에 새로운 음식들을 추가합니다.
      }));
    } catch (error) {
      console.error('냉장고 내용물 로딩 실패:', error);
    }
  },

  // 냉장고에 새로운 음식 저장하기
  addFridge: async (food) => {
    const token = await AsyncStorage.getItem('accessToken')
    console.log('토큰:', token)
    set((state) => {
      const updatedFoods = [...state.savedFoods, food]
      return { savedFoods: updatedFoods }
    });

    try {
      console.log(`내가 보낼 데이터: ${food}`)
      await axios.post(
        'recommend/datas/add_ingredients_to_refrigerator/',
        { foods: [food] },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('냉장고 업데이트 성공')
    } catch (error) {
      console.error('냉장고 업데이트 실패:', error)
    }
  },

  // 저장된 음식 삭제하기
  deleteFood: async (food) => {
    // const token = await AsyncStorage.getItem('accessToken');
    console.log('토큰:', token);
    try {
      await axios.delete(
        'recommend/datas/add_ingredients_to_refrigerator/',
        { foods: [food] },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      set((state) => {
        const updatedFoods = state.savedFoods.filter((food) => food !== foodName);
        return { savedFoods: updatedFoods };
      });
      console.log('냉장고 음식 삭제 성공');
    } catch (error) {
      console.error('냉장고 음식 삭제 실패:', error);
    }
  },
}));

export default useFridgeStore

