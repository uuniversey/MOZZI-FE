import { create } from 'zustand'

interface VideoStoreState {
  isVideoComplete: boolean;
  setVideoComplete: (isComplete: boolean) => void;
}

const useVideoStore = create<VideoStoreState>((set) => ({
  isVideoComplete: false,
  setVideoComplete: (isComplete: boolean) => set(() => ({ isVideoComplete: isComplete }))
}))

export default useVideoStore