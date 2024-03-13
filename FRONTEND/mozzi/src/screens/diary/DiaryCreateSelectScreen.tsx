import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useNavigation } from '@react-navigation/native'

import Autocomplete from 'react-native-autocomplete-input'
import { Header } from '../../components/Header/Header'

interface Recipe {
  id: number;
  image: string;
  title: string;
}

function DiaryCreateSelectScreen () {

  const navigation = useNavigation() 

  const goBack = () => {
    navigation.goBack()
   }

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Recipe[]>([]);

  const data: Recipe[] = [
    {id: 1, image: '', title: "cheese"}, 
    {id: 2, image: '', title: "cheesetoast"}, 
    {id: 3, image: '', title: "cheesetaco"}, 
    {id: 4, image: '', title: "cheeseball"},
  ]; // 예시 데이터, 실제 사용시에는 서버에서 가져오거나 로컬 데이터베이스에서 조회할 수 있습니다.

  const handleSearch = () => {
    console.log('Performing search for:', searchQuery);
    // Implement your search logic here
  };

  // 자동 완성 데이터 필터링
  const handleAutoComplete = (text: string) => {
    setSearchQuery(text);
    const filtered = data.filter(item => item.title.toLowerCase().startsWith(text.toLowerCase()));
    setFilteredData(filtered);
  };

  return (
    <>
      <Header>
        <Header.Icon iconName="chevron-back" onPress={navigation.goBack} />
      </Header>
      <View style={styles.container}>
      <View style={styles.searchSection}>
        <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
        {/* <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          onSelectItem={item => {item && setSelectedItem(item.id)}}
          dataSet={data}  
        /> */}
       <Autocomplete
        data={filteredData}
        defaultValue={searchQuery}
        onChangeText={handleAutoComplete}
        // placeholder="어떤 레시피를 기록할까요?"
        inputContainerStyle={styles.input}
        flatListProps={{
          renderItem: ({ item }: { item: Recipe }) => (
            <TouchableOpacity style={styles.listButton} onPress={() => setSearchQuery(item.title)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          ),
          // Make sure scrolling is enabled
          scrollEnabled: true,
          // Set a maximum height
          style: { ...styles.list, ...styles.shadow }
        }}
      />
      </View>
      {/* <TextInput
        style={[styles.input, styles.longInput]}
        placeholder="치즈에 숨바꼭질"
      /> */}
      <View style={styles.enterContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFEF2',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
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
  searchIcon: {
    marginRight: 10,
  },
  input: {
    width: 300,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  image: {
    width: 20,
    height: 20
  },
  list: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'transparent',
    maxHeight: 300,
    zIndex: 100,
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
  longInput: {
    width: '85%',
  },
  enterContainer: {
    width: '85%',
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#F9F7BB',
    borderRadius: 10,
    padding: 10,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
})

export default DiaryCreateSelectScreen