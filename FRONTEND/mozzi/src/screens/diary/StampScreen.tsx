import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import { Header } from '../../components/Header/Header';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native'

const Container = styled(View)`
  flex: 1;
  background-color: #FFFEF2;
  align-items: center;
`;

const Body = styled.View`
  margin-top: 50px;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 400px;
  border-radius: 20px;
  background-color: #F9F7BB;
`

const FoodImage = styled.Image`
  width: 300px;
  height: 300px;
  border-radius: 5px;
`

const FramesContainer = styled(View)`
  width: 350px;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
`;

const ShareButton = styled(TouchableOpacity)`
  width: 85%;
  border-radius: 20px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 16px;
  margin-right: 16px;
  align-items: center;
  border-color: rgba(0, 0, 0, 0.2);
  background-color: #F9F7BB;
  border-width: 2px;
  elevation: 2;
`;

const ShareButtonText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

const Stamp = ({ navigation, route }) => {
  const { photo } = route.params;
  const viewRef = useRef();
  const [selectedFrame, setSelectedFrame] = useState('프레임1');

  // 선택 가능한 프레임 목록
  const frames = ['프레임1', '프레임2', '프레임3'];

  // 선택된 프레임으로 이미지를 편집하는 함수
  const editImageWithFrame = async () => {
    // 선택된 프레임에 따른 이미지 편집 로직이 필요합니다.
  };

  // 이미지 공유 함수
  const shareEditedImage = async () => {
    try {
      await editImageWithFrame();
      const uri = await captureRef(viewRef.current, {
        format: 'png',
        quality: 0.8,
      });

      // 이미지 공유 옵션
      const shareOptions = {
        title: '콘텐츠 공유',
        message: '모찌의 레시피로 만든 요리를 확인해보세요!', 
        url: uri, // 캡쳐한 이미지 URI 사용
      };

      await Share.open(shareOptions);
      console.log(result);
    } catch (error) {
      console.error("이미지 공유 중 오류 발생", error);
    }
  };

  return (
    <Container>
      {/* <Header>
        <Header.Icon iconName="chevron-back" onPress={goRecap} />
      </Header> */}
      <Body ref={viewRef}>
        <FoodImage source={photo} />
        {/* 선택된 프레임을 이미지 위에 표시하는 로직이 추가 */}
      </Body>

      <FramesContainer>
        {frames.map((frame, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedFrame(frame)}>
            <Text>{frame}</Text>
          </TouchableOpacity>
        ))}
      </FramesContainer>

      {/* 이미지 공유하기 버튼 */}
      <ShareButton onPress={shareEditedImage}>
        <ShareButtonText>이미지 공유하기</ShareButtonText>
      </ShareButton>
    </Container>
  );
};

export default Stamp;
