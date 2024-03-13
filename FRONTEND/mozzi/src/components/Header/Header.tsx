import React, { ReactElement } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { HeaderIcon } from './HeaderButton';
// import { HeaderTitle } from './HeaderTitle';

type CompoundComposition = {
  Icon: React.FC<{
    onPress: () => void;
    iconName: string;
  }>
}

const Container = styled.View<{ paddingTop: number }>`
  padding-top: ${({ paddingTop }) => paddingTop}px;
`

const HeaderContainer = styled.View<{ width: number }>`
  width: ${({ width }) => width}px;
  height: 40px;
  margin-top: 15px;
  margin-left: 22px;
`

export const Header: React.FC<{
  children: ReactElement[] | ReactElement;
}> &
  CompoundComposition = (props) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <Container paddingTop={insets.top}>
      <HeaderContainer width={width}>
        {props.children}
      </HeaderContainer>
    </Container>
  );
};

Header.Icon = HeaderIcon;
// Header.Title = HeaderTitle;
