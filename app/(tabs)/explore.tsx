import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CategoryChip } from "@/components/CategoryChip";
import { CultureCard } from "@/components/CultureCard";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { moods } from "@/data/curatedContent";
import { useCuratedContent } from "@/hooks/useCuratedContent";
import { useFavorites } from "@/hooks/useFavorites";
import { usePreferences } from "@/hooks/usePreferences";
import { useSaved } from "@/hooks/useSaved";
import { CultureType } from "@/types/culture";

const categories: Array<{ label: string; value: CultureType | "all" }> = [
  { label: "Todo", value: "all" },
  { label: "Cine", value: "movie" },
  { label: "Libros", value: "book" },
  { label: "Música", value: "music" },
  { label: "Arte", value: "art" },
];

export default function ExploreScreen() {
  const { items: allItems } = useCuratedContent();
  const favorites = useFavorites();
  const saved = useSaved();
  const { tastePreferences, loading: preferencesLoading } = usePreferences();
  const [category, setCategory] = useState<CultureType | "all">("all");
  const [mood, setMood] = useState<string>("");

  useEffect(() => {
    if (preferencesLoading || mood) {
      return;
    }

    const preferredMood = tastePreferences.find((preference) => moods.includes(preference));
    setMood(preferredMood ?? "Nocturno");
  }, [mood, preferencesLoading, tastePreferences]);

  const items = useMemo(() => {
    return allItems.filter((item) => {
      const categoryMatch = category === "all" || item.type === category;
      const moodMatch = !mood || item.tags?.includes(mood);
      return categoryMatch && moodMatch;
    });
  }, [allItems, category, mood]);

  return (
    <Screen>
      <View style={styles.headerPanel}>
        <View style={styles.headerTop}>
          <View style={styles.headerIcon}>
            <Ionicons name="compass-outline" size={22} color={colors.activeGold} />
          </View>
          <Text style={styles.headerMeta}>{items.length} piezas encontradas</Text>
        </View>
        <Text style={styles.kicker}>Explorar</Text>
        <Text style={styles.title}>Cultura para caminar solo</Text>
        <Text style={styles.description}>
          Filtra por categoría o estado de ánimo y arma una ruta cultural con personalidad.
        </Text>
      </View>

      <View style={styles.filterPanel}>
        <Text style={styles.filterLabel}>Categorías</Text>
        <View style={styles.chips}>
          {categories.map((item) => (
            <CategoryChip
              key={item.value}
              label={item.label}
              selected={category === item.value}
              onPress={() => setCategory(item.value)}
            />
          ))}
        </View>

        <Text style={styles.filterLabel}>Mood editorial</Text>
        <View style={styles.chips}>
          {moods.map((item) => (
            <CategoryChip key={item} label={item} selected={mood === item} onPress={() => setMood(item)} />
          ))}
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={1}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CultureCard
            item={item}
            style={styles.exploreCard}
            onToggleFavorite={favorites.toggleItem}
            onToggleSaved={saved.toggleItem}
            isFavorite={favorites.hasItem(item.id)}
            isSaved={saved.hasItem(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title="No encontramos esa combinación"
            description="Prueba otro mood o vuelve a Todo para abrir la selección completa."
          />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerPanel: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    padding: 18,
    marginBottom: 16,
    gap: 7,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparentGold,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  headerMeta: {
    color: colors.tertiary,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
  },
  kicker: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  title: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 30,
    lineHeight: 36,
  },
  description: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
  },
  filterPanel: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: "rgba(20,20,20,0.82)",
    padding: 15,
    marginBottom: 18,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  filterLabel: {
    color: colors.softGray,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  list: {
    paddingTop: 4,
    paddingBottom: 8,
    gap: 16,
  },
  exploreCard: {
    width: "100%",
    marginRight: 0,
  },
});
