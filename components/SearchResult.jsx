import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import CharacterData from './CharacterData'

const SearchResult = ({ results }) => {
    function renderItem({item}){
        return(
            <View key={item.id} className=" p-1 m-1 border-b-[1.5px] border-indigo-500  rounded-xl">
                <CharacterData result={item} page="search"/>
            </View>)
    }

  return (
      <View className="flex-1 bg-[#DFE7FD] m-2 rounded-xl">
            <FlatList
                data={results}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            >
            </FlatList>
        </View>
      
      
    )
  }

export default SearchResult

const styles = StyleSheet.create({})