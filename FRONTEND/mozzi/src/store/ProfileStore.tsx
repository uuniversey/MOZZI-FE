import { create } from 'zustand'
import axios from '../../axios'
import useLoginStore from './LoginStore'

import AsyncStorage from '@react-native-async-storage/async-storage'

const useProfileStore = create((set) => ({
  profileData: '',
  getProfile: async () => {
    const token = await AsyncStorage.getItem('accessToken')
    try {
      const response = await axios.get('mozzi/auth/getUserProfile', {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰 포함
        }
      })
      set({ profileData: response.data })
      console.log('프로필 데이터 잘 받음111111111111', response.data)
    } catch (error) {
      console.error('프로필 데이터 요청 실패', error)
    }
  },

  // 닉네임 변경
  editNickname: async (nickname) => {
    const token = await AsyncStorage.getItem('accessToken')
    console.log('토큰이다', token)
    console.log('닉네임 잘넘어오니?', nickname)
    try {
      const response = await axios.patch('mozzi/auth/setnickname', {
        nickname
      }, {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰 포함
        }
      })
      console.log('닉네임 변경 성공', response.data)
      set((state) => ({
        profileData: {
          ...state.profileData,
          nickname: response.data.nickname,
        }
      }))
    } catch (error) {
      console.error('닉네임 변경 실패', error)
    }
  },
  
  // 비건 여부 변경
  editIsVegan: async (isVegan) => {
    const token = await AsyncStorage.getItem('accessToken')
    console.log(token)
    try {
      const response = await axios.patch('mozzi/auth/setvagan', {
        isVegan
      }, {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰 포함
        },
      })
      console.log('비건 여부 변경 성공', response.data)
      set((state) => ({
        profileData: {
          ...state.profileData,
          nickname: response.data.nickname,
        }
      }))
    } catch (error) {
      console.error('비건 여부 변경 실패', error)
    }
  },

}))

export default useProfileStore
