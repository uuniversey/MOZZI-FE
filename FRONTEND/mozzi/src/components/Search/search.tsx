import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Autocomplete from 'react-native-autocomplete-input';

interface FoodItem {
  id: number
  image: string
  title: string
}

interface SearchBarProps {
  data: FoodItem[]
}

export const SearchBar = ({ data }: SearchBarProps) => {

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredData, setFilteredData] = useState<FoodItem[]>([])

  // 자동 완성 데이터 필터링
  const handleAutoComplete = (text: string) => {
    setSearchQuery(text);
    const filtered = data.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filtered);
  }

  return (
    <>
      <View style={styles.searchSection}>
        <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
          <View style={styles.InputSection}>
            <Autocomplete
              data={filteredData}
              defaultValue={searchQuery}
              onChangeText={handleAutoComplete}
              inputContainerStyle={styles.input}
              flatListProps={{
                renderItem: ({ item }: { item: FoodItem }) => (
                  <TouchableOpacity style={styles.listButton} onPress={() => setSearchQuery(item.title)}>
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                ),
                scrollEnabled: true,
                style: { ...styles.list, ...styles.shadow },
              }}
            />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  searchSection: {
    marginTop: 30,
    width: 350,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E196',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  InputSection: {
    position: 'absolute',
    top: 4,
    left: 35,
    // marginTop: 30,
    // width: 350,
    // height: 55,
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: '#fff',
    // borderWidth: 1,
    // borderColor: '#E4E196',
    // borderRadius: 8,
    // paddingLeft: 10,
    // marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    width: 300,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: 'transparent',
  },
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
  listButton: {
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
