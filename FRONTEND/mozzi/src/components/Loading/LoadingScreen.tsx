import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { Dice } from '../Animation/Dice'
import { ProgressBar } from '../Animation/ProgressBar'

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background};
`;

const LoadingText = styled(Text)`
  font-size: 24px;
  margin-top: 24px;
  text-align: center;
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.content};
`;

const LoadingScreen = ({ recipeDataLength }) => {
  if (recipeDataLength === 0) {
    return (
      <LoadingContainer>
        <Dice />
        <LoadingText>로딩 중...</LoadingText>
        <ProgressBar />
      </LoadingContainer>
    );
  }
  return null // If data is present, render nothing
};

export default LoadingScreen