import { create } from 'zustand'
import axios from '../../axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
  
  userData: '',

  login: async (token) => {
    console.log('카카오가 준 토큰:', token) // 토큰이 잘 받아와지는지 확인
    try {
      const response = await axios.get('mozzi/auth/Oauth2/KakaoToken', { 
        params : { code : token },
      });
      console.log('Backend response:', response.data) // 백엔드 응답 로깅
      // 유저 데이터 저장
      set({ userData: response.data.data.info })
      
      // 토큰 스토리지에 저장
      await Promise.all([
        AsyncStorage.setItem('accessToken', JSON.stringify(response.data.data.token.accessToken)),
        AsyncStorage.setItem('refreshToken', JSON.stringify(response.data.data.token.refreshToken))
      ])

    } catch (error) {
      console.error('로그인 실패:', error)
      set({ isLogin: false, user: null })
    }
  },
  logout: () => set({ isLogin: false, user: null }),

}))

export default useLoginStore
