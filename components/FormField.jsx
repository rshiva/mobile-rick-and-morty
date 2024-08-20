import { Text, Pressable, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const FormField = ({ value, placeholder, handleChangeText, label}) => {
  return (
      
    <SafeAreaView>
    <View className="relative items-center">
        <Text className="text-base mb-2">{label}</Text>
        <TextInput 
            value={value}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            className={"border-2 border-gray-600 p-2 px-10 text-base rounded-3xl w-full"}

        />
        <View
            // onPress={onSearchPress}
            className="absolute right-3 top-11">
            <FontAwesome name="search" size={20} color="gray" />
        </View>
    </View>
    </SafeAreaView>
  )
}

export default FormField
