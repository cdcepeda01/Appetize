import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { FeaturedCard } from "@/components/FeaturedCard";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { CultureItem } from "@/types/culture";

type FeaturedCarouselProps = {
  items: CultureItem[];
  onToggleFavorite?: (item: CultureItem) => void;
  onToggleSaved?: (item: CultureItem) => void;
  isFavorite?: (itemId: string) => boolean;
  isSaved?: (itemId: string) => boolean;
};

export function FeaturedCarousel({
  items,
  onToggleFavorite,
  onToggleSaved,
  isFavorite,
  isSaved,
}: FeaturedCarouselProps) {
  const listRef = useRef<FlatList<CultureItem>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(Math.max(width - 40, 280), 430);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % items.length;
        listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [items.length]);

  function goToIndex(index: number) {
    setActiveIndex(index);
    listRef.current?.scrollToIndex({ index, animated: true });
  }

  function handleMomentumEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), items.length - 1));
  }

  if (!items.length) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Curaduría de hoy</Text>
          <Text style={styles.title}>Cuatro sabores para empezar</Text>
        </View>
      </View>

      <View style={[styles.carouselFrame, { width: cardWidth }]}>
        <FlatList
          ref={listRef}
          data={items}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth}
          decelerationRate="fast"
          onMomentumScrollEnd={handleMomentumEnd}
          getItemLayout={(_, index) => ({
            length: cardWidth,
            offset: cardWidth * index,
            index,
          })}
          onScrollToIndexFailed={({ index }) => {
            requestAnimationFrame(() => listRef.current?.scrollToIndex({ index, animated: true }));
          }}
          renderItem={({ item, index }) => (
            <FeaturedCard
              item={item}
              issueNumber={String(index + 1).padStart(2, "0")}
              style={{ width: cardWidth }}
              onToggleFavorite={onToggleFavorite}
              onToggleSaved={onToggleSaved}
              isFavorite={isFavorite?.(item.id)}
              isSaved={isSaved?.(item.id)}
            />
          )}
        />

        <View style={styles.dotsPill}>
          {items.map((item, index) => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={`Ver recomendación ${index + 1}`}
              onPress={() => goToIndex(index)}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
  },
  eyebrow: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  title: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 22,
    lineHeight: 28,
    marginTop: 2,
  },
  carouselFrame: {
    position: "relative",
    alignSelf: "center",
    paddingBottom: 26,
  },
  dotsPill: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    minHeight: 28,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: "rgba(8,8,8,0.78)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(245,242,234,0.35)",
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.activeGold,
  },
});
