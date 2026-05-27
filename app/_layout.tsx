import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts as useManropeFonts,
} from "@expo-google-fonts/manrope";
import { AuthProvider } from "@/context/AuthContext";
import { LibraryProvider } from "@/context/LibraryContext";
import { PreferencesProvider } from "@/context/PreferencesContext";
import { colors } from "@/constants/colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [manropeLoaded] = useManropeFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    if (manropeLoaded) {
      SplashScreen.hideAsync();
    }
  }, [manropeLoaded]);

  if (!manropeLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <PreferencesProvider>
        <LibraryProvider>
          <StatusBar style="light" backgroundColor={colors.black} />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.black } }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="item/[id]" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </LibraryProvider>
      </PreferencesProvider>
    </AuthProvider>
  );
}
