import { FlatList, StyleSheet, Text, View } from "react-native";
import { CultureCard } from "@/components/CultureCard";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { useFavorites } from "@/hooks/useFavorites";
import { useSaved } from "@/hooks/useSaved";
import { CultureItem, CultureType } from "@/types/culture";

const savedSections: Array<{
  type: CultureType;
  eyebrow: string;
  title: string;
  empty: string;
}> = [
  {
    type: "movie",
    eyebrow: "Para ver",
    title: "Películas guardadas",
    empty: "Aún no has guardado películas.",
  },
  {
    type: "book",
    eyebrow: "Para leer",
    title: "Libros guardados",
    empty: "Aún no has guardado libros.",
  },
  {
    type: "music",
    eyebrow: "Para escuchar",
    title: "álbumes guardados",
    empty: "Aún no has guardado álbumes.",
  },
  {
    type: "art",
    eyebrow: "Para contemplar",
    title: "Obras de arte guardadas",
    empty: "Aún no has guardado obras de arte.",
  },
];

export default function SavedScreen() {
  const favorites = useFavorites();
  const saved = useSaved();

  const grouped = savedSections.map((section) => ({
    ...section,
    items: saved.items.filter((item) => item.type === section.type),
  }));

  return (
    <Screen>
      <SectionHeader
        eyebrow="Guardado"
        title="Tu archivo para después"
        description="Películas, libros, álbumes y obras separados para volver a cada cosa sin perder el orden."
      />

      {saved.items.length ? (
        <View style={styles.sections}>
          {grouped.map((section) => (
            <SavedCategorySection
              key={section.type}
              eyebrow={section.eyebrow}
              title={section.title}
              empty={section.empty}
              items={section.items}
              onToggleFavorite={favorites.toggleItem}
              onToggleSaved={saved.toggleItem}
              isFavorite={favorites.hasItem}
              isSaved={saved.hasItem}
            />
          ))}
        </View>
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

type SavedCategorySectionProps = {
  eyebrow: string;
  title: string;
  empty: string;
  items: CultureItem[];
  onToggleFavorite: (item: CultureItem) => void;
  onToggleSaved: (item: CultureItem) => void;
  isFavorite: (itemId: string) => boolean;
  isSaved: (itemId: string) => boolean;
};

function SavedCategorySection({
  eyebrow,
  title,
  empty,
  items,
  onToggleFavorite,
  onToggleSaved,
  isFavorite,
  isSaved,
}: SavedCategorySectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{items.length}</Text>
        </View>
      </View>

      {items.length ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CultureCard
              item={item}
              style={styles.card}
              onToggleFavorite={onToggleFavorite}
              onToggleSaved={onToggleSaved}
              isFavorite={isFavorite(item.id)}
              isSaved={isSaved(item.id)}
            />
          )}
        />
      ) : (
        <View style={styles.inlineEmpty}>
          <Text style={styles.inlineEmptyText}>{empty}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sections: {
    gap: 18,
  },
  section: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: "rgba(20,20,20,0.72)",
    padding: 14,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  eyebrow: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  sectionTitle: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 22,
    lineHeight: 28,
    marginTop: 2,
  },
  countBadge: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparentGold,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  countText: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
  },
  card: {
    marginRight: 14,
  },
  inlineEmpty: {
    minHeight: 84,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  inlineEmptyText: {
    color: colors.tertiary,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    textAlign: "center",
  },
});
