import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { curatedItems } from "@/data/curatedContent";
import { getCoverSource } from "@/data/coverRegistry";
import { useConsumptionStatus } from "@/hooks/useConsumptionStatus";
import { useFavorites } from "@/hooks/useFavorites";
import { useSaved } from "@/hooks/useSaved";
import { buildDetailCopy, getDetailProfile } from "@/utils/detailCopy";
import { categoryLabels } from "@/utils/categoryLabels";
import { getConsumptionStatusOptions } from "@/utils/consumptionStatus";

const placeholderImage =
  "https://images.unsplash.com/photo-1518826778770-a729fb53327c?auto=format&fit=crop&w=1200&q=80";

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const favorites = useFavorites();
  const saved = useSaved();
  const consumption = useConsumptionStatus();
  const item = curatedItems.find((currentItem) => currentItem.id === id);

  if (!item) {
    return (
      <Screen>
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={colors.bone} />
          </Pressable>
        </View>
        <EmptyState
          icon="alert-circle-outline"
          title="No encontramos esta pieza"
          description="Puede que la recomendación haya cambiado o que el enlace ya no exista."
        />
      </Screen>
    );
  }

  const detailParagraphs = buildDetailCopy(item);
  const detailProfile = getDetailProfile(item);
  const currentStatus = consumption.getStatus(item.id);
  const statusOptions = getConsumptionStatusOptions(item.type);

  return (
    <Screen>
      <View style={styles.topBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.bone} />
        </Pressable>
        <Text style={styles.topLabel}>Detalle cultural</Text>
      </View>

      <ImageBackground source={getCoverSource(item, placeholderImage)} style={styles.hero} imageStyle={styles.heroImage}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroBottom}>
          <View style={styles.metaRow}>
            <Text style={styles.category}>{categoryLabels[item.type]}</Text>
            {item.year ? <Text style={styles.year}>{item.year}</Text> : null}
          </View>
          <Text style={styles.title}>{item.title}</Text>
          {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
        </View>
      </ImageBackground>

      <View style={styles.actions}>
        <AppButton
          label={saved.hasItem(item.id) ? "Guardado" : "Guardar"}
          icon={saved.hasItem(item.id) ? "bookmark" : "bookmark-outline"}
          onPress={() => saved.toggleItem(item)}
        />
        <AppButton
          label={favorites.hasItem(item.id) ? "Favorito" : "Favorito"}
          icon={favorites.hasItem(item.id) ? "heart" : "heart-outline"}
          variant="subtle"
          onPress={() => favorites.toggleItem(item)}
        />
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View>
            <Text style={styles.sectionKicker}>Estado de consumo</Text>
            <Text style={styles.statusHelp}>Marca en qué punto estás con esta pieza.</Text>
          </View>
          {currentStatus ? (
            <Pressable style={styles.clearStatusButton} onPress={() => consumption.clearStatus(item.id)}>
              <Text style={styles.clearStatusText}>Limpiar</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={styles.statusOptions}>
          {statusOptions.map((option) => {
            const selected = currentStatus === option.status;

            return (
              <Pressable
                key={option.status}
                onPress={() => consumption.setStatus(item, option.status)}
                style={[styles.statusOption, selected && styles.statusOptionSelected]}
              >
                <Ionicons
                  name={option.icon}
                  size={19}
                  color={selected ? colors.black : colors.activeGold}
                />
                <Text style={[styles.statusLabel, selected && styles.statusLabelSelected]}>{option.label}</Text>
                <Text style={[styles.statusDescription, selected && styles.statusDescriptionSelected]}>
                  {option.description}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.infoGrid}>
        <InfoPill label={detailProfile.creatorLabel} value={item.subtitle ?? "No especificado"} />
        <InfoPill label={detailProfile.yearLabel} value={item.year ?? "Sin fecha"} />
      </View>

      <View style={styles.infoGrid}>
        <InfoPill label={detailProfile.experienceLabel} value={detailProfile.experienceValue} />
        <InfoPill label={detailProfile.contextLabel} value={detailProfile.contextValue} />
      </View>

      <View style={styles.whyCard}>
        <Text style={styles.sectionKicker}>{detailProfile.whyTitle}</Text>
        <Text style={styles.paragraph}>{detailProfile.whyBody}</Text>
      </View>

      <View style={styles.guideCard}>
        <Text style={styles.sectionKicker}>Guía de experiencia</Text>
        {detailProfile.guide.map((item) => (
          <View key={item.label} style={styles.guideRow}>
            <Text style={styles.guideLabel}>{item.label}</Text>
            <Text style={styles.guideValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoGrid}>
        <InfoPill label="Fuente" value={item.source} />
        <InfoPill label="Archivo" value={categoryLabels[item.type]} />
      </View>

      <View style={styles.tagsWrap}>
        {item.tags?.map((tag) => (
          <Text key={tag} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.sectionKicker}>Notas de curaduría</Text>
        {detailParagraphs.map((paragraph) => (
          <Text key={paragraph} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </View>
    </Screen>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoPill}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  topLabel: {
    color: colors.tertiary,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  hero: {
    minHeight: 520,
    borderRadius: radius.lg,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  heroImage: {
    borderRadius: radius.lg,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.34)",
  },
  heroBottom: {
    padding: 22,
    gap: 8,
    backgroundColor: "rgba(8,8,8,0.72)",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  category: {
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
  year: {
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
    fontSize: 38,
    lineHeight: 43,
  },
  subtitle: {
    color: colors.activeGold,
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  statusCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: "rgba(20,20,20,0.82)",
    padding: 16,
    gap: 14,
    marginTop: 16,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statusHelp: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  clearStatusButton: {
    height: 32,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  clearStatusText: {
    color: colors.softGray,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  statusOptions: {
    flexDirection: "row",
    gap: 8,
  },
  statusOption: {
    flex: 1,
    minHeight: 108,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 5,
  },
  statusOptionSelected: {
    backgroundColor: colors.activeGold,
    borderColor: colors.activeGold,
  },
  statusLabel: {
    color: colors.bone,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    textAlign: "center",
  },
  statusLabelSelected: {
    color: colors.black,
  },
  statusDescription: {
    color: colors.tertiary,
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center",
  },
  statusDescriptionSelected: {
    color: "rgba(8,8,8,0.72)",
  },
  infoGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  infoPill: {
    flex: 1,
    minHeight: 76,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    padding: 12,
    gap: 5,
  },
  infoLabel: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  infoValue: {
    color: colors.bone,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    lineHeight: 18,
  },
  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  tag: {
    color: colors.softGray,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 7,
    overflow: "hidden",
  },
  descriptionCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    padding: 18,
    gap: 12,
    marginTop: 18,
  },
  whyCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    padding: 18,
    gap: 10,
    marginTop: 18,
  },
  guideCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: "rgba(20,20,20,0.78)",
    padding: 18,
    gap: 12,
    marginTop: 18,
  },
  guideRow: {
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    paddingTop: 12,
    gap: 4,
  },
  guideLabel: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  guideValue: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
  },
  sectionKicker: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    textTransform: "uppercase",
  },
  paragraph: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 23,
  },
});
