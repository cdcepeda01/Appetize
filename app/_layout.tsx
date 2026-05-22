import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts as useInterFonts,
} from "@expo-google-fonts/inter";
import { AuthProvider } from "@/context/AuthContext";
import { LibraryProvider } from "@/context/LibraryContext";
import { colors } from "@/constants/colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  useEffect(() => {
    if (interLoaded) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded]);

  if (!interLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <LibraryProvider>
        <StatusBar style="light" backgroundColor={colors.black} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.black } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </LibraryProvider>
    </AuthProvider>
  );
}
