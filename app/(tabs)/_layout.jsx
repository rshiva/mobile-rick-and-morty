import { Tabs } from "expo-router"
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabLayout = () => {
  return (
    <Tabs 
          screenOptions={{ tabBarActiveTintColor: 'green', tabBarInactiveTintColor: 'gray', }}>
        <Tabs.Screen 
            name="index"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            }}
        />
        <Tabs.Screen 
            name="saved"
            options={{
                title: 'Saved',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="bookmark" color={color} />,
            }}
        />
    </Tabs>
  )
}

export default TabLayout
