

import React, { useEffect } from 'react';
import { View, Text, Linking } from 'react-native';

const KakaoRedirectScreen = () => {
  useEffect(() => {
    const handleUrl = async (url) => {
      // URL 스킴에 따라 분기 처리
      if (url.startsWith('kakaod0bc95d7670d552049dd5dc46d7999a0://oauth')) {
        const code = url.split('?code=')[1];
        // 추출된 코드를 서버로 보내 처리할 수 있습니다.
        await sendCodeToServer(code);
      }
    };

    const sendCodeToServer = async (code) => {
      try {
        // 백엔드 서버로 코드 전송
        const response = await fetch('YOUR_BACKEND_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
        // 처리 결과에 따른 작업 수행
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    // URL 변경 감지
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'active') {
        const url = await Linking.getInitialURL();
        if (url) {
          handleUrl(url);
        }
      }
    };

    Linking.addEventListener('url', (event) => {
      handleUrl(event.url);
    });

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl(url);
      }
    });

    return () => {
      Linking.removeEventListener('url', handleUrl);
    };
  }, []);

  return (
    <View>
      <Text>Kakao Redirect Screen</Text>
      {/* 화면에 필요한 내용 추가 */}
    </View>
  );
};

export default KakaoRedirectScreen;

