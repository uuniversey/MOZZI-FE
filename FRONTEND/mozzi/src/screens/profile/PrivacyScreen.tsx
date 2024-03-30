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

function PrivacyScreen() {
  const navigation = useNavigation()
  return (
    <Container>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>
      
      <HeaderText>개인 정보 처리 방침</HeaderText>

      <Content>
        <PolicyText>
          본 개인정보 처리방침은 팀 Mozzi가 운영하는 요리 레시피 어플리케이션(이하 "서비스")을 이용하는 사용자(이하 "회원")의 개인정보를 어떻게 수집, 이용, 보관, 공유하는지에 대한 정보를 담고 있습니다. 회사는 회원의 개인정보를 매우 중요하게 생각하며, 개인정보 보호법 등 관련 법률을 준수하고 있습니다.
          {"\n\n"}1. 정보 수집
          {"\n"}서비스는 사용자가 서비스를 이용하는 동안 정보를 수집할 수 있습니다. 이는 다음과 같은 방법으로 수집될 수 있습니다:
          {"\n"}사용자가 직접 제공한 정보: (예: 회원 가입 시 제공하는 이메일 주소, 사용자 닉네임)
          {"\n"}서비스 이용 과정에서 수집하는 정보: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보
          {"\n"}서비스 이용 시 자발적 제공 정보: 요리 일기 사진
          {"\n\n"}2. 정보 사용
          {"\n"}수집된 정보는 다음과 같은 목적으로 사용될 수 있습니다:
          {"\n"}- 서비스 제공 및 개선
          {"\n"}- 사용자 지원
          {"\n"}- 사용자의 서비스 이용 행태 분석 및 통계
          {"\n"}- 법적 요구사항 준수
          {"\n\n"}3. 정보 공유 및 공개
          {"\n"}서비스는 다음과 같은 경우를 제외하고 사용자의 개인정보를 제3자와 공유하거나 공개하지 않습니다:
          {"\n"}- 사용자의 명시적 동의가 있는 경우
          {"\n"}- 법적 요구가 있거나 법적 절차 준수를 위해 필요한 경우
          {"\n"}- 서비스 제공에 필수적인 제3자 서비스 제공업체와의 공유(해당 업체들 역시 본 개인정보처리방침의 보호 조항을 준수해야 함)
          {"\n\n"}4. 사용자 권리
          {"\n"}사용자는 언제든지 자신의 개인정보에 대해 다음과 같은 권리를 행사할 수 있습니다:
          {"\n"}- 접근 권리
          {"\n"}- 정정 및 삭제 요청
          {"\n"}- 처리 제한 요청
          {"\n"}- 데이터 이동성
          {"\n\n"}5. 개인 정보의 안전성 확보 조치
          {"\n"}회사는 개인정보보호법 제29조에 따라 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위한 기술적, 관리적 및 물리적 조치를 하고 있습니다.
          {"\n\n"}6. 연락처
          {"\n"}서비스 이용 중 발생하는 모든 개인정보 보호 관련 문의는 [mozzicial@gmail.com]를 통해 문의하실 수 있습니다.
          {"\n\n"}7. 개인정보처리방침 변경
          {"\n"}본 개인정보처리방침은 서비스 변경 또는 법적 요구사항 변화에 따라 업데이트될 수 있습니다. 변경 사항이 있는 경우 서비스 내에서 공지하거나 사용자에게 직접 통지할 예정입니다.
          {"\n\n"}
        </PolicyText>
      </Content>
    </Container>
  )
}

export default PrivacyScreen