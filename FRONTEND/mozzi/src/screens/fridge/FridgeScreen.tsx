import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

// 이미지 리소스 import
import bread from '../../assets/fridge/bread.png';
import fruit from '../../assets/fridge/fruit.png';
import meat from '../../assets/fridge/meat.png';
import milk from '../../assets/fridge/milk.png';
import noodle from '../../assets/fridge/noodle.png';
import rice from '../../assets/fridge/rice.png';
import sauce from '../../assets/fridge/sauce.png';
import seafood from '../../assets/fridge/seafood.png';
import vege from '../../assets/fridge/vege.png';


// 화면 크기에 따른 상대적 위치 계산을 위한 변수들
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const fridgeWidth = 340; // 20px margin on each side
const fridgeHeight = 590; // 가상의 높이, 비율은 조정 필요
const shelfHeight = fridgeHeight / 5; // 선반의 높이

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #FFFEF2;
`;

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: left;
  margin-left: 80px;
  width: 100%;
`;

const StyledSvg = styled(Svg).attrs({
  height: fridgeHeight,
  width: fridgeWidth,
  viewBox: `0 0 ${fridgeWidth} ${fridgeHeight}`,
})``;

const StyledRect = styled(Rect)``;
const StyledCircle = styled(Circle)``;

const ImageIcon = styled.Image`
  width: 50px;
  height: 50px;
`;

const ShelfItemText = styled.Text`
  font-size: 12px;
  color: #000;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

const TouchableItem = styled.TouchableOpacity`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left ? props.left + 'px' : undefined};
  right: ${props => props.right ? props.right + 'px' : undefined};
`;



const FridgeScreen = () => {
  const navigation = useNavigation();

// numbers 객체에서 1부터 9까지의 값을 가진 키를 필터링
const validKeys = Object.keys(numbers).filter(key => numbers[key] >= 1 && numbers[key] <= 9);

const numbers = {
  1: 1,
  2: 1,
  3: 3,
  4: 3,
  5: 4,
  6: 5,
  7: 5,
  8: 6,
  9: 6,
  10: 3,
  11: 8,
  12: 9,
  13: 7,
  14: 6,
  15: 2,
  16: 2,
  17: 10,
  18: 10
};

// 아이템 데이터와 해당 순서
const items = [
  { name: '정육/계란류', img: meat, position: { top: 170, left: 80 } },
  { name: '수산물/건해산', img: seafood, position: { top: 170, left: fridgeWidth / 2 + 15 } },
  { name: '쌀/잡곡/견과', img: rice, position: { top: 300, left: fridgeWidth / 2 + 15 } },
  { name: '우유/유제품', img: milk, position: { top: 300, right: 80 } },
  { name: '베이커리/간식', img: bread, position: { top: 430, left: 80 } },
  { name: '양념/오일', img: sauce, position: { top: 430, left: fridgeWidth / 2 + 15 } },
  { name: '통조림/면류', img: noodle, position: { top: 430, right: 80 } },
  { name: '야채', img: vege, position: { top: 585, left: 105 } },
  { name: '과일', img: fruit, position: { top: 585, right: 105 } }
];

  return (
    <Container>
      <Title>나의 냉장고</Title>
      <StyledSvg>
        {/* 냉장고 테두리 */}
        <StyledRect
          x="10"
          y="10"
          width={fridgeWidth - 20}
          height={fridgeHeight - 20}
          fill="#FFFEF2"
          stroke="#CFDEEE"
          strokeWidth="20"
          rx="30"
          ry="30"
        />
        {/* 선반들 */}
        {[1.1, 2.2, 3.3].map((multiplier, index) => (
          <StyledRect
            key={index}
            x="20"
            y={(fridgeHeight / 5) * multiplier}
            width={fridgeWidth - 40}
            height="5"
            fill="#CFDEEE"
          />
        ))}
        {/* 야채칸, 서랍 손잡이 */}
        {/* 야채칸 */}
        <StyledRect
          x="30"
          y={fridgeHeight / 5 * 3.3 + 16}
          width={(fridgeWidth - 90) / 2 + 10}
          height={shelfHeight + 35}
          fill="#FFFEF2"
          stroke="#CFDEEE"
          strokeWidth="2"
          rx="5"
        />
        {/* 서랍 손잡이 */}
        <StyledCircle
          cx={fridgeWidth / 4 + 15}
          cy={fridgeHeight / 5 * 3.3 + 40}
          r="8"
          stroke="#CFDEEE"
          strokeWidth="2"
          fill="#FFFEF2"
        />
        <StyledRect
          x={fridgeWidth / 2 + 5}
          y={fridgeHeight / 5 * 3.3 + 16}
          width={(fridgeWidth - 90) / 2 + 10}
          height={shelfHeight + 35}
          fill="#FFFEF2"
          stroke="#CFDEEE"
          strokeWidth="2"
          rx="5"
        />
        <StyledCircle
          cx={fridgeWidth / 2 * 1.5 - 10}
          cy={fridgeHeight / 5 * 3.3 + 40}
          r="8"
          stroke="#CFDEEE"
          strokeWidth="2"
          fill="#FFFEF2"
        />
      </StyledSvg>

      {/* 아이템들 */}
      {/* 아이템들 - validItems를 사용해 필터링된 아이템만 렌더링 */}
      {items.map((item, index) => {
        if (!validKeys.includes(String(index + 1))) {
          return null;
        }
        const { top, left, right } = item.position;
        return (
          <TouchableItem
            key={index}
            top={top}
            left={left}
            right={right}
            onPress={() => navigateToFridgeDetail(item)}
          >
            <ImageIcon source={item.img} />
            <ShelfItemText>{item.name}</ShelfItemText>
          </TouchableItem>
        );
      })}
      {/* <TouchableItem top={170} left={80} onPress={() => navigateToFridgeDetail({ name: '정육/계란류', img: meat })}>
        <ImageIcon source={meat} />
        <ShelfItemText>정육/계란류</ShelfItemText>
      </TouchableItem>

      <TouchableItem top={170} left={fridgeWidth / 2 + 15} onPress={() => navigateToFridgeDetail({ name: '수산물/건해산', img: seafood })}>
        <ImageIcon source={seafood} />
        <ShelfItemText>수산물/건해산</ShelfItemText>
      </TouchableItem>

      <TouchableItem top={300} left={fridgeWidth / 2 + 15} onPress={() => navigateToFridgeDetail({ name: '쌀/잡곡/견과', img: rice })}>
        <ImageIcon source={rice} />
        <ShelfItemText>쌀/잡곡/견과</ShelfItemText>
      </TouchableItem>

      <TouchableItem top={300} right={80} onPress={() => navigateToFridgeDetail({ name: '우유/유제품', img: milk })}>
        <ImageIcon source={milk} />
        <ShelfItemText>우유/유제품</ShelfItemText>
      </TouchableItem>

      <TouchableItem top={430} left={80} onPress={() => navigateToFridgeDetail({ name: '베이커리/간식', img: bread })}>
        <ImageIcon source={bread} />
        <ShelfItemText>베이커리/간식</ShelfItemText>
      </TouchableItem>

      <TouchableItem top={430} left={fridgeWidth / 2 + 15} onPress={() => navigateToFridgeDetail({ name: '양념/오일', img: sauce })}>
        <ImageIcon source={sauce} />
        <ShelfItemText>양념/오일</ShelfItemText>
      </TouchableItem>

      <TouchableItem top={430} right={80} onPress={() => navigateToFridgeDetail({ name: '통조림/면류', img: noodle })}>
        <ImageIcon source={noodle} />
        <ShelfItemText>통조림/면류</ShelfItemText>
      </TouchableItem>

      <TouchableItem top={585} left={105} onPress={() => navigateToFridgeDetail({ name: '야채', img: vege })}>
        <ImageIcon source={vege} />
        <ShelfItemText>야채</ShelfItemText>
      </TouchableItem>

      <TouchableItem top={585} right={105} onPress={() => navigateToFridgeDetail({ name: '과일', img: fruit })}>
        <ImageIcon source={fruit} />
        <ShelfItemText>과일</ShelfItemText>
      </TouchableItem> */}
    </Container>
  );
};

export default FridgeScreen;
