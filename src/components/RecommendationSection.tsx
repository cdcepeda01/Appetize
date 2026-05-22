import { FlatList, StyleSheet, View } from "react-native";
import { CultureCard } from "@/components/CultureCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CultureItem } from "@/types/culture";

type RecommendationSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: CultureItem[];
  onToggleFavorite?: (item: CultureItem) => void;
  onToggleSaved?: (item: CultureItem) => void;
  isFavorite?: (itemId: string) => boolean;
  isSaved?: (itemId: string) => boolean;
};

export function RecommendationSection({
  eyebrow,
  title,
  description,
  items,
  onToggleFavorite,
  onToggleSaved,
  isFavorite,
  isSaved,
}: RecommendationSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CultureCard
            item={item}
            onToggleFavorite={onToggleFavorite}
            onToggleSaved={onToggleSaved}
            isFavorite={isFavorite?.(item.id)}
            isSaved={isSaved?.(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 30,
  },
});
