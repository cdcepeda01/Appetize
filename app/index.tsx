import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import { usePreferences } from "@/hooks/usePreferences";

export default function Index() {
  const { user, loading } = useAuth();
  const { onboardingComplete, loading: preferencesLoading } = usePreferences();

  if (loading || preferencesLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.mutedGold} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href={onboardingComplete ? "/(tabs)/home" : "/onboarding"} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
  },
});
