import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import Autocomplete from 'react-native-autocomplete-input';

interface FoodItem {
  id: number
  image: string
  title: string
}

interface SearchBarProps {
  data: FoodItem[]
}

const StyledAutocomplete = styled(Autocomplete)`
  border-width: 2px;
  border-color: #E4E196;
  border-radius: 5px;
  padding: 10px;
  background-color: white;
`;

const StyledList = styled.FlatList`
  border-width: 1px;
  border-color: #E4E196;
  border-radius: 5px;
  margin-top: 10px;
`;

export const SearchFood = ({ data, setQuery }) => {
  const [query, setLocalQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleAutoComplete = (text) => {
    setLocalQuery(text);
    if (text === '') {
      setFilteredData([]);
    } else {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <StyledAutocomplete
      data={filteredData}
      defaultValue={query}
      onChangeText={handleAutoComplete}
      placeholder="재료를 입력해 주세요..."
      flatListProps={{
        keyExtractor: (item, index) => index.toString(),
        renderItem: ({ item }) => (
          <TouchableOpacity onPress={() => { setQuery(item); setLocalQuery(item); }}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ),
        ListEmptyComponent: null,
      }}
      renderTextInput={(props) => <TextInput {...props} />}
      listContainerStyle={{ 
        maxHeight: 150, // 조절 가능한 최대 높이
      }}
    />
  );
};
