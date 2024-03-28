import { create } from 'zustand'
import axios from '../../axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useDropdownStore = create((set) => ({
  
  dropdownData: [],
  allergyData: [],
  setDropdownData: (data) => {
    console.log(data)
    set({ dropdownData: data })
  },
}))

export default useDropdownStore
