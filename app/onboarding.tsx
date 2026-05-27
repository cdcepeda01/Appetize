import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { CategoryChip } from "@/components/CategoryChip";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/colors";
import { radius, spacing } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { moods } from "@/data/curatedContent";
import { usePreferences } from "@/hooks/usePreferences";

const cultureInterests = ["Cine", "Libros", "Música", "Arte"];
const starterSelection = ["Nocturno", "Elegante", "Melancólico"];

export default function OnboardingScreen() {
  const { saveTastePreferences } = usePreferences();
  const [selected, setSelected] = useState<string[]>(starterSelection);
  const [saving, setSaving] = useState(false);

  function togglePreference(preference: string) {
    setSelected((current) =>
      current.includes(preference)
        ? current.filter((item) => item !== preference)
        : [...current, preference],
    );
  }

  async function finish(preferences = selected) {
    try {
      setSaving(true);
      await saveTastePreferences(preferences);
      router.replace("/(tabs)/home");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.hero}>
        <View style={styles.iconFrame}>
          <Ionicons name="sparkles-outline" size={24} color={colors.activeGold} />
        </View>
        <Text style={styles.eyebrow}>Onboarding inicial</Text>
        <Text style={styles.title}>Define tu gusto cultural</Text>
        <Text style={styles.description}>
          Elige algunos territorios y estados de ánimo para que Appetize empiece a sentirse como un archivo propio.
        </Text>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.panelEyebrow}>Primero</Text>
            <Text style={styles.panelTitle}>¿Qué quieres descubrir?</Text>
          </View>
        </View>

        <View style={styles.chips}>
          {cultureInterests.map((interest) => (
            <CategoryChip
              key={interest}
              label={interest}
              selected={selected.includes(interest)}
              onPress={() => togglePreference(interest)}
            />
          ))}
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.panelEyebrow}>Luego</Text>
            <Text style={styles.panelTitle}>¿Qué tono te atrae hoy?</Text>
          </View>
        </View>

        <View style={styles.chips}>
          {moods.map((mood) => (
            <CategoryChip
              key={mood}
              label={mood}
              selected={selected.includes(mood)}
              onPress={() => togglePreference(mood)}
            />
          ))}
        </View>
      </View>

      <View style={styles.note}>
        <Ionicons name="lock-closed-outline" size={16} color={colors.mutedGold} />
        <Text style={styles.noteText}>Tus gustos quedan guardados solo en este dispositivo por ahora.</Text>
      </View>

      <View style={styles.actions}>
        <AppButton
          label={saving ? "Guardando..." : "Crear mi curaduría"}
          icon="checkmark-circle-outline"
          onPress={() => finish()}
          disabled={saving}
        />
        <Pressable
          onPress={() => finish(starterSelection)}
          disabled={saving}
          style={({ pressed }) => [styles.skipButton, pressed && styles.pressed]}
        >
          <Text style={styles.skipText}>Saltar por ahora</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    gap: spacing.lg,
    paddingBottom: spacing["4xl"],
  },
  hero: {
    gap: 10,
    paddingTop: spacing.lg,
  },
  iconFrame: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparentGold,
    borderWidth: 1,
    borderColor: colors.hairline,
    marginBottom: 4,
  },
  eyebrow: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  title: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 38,
    lineHeight: 44,
  },
  description: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
  },
  panel: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: "rgba(26,26,26,0.9)",
    padding: spacing.lg,
    gap: spacing.md,
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  panelEyebrow: {
    color: colors.tertiary,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  panelTitle: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 22,
    lineHeight: 28,
    marginTop: 2,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  note: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: "rgba(185,160,106,0.08)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  noteText: {
    flex: 1,
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
  },
  actions: {
    gap: spacing.sm,
  },
  skipButton: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  skipText: {
    color: colors.softGray,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
  },
  pressed: {
    opacity: 0.72,
  },
});
