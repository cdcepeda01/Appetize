import { FlatList, StyleSheet } from "react-native";
import { CultureCard } from "@/components/CultureCard";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { useFavorites } from "@/hooks/useFavorites";
import { useSaved } from "@/hooks/useSaved";

export default function FavoritesScreen() {
  const favorites = useFavorites();
  const saved = useSaved();

  return (
    <Screen>
      <SectionHeader
        eyebrow="Favoritos"
        title="Cosas que realmente te gustaron"
        description="Una lista mezclada de cine, libros, musica y arte que ya gano un lugar propio."
      />
      {favorites.items.length ? (
        <FlatList
          data={favorites.items}
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
          icon="heart-outline"
          title="Aún no hay favoritos"
          description="Marca con corazón las piezas que de verdad se queden contigo."
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
