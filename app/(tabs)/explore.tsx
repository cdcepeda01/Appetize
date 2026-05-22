import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CategoryChip } from "@/components/CategoryChip";
import { CultureCard } from "@/components/CultureCard";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/typography";
import { moods } from "@/data/curatedContent";
import { useCuratedContent } from "@/hooks/useCuratedContent";
import { useFavorites } from "@/hooks/useFavorites";
import { useSaved } from "@/hooks/useSaved";
import { CultureType } from "@/types/culture";

const categories: Array<{ label: string; value: CultureType | "all" }> = [
  { label: "Todo", value: "all" },
  { label: "Cine", value: "movie" },
  { label: "Libros", value: "book" },
  { label: "Musica", value: "music" },
  { label: "Arte", value: "art" },
];

export default function ExploreScreen() {
  const { items: allItems } = useCuratedContent();
  const favorites = useFavorites();
  const saved = useSaved();
  const [category, setCategory] = useState<CultureType | "all">("all");
  const [mood, setMood] = useState<string>("Nocturno");

  const items = useMemo(() => {
    return allItems.filter((item) => {
      const categoryMatch = category === "all" || item.type === category;
      const moodMatch = !mood || item.tags?.includes(mood);
      return categoryMatch && moodMatch;
    });
  }, [allItems, category, mood]);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Explorar"
        title="Cultura para caminar solo"
        description="Filtra por categoría o estado de ánimo y arma tu propio archivo cultural."
      />

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
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  filterLabel: {
    color: colors.softGray,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  list: {
    paddingTop: 10,
    paddingBottom: 8,
    gap: 16,
  },
  exploreCard: {
    width: "100%",
    marginRight: 0,
  },
});
