import axios from 'axios'

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'https://a304.site/api/',
  // 기타 설정
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
});

export default instance