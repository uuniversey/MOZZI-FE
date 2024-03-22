import { create } from 'zustand'
import axios from '../../axios'
import useLoginStore from './LoginStore'

import AsyncStorage from '@react-native-async-storage/async-storage'

const useProfileStore = create((set) => ({
  profileData: '',
  getProfile: async () => {
    const token = await AsyncStorage.getItem('accessToken')
    console.log('토크은', token)
    try {
      const response = await axios.get('mozzi/auth/getUserProfile', {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰 포함
        }
      })
      set({ profileData: response.data })
      console.log('프로필 데이터 잘 받음', response.data)
    } catch (error) {
      console.error('프로필 데이터 요청 실패', error)
    }
  },

  settingProfile: async () => {
    try {
      const response = await axios.post('mozzi/auth/setfood')
      useLoginStore.getState().setLogin(true)
    } catch (error) {
      console.error('초기 프로필 정보 보내기 실패', error)
    }
  },
}))

export default useProfileStore
