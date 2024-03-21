import { create } from 'zustand'
import axios from 'axios'

const useLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
  
  user: null,
  login: async (token) => {
    console.log('카카오가 준 토큰:', token) // 토큰이 잘 받아와지는지 확인
    try {
      const response = await axios.get('http://10.0.2.2:8080/auth/Oauth2/KakaoToken', { 
        params : { code : token },
      });
      console.log('Backend response:', response.data) // 백엔드 응답 로깅
      set({ user: response.data.user })
    } catch (error) {
      console.error('로그인 실패:', error)
      set({ isLogin: false, user: null })
    }
  },
  logout: () => set({ isLogin: false, user: null }),

}))

export default useLoginStore
