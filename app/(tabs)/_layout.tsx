import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
//import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Layout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#25292e" translucent />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#25292e',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#b9fbc0',
          tabBarInactiveTintColor: '#c0c0c0',
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 14,
          },
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="index" // Points to app/index.tsx
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name={focused ? 'home' : 'home-filled'}
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* ResNet Tab */}
        <Tabs.Screen
          name="resnet_index" // Points to app/resnet.tsx
          options={{
            title: "ResNet",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name={focused ? 'image' : 'image-search'}
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* YOLO Tab */}
        <Tabs.Screen
          name="yolo_index" // Points to app/yolo.tsx
          options={{
            title: "YOLO",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name={focused ? 'center-focus-strong' : 'center-focus-weak'}
                size={24}
                color={color}
              />
            ),
          }}
        />

        {/* LLM Tab */}
        <Tabs.Screen
          name="llm_index" // Points to app/llm.tsx
          options={{
            title: "LLM",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name={focused ? 'chat' : 'chat-bubble-outline'}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
