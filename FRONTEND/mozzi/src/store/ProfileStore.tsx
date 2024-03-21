import { create } from 'zustand'
import axios from '../../axios'
import useLoginStore from './LoginStore'

const useProfileStore = create((set) => ({
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
