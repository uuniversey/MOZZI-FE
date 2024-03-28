import { create } from 'zustand';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useFridgeStore = create((set) => ({
  allFoods: [],
  savedFoods: [],
  resetSavedFoods: () => set({ savedFoods: [] }),
  

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
      console.log('식재료 데이터 불러오기 성공')
    } catch (error) {
      console.error('식재료 데이터 불러오기 실패:', error);
    }
  },


  // 각 카테고리별 저장된 음식 호출
  getMyFoods: async (pos) => {
    // console.log(`categoryId: ${categoryId}`)
    const token = await AsyncStorage.getItem('accessToken');
    try {
      // 단일 카테고리 ID에 대한 요청 전송
      const response = await axios.get(
        'recommend/datas/add_ingredients_to_refrigerator/',
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { storedPos: pos } // 단일 값으로 쿼리 파라미터를 설정
        }
      );

      // 응답에서 받은 음식 리스트로 상태를 업데이트
      // set((state) => ({
      //   savedFoods: [...state.savedFoods, ...response.data.data.foods] // 이전 상태에 새로운 음식들을 추가합니다.
      // }));
      set({
        savedFoods: response.data.data.foods // 새로운 음식 리스트로 상태를 완전히 교체합니다.
      });
      console.log('냉장고에 저장된 내용물 로딩 성공')
    } catch (error) {
      console.error('냉장고에 저장된 내용물 로딩 실패:', error);
    }
  },

  addFridge: async (food, pos) => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('토큰:', token);
  
    const newFood = { foodName: food, storedPos: pos };
    console.log(`newFood: ${JSON.stringify(newFood)}`);
  
    set((state) => {
      // 상태 업데이트를 위해 newFood 객체를 추가합니다.
      const updatedFoods = [...state.savedFoods, newFood];
      return { savedFoods: updatedFoods };
    });
  
    try {
      console.log(`내가 보낼 데이터: ${JSON.stringify({ foods: [newFood] })}`);
      const response = await axios.post(
        'recommend/datas/add_ingredients_to_refrigerator/',
        { foods: [newFood] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('냉장고 업데이트 성공', response.data); // 성공 응답 로그에 추가
    } catch (error) {
      console.error('냉장고 업데이트 실패:', error.response ? error.response.data : error);
    }
  },
  
  // // 냉장고에 새로운 음식 저장하기
  // addFridge: async (food, pos) => {
  //   const token = await AsyncStorage.getItem('accessToken')
  //   console.log('토큰:', token)
  //   console.log(`food: ${food}`)
  //   console.log(`storedPos: ${pos}`)
  //   const newFood = { foodName: food, storedPos: pos };
  //   console.log(`newFood: ${JSON.stringify(newFood)}`)

  //   set((state) => {
  //     const updatedFoods = [...state.savedFoods, food]
  //     return { savedFoods: updatedFoods }
  //   });

  //   try {
  //     console.log(`내가 보낼 데이터: ${food}`)
  //     await axios.post(
  //       'recommend/datas/add_ingredients_to_refrigerator/',
  //       { foods: [newFood] },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );
  //     console.log('냉장고 업데이트 성공')
  //   } catch (error) {
  //     console.error('냉장고 업데이트 실패:', error)
  //   }
  // },


  // 저장된 음식 삭제하기
  deleteFood: async (foodName) => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('토큰:', token);
    try {
      await axios.delete(
        'recommend/datas/add_ingredients_to_refrigerator/',
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: { foods: [foodName] } // 데이터를 옵션 객체의 data 속성에 전달
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

