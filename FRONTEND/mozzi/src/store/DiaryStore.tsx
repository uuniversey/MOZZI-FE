import { create } from 'zustand'
import axios from '../../axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

const useDiaryStore = create((set) => ({
  calendarData: '',
  getCalendar: async (year, month) => {
    console.log('년도와 월 잘받았나?', year, month)
    const token = await AsyncStorage.getItem('accessToken')
    try {
      const response = await axios.get('mozzi/diary/getmydiary', {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰 포함
        },
        params: { 
          foodYear: "2024",
          foodMonth: "01",
        }
      })
      set({ calendarData: response.data.foods })
      console.log('캘린더 데이터 잘 받음', response.data)
    } catch (error) {
      console.error('캘린더 데이터 요청 실패', error)
    }
  },
}))

export default useDiaryStore
