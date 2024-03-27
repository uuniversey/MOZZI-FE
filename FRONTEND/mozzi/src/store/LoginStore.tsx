import { create } from 'zustand'
import axios from '../../axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WithdrawalScreen from '../screens/profile/WithdrawalScreen'

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
      if (response.data.data.info.isRegistered) {
        set({ isLogin: true })
        set({ userData: response.data.data.info })
      }

      // 토큰 스토리지에 저장
      await Promise.all([
        AsyncStorage.setItem('accessToken', JSON.stringify(response.data.data.token.accessToken).slice(1, -1)),
        AsyncStorage.setItem('refreshToken', JSON.stringify(response.data.data.token.refreshToken).slice(1, -1))
      ])

    } catch (error) {
      console.error('로그인 실패:', error)
      set({ isLogin: false, user: null })
    }
  },
  
  userWithdrawal: async () => {
    const token = await AsyncStorage.getItem('accessToken')
    try {
      const response = await axios.delete('mozzi/auth/deleteuser', {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰 포함
        }
      })
      console.log('회원 탈퇴 완료', response.data)
    } catch (error) {
      console.error('회원 탈퇴 요청 실패', error)
    }
  },
}))

export default useLoginStore
