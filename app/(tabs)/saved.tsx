import { FlatList, StyleSheet } from "react-native";
import { CultureCard } from "@/components/CultureCard";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { useFavorites } from "@/hooks/useFavorites";
import { useSaved } from "@/hooks/useSaved";

export default function SavedScreen() {
  const favorites = useFavorites();
  const saved = useSaved();

  return (
    <Screen>
      <SectionHeader
        eyebrow="Guardado"
        title="To save for later"
        description="Cosas que quieres ver, leer, escuchar o revisar cuando haya espacio."
      />
      {saved.items.length ? (
        <FlatList
          data={saved.items}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CultureCard
              item={item}
              style={styles.card}
              onToggleFavorite={favorites.toggleItem}
              onToggleSaved={saved.toggleItem}
              isFavorite={favorites.hasItem(item.id)}
              isSaved={saved.hasItem(item.id)}
            />
          )}
        />
      ) : (
        <EmptyState
          icon="bookmark-outline"
          title="Nada guardado todavía"
          description="Guarda piezas para volver a ellas sin perder el hilo."
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: 14,
  },
});
