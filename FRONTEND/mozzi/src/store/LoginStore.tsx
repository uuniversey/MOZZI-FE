import { create } from 'zustand'
import axios from '../../axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WithdrawalScreen from '../screens/profile/WithdrawalScreen'

const useLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
  
  userData: '',

  // 가짜 로그인 axios
  // login: async (token) => {
  //   console.log('카카오가 준 토큰:', token) // 토큰이 잘 받아와지는지 확인
  //   try {
  //     // axios.get 호출 대신 사용할 가짜 응답 데이터
  //     const fakeResponse = {
  //       data: {
  //         data: {
  //           info: {
  //             isRegistered: true,
  //             // 필요한 나머지 유저 정보를 여기에 추가
  //           },
  //           token: {
  //             accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiYSI6WyJST0xFX0dVRVNUIl0sImUiOiIzMzk4Nzc2MzU2IiwiZXhwIjoxNzEyMTkwNjk2fQ.ICDjKTfN2DkekuHq8H5WYSBioHfX6AA8dY6d1Sq-1Vg',
  //             refreshToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiYSI6WyJST0xFX0dVRVNUIl0sImUiOiIzMzk4Nzc2MzU2IiwiZXhwIjoxNzEyMTkwNjk2fQ.ICDjKTfN2DkekuHq8H5WYSBioHfX6AA8dY6d1Sq-1Vg',
  //           },
  //         }
  //       }
  //     };
      
  //     // 가짜 응답 데이터 사용
  //     const response = fakeResponse;
  //     console.log('Backend response:', response.data) // 백엔드 응답 로깅
  
  //     // 유저 데이터 저장
  //     if (response.data.data.info.isRegistered) {
  //       set({ isLogin: true })
  //       set({ userData: response.data.data.info })
  //       console.log('유저 데이터입니다아아아아', response.data.data.info)
  //     }
  
  //     // 토큰 스토리지에 저장
  //     await Promise.all([
  //       AsyncStorage.setItem('accessToken', response.data.data.token.accessToken),
  //       AsyncStorage.setItem('refreshToken', response.data.data.token.refreshToken)
  //     ])
  
  //   } catch (error) {
  //     console.error('로그인 실패:', error)
  //     set({ isLogin: false, userData: null })
  //   }
  // },

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
        console.log('유저 데이터입니다아아아아', response.data.data.info)
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

  // 탈퇴 시 로직
  userDataReset: () => set({
    userData: [],
  }),
}))

export default useLoginStore
