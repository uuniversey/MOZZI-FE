import { create } from 'zustand'
import axios from '../../axios'

const useDiaryStore = create((set) => ({
  getDiaryProfile: async () => {
    try {
      const response = await axios.post('mozzi/diary/getmydiary')
    } catch (error) {
      console.error('초기 프로필 정보 보내기 실패', error)
    }
  },
}))

export default useDiaryStore
