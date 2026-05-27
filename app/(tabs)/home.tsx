import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { RecommendationSection } from "@/components/RecommendationSection";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { useAuth } from "@/hooks/useAuth";
import { useCuratedContent } from "@/hooks/useCuratedContent";
import { useFavorites } from "@/hooks/useFavorites";
import { useSaved } from "@/hooks/useSaved";

export default function HomeScreen() {
  const { user } = useAuth();
  const { content } = useCuratedContent();
  const favorites = useFavorites();
  const saved = useSaved();
  const featuredItems = [content.movies[0], content.books[0], content.music[0], content.art[0]].filter(Boolean);
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Invitado";

  return (
    <Screen>
      <View style={styles.issueBar}>
        <View>
          <Text style={styles.issueLabel}>Appetize</Text>
          <Text style={styles.issueDate}>Daily cultural digest</Text>
        </View>
        <View style={styles.issueMark}>
          <Image source={require("../../assets/appetize_logo.png")} style={styles.issueLogo} />
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.welcome}>Bienvenido, {displayName}</Text>
        <Text style={styles.note}>
          Cine, libros, música y arte seleccionados como una revista privada para tu gusto.
        </Text>
      </View>

      <FeaturedCarousel
        items={featuredItems}
        onToggleFavorite={favorites.toggleItem}
        onToggleSaved={saved.toggleItem}
        isFavorite={favorites.hasItem}
        isSaved={saved.hasItem}
      />

      <View style={styles.archiveCallout}>
        <View style={styles.calloutIcon}>
          <Ionicons name="library-outline" size={20} color={colors.activeGold} />
        </View>
        <View style={styles.calloutBody}>
          <Text style={styles.calloutKicker}>Tu archivo cultural personal</Text>
          <Text style={styles.calloutText}>
            Guarda lo que quieres revisar después y marca como favorito lo que de verdad se queda contigo.
          </Text>
        </View>
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
        title="Libros para leer con café"
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
  issueBar: {
    minHeight: 58,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  issueLabel: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 21,
  },
  issueDate: {
    color: colors.tertiary,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    marginTop: 2,
  },
  issueMark: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.hairline,
    overflow: "hidden",
  },
  issueLogo: {
    width: 44,
    height: 44,
  },
  header: {
    marginBottom: 18,
  },
  welcome: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 28,
    lineHeight: 34,
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
    fontSize: 38,
    lineHeight: 43,
    marginTop: 8,
  },
  note: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  archiveCallout: {
    marginTop: 18,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    padding: 18,
    gap: 14,
    flexDirection: "row",
  },
  calloutIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  calloutBody: {
    flex: 1,
    gap: 6,
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
