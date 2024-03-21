import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'

import styled from 'styled-components/native'

const allergyList = [
      { label: '난류', value: 'egg' },
      { label: '우유', value: 'milk' },
      { label: '메밀', value: 'buckwheat' },
      { label: '땅콩', value: 'peanut' },
      { label: '대두', value: 'soy' },
      { label: '밀', value: 'wheat' },
      { label: '고등어', value: 'mackerel' },
      { label: '새우', value: 'shrimp' },
      { label: '게', value: 'crab' },
      { label: '돼지고기', value: 'pork' },
      { label: '복숭아', value: 'peach' },
      { label: '토마토', value: 'tomato' },
      { label: '아황산류', value: 'sulfites' },
      { label: '호두', value: 'walnut' },
      { label: '닭고기', value: 'chicken' },
      { label: '쇠고기', value: 'beef' },
      { label: '오징어', value: 'squid' },
      { label: '굴', value: 'oyster' },
      { label: '전복', value: 'abalone' },
      { label: '홍합', value: 'mussel' },
      { label: '잣', value: 'pine_nut' }
  ]

  const SelectedStyle = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    margin-right: 12px;
    border-radius: 14px;
    background-color: #F9F7BB;
`

const TextSelectedStyle = styled.Text`
  font-size: 16px;
`

function Allergy () {
  const [selected, setSelected] = useState([])

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
      <MultiSelect
        style={{borderBottomWidth:1, borderBottomColor:'silver'}}
        data={allergyList}
        labelField="label"
        valueField="value"
        placeholder="보유하고 있는 알레르기 정보를 선택해 주세요"
        placeholderStyle={{fontSize:14, color:'#ccc'}}
        value={selected}
        onChange={item => {
          setSelected(item)
        }}

        // renderItem={renderItem}

        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <SelectedStyle>
              <TextSelectedStyle>{item.label}</TextSelectedStyle>
            </SelectedStyle>
          </TouchableOpacity>
        )}
      />
    </>
  )
}

export default Allergy