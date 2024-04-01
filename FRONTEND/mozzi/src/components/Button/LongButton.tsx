import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

const ButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.palette.point};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledIcon = styled(Icon)`
  margin-right: 10;
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`;

const LongButton = ({ text, iconName, iconSize, onPress, style }) => {
  return (
    <ButtonContainer onPress={onPress} style={style}>
      {iconName && <StyledIcon name={iconName} size={iconSize || 20} />}
      <ButtonText>  
        {text}
      </ButtonText>
    </ButtonContainer>
  );
};


export default LongButton