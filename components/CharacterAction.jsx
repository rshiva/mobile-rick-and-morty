import {Alert, Pressable, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { writeCharacter,deleteCharacter } from './CharacterSchema'


const CharacterAction = ({ result, page, onCharacterDeleted }) => {

   async function handleSave(){
    try {
        const id = await writeCharacter(result);
        Alert.alert(`${result.name} Saved`, '', [
        {
            text: 'Ok',
            onPress: () => console.log(`${id}`),
        }])
    } catch (error) {
        console.error('Error saving character:', error);
        Alert.alert('Error', 'Failed to save character');
    }
    }

    async function handleDelete(){
    try {
      Alert.alert(`Delete ${result.name} ?`, '', [
        {
          text: 'Ok',
          onPress: async () => {
            const id = await deleteCharacter(result.character_id);
            console.log(`${result.character_id} deleted`);
            if (onCharacterDeleted) {
              onCharacterDeleted();
            }
          }
        }])
    } catch (error) {
        console.error('Error saving character:', error);
        Alert.alert('Error', 'Failed to save character');
    }
    }

  return (
    <View className="flex-1 justify-center items-center">
      {page === "search" ? (
        <Pressable onPress={handleSave}>
          <FontAwesome size={28} name="bookmark-o" color="gray" />
        </Pressable>
      ) : (
          <Pressable onPress={handleDelete}>
          <FontAwesome size={28} name="trash" color="gray" />
        </Pressable>
      )}
       
    </View>
  )
}

export default CharacterAction

