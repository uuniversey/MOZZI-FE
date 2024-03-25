import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Autocomplete from 'react-native-autocomplete-input';
import useFridgeStore from '../../store/FridgeStore';

interface FoodItem {
  id: number;
  image: string;
  title: string;
}

const SearchSection = styled(View)`
  width: 350px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-width: 1;
  border-radius: 8px;
  border-color: #E4E196;
  padding-left: 10px;
  margin-bottom: 15px;
`

const InputForm = styled(View)`
  position: absolute;
  top: 4;
  /* top: 50; */
  left: 20;
` 

const StyledAutocomplete = styled(Autocomplete)`
  /* flex: 1; */
  z-index: 1001;
  width: 300px;
  background-color: #fff;
  border: transparent;
`;

const ListButton = styled(TouchableOpacity)`
  flex-direction: row;
`


export const SearchFood: React.FC<{ setQuery: (query: string) => void }> = ({ setQuery }) => {
  const [query, setLocalQuery] = useState('');
  const [filteredData, setFilteredData] = useState<FoodItem[]>([]);
  const allFoods = useFridgeStore((state) => state.allFoods);
  const getAllFoods = useFridgeStore((state) => state.getAllFoods);

  useEffect(() => {
    // `query`가 변경될 때마다 `setQuery`를 호출
    setQuery(query);
  }, [query, setQuery]);

  useEffect(() => {
    // 데이터를 가져온 후 상태를 업데이트
    getAllFoods().then(() => {
      console.log('푸드 데이터 베이스 로딩 완료')
      // console.log(`푸드 리스트: ${allFoods}`)
    });
  }, [getAllFoods]);
  

  // 자동 완성 데이터 필터링
  const handleAutoComplete = (text: string) => {
    setLocalQuery(text);
    if (text === '') {
      setFilteredData([]);
    } else {
      // // 문자열 배열에서 검색어가 포함된 항목만 필터링
      // const filtered = allFoods.filter((food) =>
      //   food.toLowerCase().includes(text.toLowerCase())
      // );
      // setFilteredData(filtered);
      const filtered = allFoods.filter((food) =>
      food && food.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }

  // 자동 완성 목록에서 항목을 선택했을 때 호출되는 함수
  const handleSelectItem = (item: string) => {
    setLocalQuery(item); // 로컬 상태 업데이트
    setQuery(item); // 상위 컴포넌트의 상태 업데이트
  };

  return (
    <SearchSection>
      <InputForm>
        <StyledAutocomplete
          data={filteredData}
          defaultValue={query}
          onChangeText={handleAutoComplete}
          inputContainerStyle={{ borderWidth: 0 }}
          flatListProps={{
            keyExtractor: (item, index) => index.toString(),
            renderItem: ({ item }) => (
              // <ListButton onPress={() => { setQuery(item); setLocalQuery(item.title); }}>
              //   <Text>{item}</Text>
              // </ListButton>
              <ListButton onPress={() => handleSelectItem(item)}>
                <Text>{item}</Text>
              </ListButton>
            ),
            scrollEnabled: true,
            style: { ...styles.list, ...styles.shadow },
          }}
          renderTextInput={(props) => <TextInput {...props} />}
          listContainerStyle={{
            maxHeight: 150, // 조절 가능한 최대 높이
          }}
        />
      </InputForm>
    </SearchSection>
  );
};


const styles = StyleSheet.create({
  list: {
    // position: 'absolute',
    top: -2,
    left: -6,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'transparent',
    maxHeight: 100,
    zIndex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
})