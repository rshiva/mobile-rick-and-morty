import {  StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'expo-router';
import React from 'react'
import CharacterAction from './CharacterAction'

const CharacterData = ({ result, page, onCharacterDeleted }) => {
  return (
    <>
      <View className="flex flex-row justify-between w-[90%]" key={result.id}>
      <Link href={{
        pathname: '/episodes/[id]',
        params: { id: page === "saved" ? result.character_id : result.id},
      }}>
        <View className="w-[100px] h-[100px] shadow shadow-gray-600" key={result.id}>
          <Image 
            source={{ uri: result.image }}
              className="w-full h-full rounded-full"
            resizeMethod='contain' />
            
        </View>
          <View className="flex justify-center items-center  mx-4 h-[90%] text-wrap">
            <Text className="text-lg font-bold ml-4 p-1">{result.name}</Text>
          </View>
        </Link>
        <View>
          <CharacterAction result={result} page={page} onCharacterDeleted={onCharacterDeleted}/>
        </View>
    </View>
    
    </>
  )
}

export default CharacterData
