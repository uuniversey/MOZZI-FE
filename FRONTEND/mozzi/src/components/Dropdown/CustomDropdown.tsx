import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MultiSelect, Dropdown } from 'react-native-element-dropdown'

import styled from 'styled-components/native'

import useDropdownStore from '../../store/DropdownStore'

  const SelectedStyle = styled(View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    margin-right: 12px;
    border-radius: 14px;
    background-color: #F9F7BB;
`

const TextSelectedStyle = styled(Text)`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.content};
  color: ${(props) => props.theme.palette.font};
`

function CustomDropdown ({ data, placeholder, isMulti }) {
  const { setDropdownData } = useDropdownStore()
  const [selected, setSelected] = useState([])

  const handleData = (item) => {
    setDropdownData(item.value)
  }
  
  useEffect(() => {
    console.log(selected, '선택된 애들')
  }, [selected])

  // open했을때 css
  // const renderItem = item => {
  //   return (
  //     <View>
  //       <Text>{item.label}</Text>
  //     </View>
  //   )
  // }

  return (
    <>
      {isMulti ?
        <MultiSelect
          style={{borderBottomWidth:1, borderBottomColor:'silver'}}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          placeholderStyle={{fontSize:14, color:'#ccc'}}
          value={selected}
          onChange={item => {
            setSelected(item)
          }}

          // renderItem={renderItem}
          
          // 선택 했을 때 밑에 뜨는 타원 css
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <SelectedStyle>
                <TextSelectedStyle>{item.label}</TextSelectedStyle>
              </SelectedStyle>
            </TouchableOpacity>
          )}
        />
      :
        <Dropdown
          style={{ borderBottomWidth: 1, borderBottomColor: 'silver' }}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          placeholderStyle={{ fontSize: 14, color: '#ccc' }}
          value={selected}
          onChange={(item) => handleData(item)}
        />
      }
    </>
  )
}

export default CustomDropdown