import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { ProfileChip } from "@/components/ProfileChip";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useSaved } from "@/hooks/useSaved";

const preferences = ["Nocturno", "Elegante", "Latino", "Melancólico"];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const favorites = useFavorites();
  const saved = useSaved();

  return (
    <Screen>
      <SectionHeader eyebrow="Perfil" title="Archivo personal" description="Tu gusto como colección viva." />

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" color={colors.mutedGold} size={34} />
        </View>
        <Text style={styles.email}>{user?.email ?? "Invitado"}</Text>
        <Text style={styles.member}>Curador demo · Appetize local</Text>
        <View style={styles.stats}>
          <StatCard value={favorites.items.length} label="Favoritos" />
          <StatCard value={saved.items.length} label="Guardados" />
        </View>
      </View>

      <Text style={styles.preferenceTitle}>Preferencias culturales</Text>
      <View style={styles.chips}>
        {preferences.map((item) => (
          <ProfileChip key={item} label={item} />
        ))}
      </View>

      <AppButton label="Cerrar sesion" icon="log-out-outline" variant="ghost" onPress={logout} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    padding: 22,
    alignItems: "center",
    gap: 12,
    marginBottom: 26,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  email: {
    color: colors.bone,
    fontFamily: fonts.bodyBold,
    fontSize: 16,
  },
  member: {
    color: colors.tertiary,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    marginBottom: 6,
  },
  stats: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  preferenceTitle: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 22,
    marginBottom: 12,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 26,
  },
});
