import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import SplashScreen from "@/app/Screens/SplashScreen";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    checkAuthAndOnboarding();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const inAuthGroup = segments[0] === '(auth)';
      const inOnboarding = segments[0] === 'onboarding';

      if (!hasOnboarded && !inOnboarding) {
        // If hasn't onboarded, force them to onboarding
        router.replace('/onboarding');
      } else if (hasOnboarded && !isAuthenticated && !inAuthGroup) {
        // If onboarded but not authenticated, show get started
        router.replace('/(auth)/get-started');
      } else if (isAuthenticated && (inAuthGroup || inOnboarding)) {
        // If authenticated, go to main app
        router.replace('/(tabs)');
      }

      // Prevent going back to onboarding if already completed
      if (hasOnboarded && inOnboarding) {
        router.replace('/(auth)/get-started');
      }
    }
  }, [isLoading, isAuthenticated, hasOnboarded, segments]);

  const checkAuthAndOnboarding = async () => {
    try {
      const [onboardingStatus, authToken] = await Promise.all([
        AsyncStorage.getItem('hasOnboarded'),
        AsyncStorage.getItem('authToken')
      ]);

      setHasOnboarded(!!onboardingStatus);
      setIsAuthenticated(!!authToken);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [showSplash, setShowSplash] = useState(true);

  if (!loaded) return null;

  if (showSplash || isLoading) {
    return (
      <SplashScreen
        onFinish={() => {
          setShowSplash(false);
        }}
      />
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}
