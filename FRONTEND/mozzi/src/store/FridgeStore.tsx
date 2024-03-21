import create from 'zustand';
import axios from 'axios';

const useFridgeStore = create((set) => ({
  savedTexts: [],
  addFridge: async (text) => {
    set((state) => {
      const updatedTexts = [...state.savedTexts, text]
      // 여기서 비동기 작업을 수행하지 않고 set 내부에서 상태를 업데이트
      return { savedTexts: updatedTexts }
    });

    // 냉장고에 재료 넣기
    try {
      await axios.post('서버의 API 엔드포인트', { texts: text }) // 수정: 서버에는 최신 text만 보냄
      console.log('냉장고 업데이트 성공')
    } catch (error) {
      console.error('냉장고 업데이트 실패:', error)
    }
  },
}))

export default useFridgeStore