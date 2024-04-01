import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${(props) => props.disabled ? props.theme.palette.light : props.theme.palette.point};
  /* background-color: ${(props) => props.theme.palette.point}; */
  border-radius: 10px;
  padding: 5px 16px 5px 16px;
  align-items: center;
  align-self: flex-end;
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`;

const SmallButton = ({ text, onPress, style, disabled }) => {
  return (
    <ButtonContainer onPress={onPress} disabled={disabled} style={style}>
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
};

export default SmallButton