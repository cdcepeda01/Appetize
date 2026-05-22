import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { CultureItem } from "@/types/culture";
import { categoryLabels } from "@/utils/categoryLabels";

const placeholderImage =
  "https://images.unsplash.com/photo-1518826778770-a729fb53327c?auto=format&fit=crop&w=1200&q=80";

type FeaturedCardProps = {
  item: CultureItem;
  onToggleFavorite?: (item: CultureItem) => void;
  onToggleSaved?: (item: CultureItem) => void;
  isFavorite?: boolean;
  isSaved?: boolean;
};

export function FeaturedCard({
  item,
  onToggleFavorite,
  onToggleSaved,
  isFavorite,
  isSaved,
}: FeaturedCardProps) {
  return (
    <ImageBackground source={{ uri: item.imageUrl || placeholderImage }} style={styles.wrap} imageStyle={styles.image}>
      <View style={styles.overlay} />
      <View style={styles.bottomShade} />
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.eyebrow}>Curaduría de hoy</Text>
          <Text style={styles.category}>{categoryLabels[item.type]}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
        <View style={styles.actions}>
          <Pressable style={styles.action} onPress={() => onToggleSaved?.(item)}>
            <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={18} color={colors.black} />
            <Text style={styles.actionText}>{isSaved ? "Guardado" : "Guardar"}</Text>
          </Pressable>
          <Pressable style={[styles.action, styles.secondary]} onPress={() => onToggleFavorite?.(item)}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={18} color={colors.bone} />
            <Text style={[styles.actionText, styles.secondaryText]}>
              {isFavorite ? "Favorito" : "Favorito"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 490,
    borderRadius: radius.lg,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: colors.charcoal,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  image: {
    borderRadius: radius.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  bottomShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.deepOverlay,
    top: 230,
  },
  content: {
    padding: 22,
    gap: 9,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  eyebrow: {
    color: colors.black,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
    backgroundColor: colors.activeGold,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: "hidden",
  },
  category: {
    color: colors.bone,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: "hidden",
  },
  title: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 39,
    lineHeight: 44,
  },
  subtitle: {
    color: colors.activeGold,
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
  },
  description: {
    color: colors.bone,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 8,
  },
  action: {
    minHeight: 44,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 14,
    backgroundColor: colors.activeGold,
  },
  secondary: {
    backgroundColor: "rgba(11, 11, 11, 0.72)",
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  actionText: {
    color: colors.black,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
  },
  secondaryText: {
    color: colors.bone,
  },
});
