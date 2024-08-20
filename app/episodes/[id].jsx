import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CharacterProfile from '@/components/CharacterProfile';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const CharacterDetail = () => {
  const { id } = useLocalSearchParams();
  const [character, setCharacter] = useState({});
  
  useEffect(() => {
    if (!id) {
      console.error('ID is undefined or null');  // Debugging line
      return;
    }

    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Failed to fetch character:', error);
      }
    };

    fetchCharacter(); // Call the function as soon as the component mounts or id changes
  }, [id]);

  return (
    <SafeAreaView>
    <View className="flex flex-row justify-between w-[90%] m-2">
      <View className="rounded-full w-[150px] h-[150px]">
        <Image
          source={{ uri: character.image }}
          className="w-full h-full rounded-full"
          resizeMethod='contain' />
      </View>
      <View className="flex flex-start gap-2 ml-2">
        <Text className="text-2xl font-bold text-wrap">{character.name}</Text>
        <Text className="flex-wrap"><Text className="font-bold">Status:</Text> {character.status}</Text>
        <Text className="flex-wrap"><Text className="font-bold">Species:</Text> {character.species}</Text>
        <Text className="flex-wrap"><Text className="font-bold">Gender: </Text>{character.gender}</Text>
        <Text className="flex-wrap"><Text className="font-bold">Origin: </Text>{character?.origin?.name}</Text>
        <Text className="flex-wrap"><Text className="font-bold">Current: </Text> {character?.location?.name}</Text>
      </View>
    </View>
      <CharacterProfile episodes={character.episode || []} />
    </SafeAreaView>
  );
};

export default CharacterDetail;

