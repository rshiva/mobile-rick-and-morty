import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { fetchAllCharacters } from '../../components/CharacterSchema'
import CharacterData from '@/components/CharacterData'
import { useFocusEffect } from '@react-navigation/native';

const Saved = () => {
  const [characters, setCharacters] = useState([]);

  const fetchSavedCharacters = useCallback(async () =>{
    try {
      const allSavedCharacters = await fetchAllCharacters();
      setCharacters(allSavedCharacters);
    } catch (error) {
      console.error('Error fetching rows:', error);
    }
  },[])

 useEffect(() => {
   fetchSavedCharacters(); // Fetch characters on component mount
 }, [fetchSavedCharacters]);

 useFocusEffect(
   useCallback(() => {
     fetchSavedCharacters(); // Fetch characters when the screen is focused
   }, [fetchSavedCharacters])
 );

 const handleCharacterDeleted = useCallback(() => {
   // This will trigger fetchSavedCharacters, which will update the state and cause a re-render
   fetchSavedCharacters();
 }, [fetchSavedCharacters]);
  
  return (
    <View className="flex-1 bg-[#DFE7FD] pt-2">
      <FlatList
        data={characters}
        renderItem={({item}) => (
            <View key={item.id} className="border-b-[1px] border-sky-500 p-2">
            <CharacterData 
              result={item} 
              page="saved"
              onCharacterDeleted={handleCharacterDeleted} 
               />
            </View>
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No saved characters found.</Text>}
      >
      
        {characters.map((character) => (
          <Text key={character.id}>{character.name}</Text>
        ))}
       </FlatList >
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({})