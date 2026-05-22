import { StyleSheet, Text, View } from "react-native";
import { FeaturedCard } from "@/components/FeaturedCard";
import { RecommendationSection } from "@/components/RecommendationSection";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { useCuratedContent } from "@/hooks/useCuratedContent";
import { useFavorites } from "@/hooks/useFavorites";
import { useSaved } from "@/hooks/useSaved";

export default function HomeScreen() {
  const { content } = useCuratedContent();
  const favorites = useFavorites();
  const saved = useSaved();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.kicker}>Appetize Journal</Text>
        <Text style={styles.title}>Una curaduría diaria para alimentar el gusto.</Text>
        <Text style={styles.note}>
          Cine, libros, música y arte con una mirada sobria, editorial y personal.
        </Text>
      </View>

      {content.featured ? (
        <FeaturedCard
          item={content.featured}
          onToggleFavorite={favorites.toggleItem}
          onToggleSaved={saved.toggleItem}
          isFavorite={favorites.hasItem(content.featured.id)}
          isSaved={saved.hasItem(content.featured.id)}
        />
      ) : null}

      <View style={styles.archiveCallout}>
        <Text style={styles.calloutKicker}>Tu archivo cultural personal</Text>
        <Text style={styles.calloutText}>
          Guarda lo que quieres revisar después y marca como favorito lo que de verdad se queda contigo.
        </Text>
      </View>

      <RecommendationSection
        eyebrow="Selección destacada"
        title="Cine para quedarse pensando"
        items={content.movies}
        onToggleFavorite={favorites.toggleItem}
        onToggleSaved={saved.toggleItem}
        isFavorite={favorites.hasItem}
        isSaved={saved.hasItem}
      />
      <RecommendationSection
        eyebrow="Un libro para perderse"
        title="Libros para leer con cafe"
        items={content.books}
        onToggleFavorite={favorites.toggleItem}
        onToggleSaved={saved.toggleItem}
        isFavorite={favorites.hasItem}
        isSaved={saved.hasItem}
      />
      <RecommendationSection
        eyebrow="Un álbum para sentir"
        title="Álbumes para desaparecer un rato"
        items={content.music}
        onToggleFavorite={favorites.toggleItem}
        onToggleSaved={saved.toggleItem}
        isFavorite={favorites.hasItem}
        isSaved={saved.hasItem}
      />
      <RecommendationSection
        eyebrow="Una obra para contemplar"
        title="Obras para mirar en silencio"
        items={content.art}
        onToggleFavorite={favorites.toggleItem}
        onToggleSaved={saved.toggleItem}
        isFavorite={favorites.hasItem}
        isSaved={saved.hasItem}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 22,
  },
  kicker: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
    marginTop: 8,
  },
  title: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 37,
    lineHeight: 43,
    marginTop: 8,
  },
  note: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 20,
  },
  archiveCallout: {
    marginTop: 18,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    padding: 18,
    gap: 7,
  },
  calloutKicker: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    textTransform: "uppercase",
  },
  calloutText: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
  },
});
