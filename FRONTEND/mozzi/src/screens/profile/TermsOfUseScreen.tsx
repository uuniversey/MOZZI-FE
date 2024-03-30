import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import styled from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header/Header'

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.palette.background};
  display: flex;
  align-items: center;
  padding: 0 16px 0 16px;
`

const HeaderText = styled(Text)`
  color: ${(props) => props.theme.palette.font};
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 28px;
  margin-bottom: 20px;
  align-self: flex-start;
`


const Content = styled(ScrollView).attrs({
  contentContainerStyle: {
  },
})`
  width: 100%;
`

const PolicyText = styled(Text)`
  color: ${(props) => props.theme.palette.font};
`

function TermsOfUseScreen() {
  const navigation = useNavigation()
  return (
    <Container>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>
      
      <HeaderText>모찌 서비스 이용약관</HeaderText>

      <Content>
        <PolicyText>
          본 이용약관(이하 "약관")은 모찌 서비스(이하 "서비스")의 이용과 관련하여, 서비스 제공자(이하 "회사")와 이용자(이하 "회원") 사이의 권리, 의무 및 책임사항, 서비스 이용조건 및 절차, 회사와 회원의 권리와 의무 등 기본적인 사항을 규정합니다.
          {"\n\n"}1. 계약의 성립
          {"\n"}회원이 되고자 하는 자는 회사가 정한 가입 양식에 따라 회원정보를 기입하고, 본 약관의 내용에 대해 동의를 해야만 서비스의 회원으로 등록됩니다. 회원은 회원가입 시 제공한 정보에 변경이 있는 경우, 즉시 회원 정보를 갱신해야 합니다.
          {"\n\n"}2. 서비스 이용
          {"\n"}서비스는 회사의 정책에 따라 회원에게 제공되며, 회사는 서비스 내용을 변경하거나 추가할 권리를 보유합니다. 회원은 서비스를 비상업적인 개인적 용도로만 사용해야 하며, 어떠한 형태로든 서비스의 일부 또는 전체를 회사의 사전 허락 없이 판매, 전송, 출판 또는 방송하는 행위를 해서는 안 됩니다.
          {"\n\n"}3. 이용자의 의무
          {"\n"}회원은 서비스 이용 시 모든 법령과 약관의 규정, 이용안내 및 서비스 관련 공지사항 등 회사가 통지하는 사항을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 해서는 안 됩니다. 회원은 서비스의 이용권한, 기타 이용계약상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공하는 행위를 해서는 안 됩니다.
          {"\n\n"}4. 지적 재산권
          {"\n"}서비스에 포함된 모든 자료(텍스트, 그래픽, 비디오, 오디오 등)에 대한 저작권을 비롯한 지적 재산권은 회사에 귀속됩니다. 회원은 서비스를 통해 취득한 정보를 회사의 사전 동의 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 해서는 안 됩니다.
          {"\n\n"}5. 개인정보 보호
          {"\n"}회사는 관련 법률에 의거하여 회원의 개인정보를 보호하기 위해 노력하며, 회원의 개인정보 보호에 관하여 관련 법률에 정해진 바에 따라 처리합니다. 회사는 개인정보보호정책을 통하여 회원이 제공하는 개인정보의 보호 및 사용에 대해 명시하고 있습니다.
          {"\n\n"}6. 면책 조항
          {"\n"}회사는 회원이 서비스 제공으로부터 기대되는 이익을 얻지 못하였거나 서비스 자료에 대한 접근 또는 이용과정에서 입은 손해 등에 대해서는 책임을 지지 않습니다.
          {"\n\n"}7. 이용약관 변경
          {"\n"}본 이용약관은 서비스 변경 또는 법적 요구사항 변화에 따라 업데이트될 수 있습니다. 변경 사항이 있는 경우 서비스 내에서 공지하거나 사용자에게 직접 통지할 예정입니다.
          {"\n\n"}
        </PolicyText>
      </Content>
    </Container>
  )
}

export default TermsOfUseScreen