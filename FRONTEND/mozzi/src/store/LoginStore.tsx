import { create } from 'zustand';
import axios from 'axios';

const useLoginStore = create((set) => ({
  isLogin: false,
  user: null,
  login: async (token) => {
    try {
      const response = await axios.post('https://a304.site/api/auth/login', {
        token,
      });
      set({ isLogin: true, user: response.data.user });
    } catch (error) {
      console.error('Login failed:', error);
      set({ isLogin: false, user: null });
    }
  },
  logout: () => set({ isLogin: false, user: null }),
}));

export default useLoginStore;
