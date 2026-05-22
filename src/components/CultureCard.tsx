import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { CultureItem } from "@/types/culture";
import { categoryLabels, categoryMicrocopy } from "@/utils/categoryLabels";

const placeholderImage =
  "https://images.unsplash.com/photo-1518826778770-a729fb53327c?auto=format&fit=crop&w=900&q=80";

type CultureCardProps = {
  item: CultureItem;
  onToggleFavorite?: (item: CultureItem) => void;
  onToggleSaved?: (item: CultureItem) => void;
  isFavorite?: boolean;
  isSaved?: boolean;
  style?: ViewStyle;
};

export function CultureCard({
  item,
  onToggleFavorite,
  onToggleSaved,
  isFavorite,
  isSaved,
  style,
}: CultureCardProps) {
  return (
    <Pressable style={({ pressed }) => [styles.card, style, pressed && styles.pressed]}>
      <ImageBackground source={{ uri: item.imageUrl || placeholderImage }} style={styles.image} imageStyle={styles.imageRadius}>
        <View style={styles.overlay} />
        <View style={styles.topRow}>
          <Text style={styles.category}>{categoryLabels[item.type]}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.iconButton} onPress={() => onToggleSaved?.(item)}>
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              color={isSaved ? colors.activeGold : colors.bone}
              size={18}
            />
          </Pressable>
          <Pressable style={styles.iconButton} onPress={() => onToggleFavorite?.(item)}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              color={isFavorite ? colors.activeGold : colors.bone}
              size={19}
            />
          </Pressable>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        <Text style={styles.micro}>{categoryMicrocopy[item.type]}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        {item.subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>
        ) : null}
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 238,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.hairline,
    marginRight: 14,
  },
  image: {
    height: 244,
    width: "100%",
    backgroundColor: colors.editorial,
    justifyContent: "space-between",
    padding: 12,
  },
  imageRadius: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.22)",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  body: {
    padding: 15,
    gap: 6,
  },
  category: {
    color: colors.bone,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
    backgroundColor: "rgba(8,8,8,0.68)",
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 5,
    overflow: "hidden",
  },
  year: {
    color: colors.softGray,
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    backgroundColor: "rgba(8,8,8,0.55)",
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
    overflow: "hidden",
  },
  micro: {
    color: colors.mutedGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  title: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 20,
    lineHeight: 25,
  },
  subtitle: {
    color: colors.softGray,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
  },
  description: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    alignSelf: "flex-end",
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(8,8,8,0.74)",
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  pressed: {
    opacity: 0.86,
  },
});
