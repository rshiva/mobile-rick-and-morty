import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router';

const HomePageCharacters = ({ randomCharacters }) => {
    
  return (
    <>
        {randomCharacters.map((character) => (
            
            <View key={character.id} className="w-1/3 p-2 items-center">
                <Link href={{
                    pathname: '/episodes/[id]',
                    params: { id: character.id},
                }}>
                <Image 
                source={{ uri: character.image }}
                className="w-[100px] h-[100px] rounded-full"
                resizeMethod='contain' />
                <Text className="text-center mt-2">{character.name}</Text>
                </Link>
            </View>
        ))}
    </>
  )
}

export default HomePageCharacters

const styles = StyleSheet.create({})