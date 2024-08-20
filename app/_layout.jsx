import { Stack, Tabs } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { useEffect } from "react";
import { createCharacterTable } from "../components/CharacterSchema";
import { Button } from "react-native";

export default function RootLayout() {
  
  useEffect(() => {
    createCharacterTable()
      .then(() => console.log('Character table created or already exists'))
      .catch(error => console.error('Error creating character table:', error));
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="episodes/[id]" options={{ headerShown: false,
        headerBackTitle: 'Back',
 }}  />
    </Stack>
    </GestureHandlerRootView>
  );
}
