import { FlatList, SafeAreaView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Crypto from 'expo-crypto';

const CharacterProfile = ({ episodes }) => {
  const [episodesData, setEpisodesData] = useState([]);
  const episodeNumbers = episodes.map(episodeUrl => episodeUrl.split('/').pop());

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeNumbers}`);
      const data = await response.json();
      setEpisodesData(data);
    }
    fetchEpisodes();
  }, [episodes]);

  function renderItem({ item }) {
    return (
      <View key={item.id} className="p-2 ">
        <View key={item.id + Crypto.randomUUID()} className=" border-b-[1px] border-sky-500 p-3 rounded-md">
          <Text className="text-lg">{item.name}</Text>
          <Text className="text-sm">{item.air_date}</Text>
        </View>
      </View>
    )
  }

  return (
    <View className="flex flex-col p-4 bg-red-50 border h-full">
      <Text className="text-xl font-bold mb-4">Featured on</Text>
      <FlatList
        data={Array.isArray(episodesData) ? episodesData : [episodesData]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + Crypto.randomUUID()}
      />
    </View>
  )
}

export default CharacterProfile
