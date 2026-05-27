import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { CultureCard } from "@/components/CultureCard";
import { EmptyState } from "@/components/EmptyState";
import { ProfileChip } from "@/components/ProfileChip";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { usePreferences } from "@/hooks/usePreferences";
import { useSaved } from "@/hooks/useSaved";

const fallbackPreferences = ["Nocturno", "Elegante", "Latino", "Melancólico"];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { tastePreferences, resetOnboarding } = usePreferences();
  const favorites = useFavorites();
  const saved = useSaved();
  const preferenceTags = getTopTags([...favorites.items, ...saved.items]);
  const preferences = tastePreferences.length ? tastePreferences : preferenceTags.length ? preferenceTags : fallbackPreferences;

  async function editPreferences() {
    await resetOnboarding();
    router.push("/onboarding");
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Perfil"
        title="Archivo personal"
        description="Tu gusto organizado como una colección privada."
      />

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" color={colors.activeGold} size={34} />
        </View>
        <Text style={styles.email}>{user?.email ?? "Invitado"}</Text>
        <Text style={styles.member}>Curador demo · Appetize local</Text>
      </View>

      <Text style={styles.preferenceTitle}>Preferencias culturales</Text>
      <View style={styles.chips}>
        {preferences.map((item) => (
          <ProfileChip key={item} label={item} />
        ))}
      </View>
      <AppButton
        label="Ajustar gustos iniciales"
        icon="options-outline"
        variant="subtle"
        style={styles.preferencesButton}
        onPress={editPreferences}
      />

      <View style={styles.favoritesPanel}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.panelEyebrow}>Favoritos</Text>
            <Text style={styles.panelTitle}>Cosas que realmente te gustaron</Text>
          </View>
          <View style={styles.favoriteBadge}>
            <Text style={styles.favoriteBadgeText}>{favorites.items.length}</Text>
          </View>
        </View>

        {favorites.items.length ? (
          <FlatList
            data={favorites.items}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CultureCard
                item={item}
                style={styles.favoriteCard}
                onToggleFavorite={favorites.toggleItem}
                onToggleSaved={saved.toggleItem}
                isFavorite={favorites.hasItem(item.id)}
                isSaved={saved.hasItem(item.id)}
              />
            )}
          />
        ) : (
          <EmptyState
            icon="heart-outline"
            title="Aún no hay favoritos"
            description="Marca con corazón las piezas que de verdad quieras conservar en tu perfil."
          />
        )}
      </View>

      <AppButton label="Cerrar sesión" icon="log-out-outline" variant="ghost" onPress={logout} />
    </Screen>
  );
}

function getTopTags(items: Array<{ tags?: string[] }>) {
  const counts = new Map<string, number>();

  items.forEach((item) => {
    item.tags?.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tag]) => tag);
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
    marginBottom: 22,
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
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  panelEyebrow: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  panelTitle: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 21,
    lineHeight: 27,
    marginTop: 2,
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
    marginBottom: 12,
  },
  preferencesButton: {
    marginBottom: 22,
  },
  favoritesPanel: {
    marginBottom: 20,
  },
  favoriteBadge: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparentGold,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  favoriteBadgeText: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
  },
  favoriteCard: {
    marginRight: 14,
  },
});
