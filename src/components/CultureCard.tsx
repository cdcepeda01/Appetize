import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef } from "react";
import { Animated, ImageBackground, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { shadows } from "@/constants/shadows";
import { fonts } from "@/constants/typography";
import { getCoverSource } from "@/data/coverRegistry";
import { useConsumptionStatus } from "@/hooks/useConsumptionStatus";
import { CultureItem } from "@/types/culture";
import { categoryLabels, categoryMicrocopy } from "@/utils/categoryLabels";
import { getConsumptionStatusLabel } from "@/utils/consumptionStatus";

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
  const consumption = useConsumptionStatus();
  const status = consumption.getStatus(item.id);
  const scale = useRef(new Animated.Value(1)).current;

  function animatePress(toValue: number) {
    Animated.spring(scale, {
      toValue,
      speed: 28,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  }

  function openDetail() {
    router.push(`/item/${item.id}` as never);
  }

  function handleToggleSaved(event?: { stopPropagation?: () => void }) {
    event?.stopPropagation?.();
    onToggleSaved?.(item);
  }

  function handleToggleFavorite(event?: { stopPropagation?: () => void }) {
    event?.stopPropagation?.();
    onToggleFavorite?.(item);
  }

  return (
    <Animated.View style={[styles.card, style, { transform: [{ scale }] }]}>
      <Pressable onPress={openDetail} onPressIn={() => animatePress(0.98)} onPressOut={() => animatePress(1)}>
        <ImageBackground source={getCoverSource(item, placeholderImage)} style={styles.image} imageStyle={styles.imageRadius}>
          <View style={styles.overlay} />
          <View style={styles.topRow}>
            <Text style={styles.category}>{categoryLabels[item.type]}</Text>
            <Text style={styles.year}>{item.year}</Text>
          </View>
          <View style={styles.actions}>
            <Pressable style={styles.iconButton} onPress={handleToggleSaved}>
              <Ionicons
                name={isSaved ? "bookmark" : "bookmark-outline"}
                color={isSaved ? colors.activeGold : colors.bone}
                size={18}
              />
            </Pressable>
            <Pressable style={styles.iconButton} onPress={handleToggleFavorite}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                color={isFavorite ? colors.activeGold : colors.bone}
                size={19}
              />
            </Pressable>
          </View>
        </ImageBackground>
        <View style={styles.body}>
          <View style={styles.accentRule} />
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
          <View style={styles.tagRow}>
            {status ? (
              <Text style={[styles.tag, styles.statusTag]}>
                {getConsumptionStatusLabel(item.type, status)}
              </Text>
            ) : null}
            {item.tags?.slice(0, 2).map((tag) => (
              <Text key={tag} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </Pressable>
    </Animated.View>
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
    ...shadows.soft,
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
    position: "relative",
  },
  accentRule: {
    position: "absolute",
    left: 0,
    top: 15,
    bottom: 15,
    width: 2,
    backgroundColor: colors.mutedGold,
    opacity: 0.55,
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
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingTop: 4,
  },
  tag: {
    color: colors.tertiary,
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden",
  },
  statusTag: {
    color: colors.black,
    backgroundColor: colors.activeGold,
    borderColor: colors.activeGold,
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
});
