import { Text, View, SafeAreaView, ActivityIndicator } from 'react-native'
import FormField from '@/components/FormField'
import SearchResult from '@/components/SearchResult'
import { actionCreators, initialState, reducer } from '../../hooks/CharacterReducer'
import { useState, useReducer, useEffect, useCallback } from 'react'
import HomePageCharacters from '@/components/HomePageCharacters'
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState)
  const [randomCharacters, setRandomCharacters] = useState([]);

  

  const handleSearch = useCallback(async (text) => {

    if (!text.trim()) {
      dispatch(actionCreators.initial([]))
      return;
    }
    dispatch(actionCreators.loading)
    

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${text}`)
      const data = await response.json()
      dispatch(actionCreators.success(data))
    } catch (error) {
      dispatch(actionCreators.error());
    }
  }, [searchTerm])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, handleSearch]);

  
    function getRandomArray(length, max) {
        const arr = [];
        while (arr.length < length) {
            const randomNum = Math.floor(Math.random() * max) + 1;
            if (!arr.includes(randomNum)) {
                arr.push(randomNum);
            }
        }
        return arr;
    }

    
    const fetchRandomCharacters = useCallback(async () => {
     const randomArray = getRandomArray(9, 826);
        const response = await fetch(`https://rickandmortyapi.com/api/character/${randomArray}`)
        const data = await response.json();
        setRandomCharacters(data);
   },[])
    


  useFocusEffect(
    useCallback(() => {
      fetchRandomCharacters(); // Fetch characters when the screen is focused
    }, [fetchRandomCharacters])
  );

  const { loading, error, results } = state || initialState;


  return (
    <SafeAreaView className="flex-1 bg-[#DFE7FD]">
      <View className="flex-1 ">
        <View className="p-4">
          <Text className="text-3xl font-bold mx-auto">🛸 Rick and Morty 👦🏻</Text>
          <View className="">
            <FormField 
              value={searchTerm}
              placeholder="Rick Sanchez" 
              handleChangeText={(text) => setSearchTerm(text)}
              label="Search a Character"
            />
          </View> 
        </View>
      
      <View className="flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator animating={true} size="large" color="indigo" />
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center">
            <Text>Failed to load characters!</Text>
          </View>
        ) : (
            results ? (
               results?.results?.length > 0 ? (
                <SearchResult results={results.results || []} />
              ) : (
                <>
                <View className="items-center">
                  <Text className="font-medium text-xl mb-2">Here are some interesting characters</Text>
                </View>
                <View className="flex-1 flex-row flex-wrap  justify-between">
                    <HomePageCharacters randomCharacters={randomCharacters} />
                </View>
                </>
              )
            ) : null
          
        )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home
