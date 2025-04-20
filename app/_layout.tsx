import { useEffect } from 'react';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { SplashScreen, Stack } from 'expo-router';


export default function RootLayout() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(MaterialIcons.font);
      SplashScreen.hideAsync(); // hide splash after fonts load
    }
    loadFonts();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
