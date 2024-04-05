declare module 'react-native-config' {
  interface Env {
    API_URL: string;
    KAKAO_NATIVE_APP_KEY: string;
  }

  const Config: Env;
  export default Config;
}