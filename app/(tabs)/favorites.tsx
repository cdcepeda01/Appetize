import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { useCuratedContent } from "@/hooks/useCuratedContent";
import { useSaved } from "@/hooks/useSaved";
import { CultureItem } from "@/types/culture";
import { categoryLabels } from "@/utils/categoryLabels";

const notificationCopy = [
  {
    label: "Curaduría de hoy",
    time: "09:00",
    message: "Una pieza principal para empezar el día con una mirada más lenta.",
  },
  {
    label: "Para la tarde",
    time: "15:30",
    message: "Una recomendación breve para guardar antes de que se pierda entre pendientes.",
  },
  {
    label: "Noche cultural",
    time: "20:45",
    message: "Algo para ver, escuchar o leer cuando baja el ruido del día.",
  },
  {
    label: "Archivo personal",
    time: "Domingo",
    message: "Un recordatorio para volver a lo que guardaste y decidir que merece quedarse.",
  },
];

export default function NotificationsScreen() {
  const { items } = useCuratedContent();
  const saved = useSaved();
  const highlights = [items[0], items[4], items[24], items[44]].filter(Boolean);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Notificaciones"
        title="Recomendaciones para tu día"
        description="Avisos editoriales para descubrir una película, un libro, un álbum o una obra en el momento correcto."
      />

      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="notifications-outline" size={28} color={colors.activeGold} />
        </View>
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>Tu pulso cultural díario</Text>
          <Text style={styles.heroCopy}>
            Appetize puede sugerirte una pieza por la mañana, otra para la tarde y una selección más lenta para la noche.
          </Text>
        </View>
      </View>

      <View style={styles.timeline}>
        {highlights.map((item, index) => (
          <View key={item.id} style={styles.timelineRow}>
            <View style={styles.timelineRail}>
              <View style={styles.timelineDot} />
              {index < highlights.length - 1 ? <View style={styles.timelineLine} /> : null}
            </View>
            <NotificationCard
              item={item}
              label={notificationCopy[index].label}
              time={notificationCopy[index].time}
              message={notificationCopy[index].message}
              isSaved={saved.hasItem(item.id)}
              onSave={() => saved.toggleItem(item)}
            />
          </View>
        ))}
      </View>
    </Screen>
  );
}

type NotificationCardProps = {
  item: CultureItem;
  label: string;
  time: string;
  message: string;
  isSaved: boolean;
  onSave: () => void;
};

function NotificationCard({ item, label, time, message, isSaved, onSave }: NotificationCardProps) {
  function openDetail() {
    router.push(`/item/${item.id}` as never);
  }

  function handleSave(event?: { stopPropagation?: () => void }) {
    event?.stopPropagation?.();
    onSave();
  }

  return (
    <Pressable onPress={openDetail} style={({ pressed }) => [styles.notification, pressed && styles.pressed]}>
      <View style={styles.notificationTop}>
        <View style={styles.badge}>
          <Ionicons name="sparkles-outline" size={15} color={colors.activeGold} />
          <Text style={styles.badgeText}>{label}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>

      <Text style={styles.itemType}>{categoryLabels[item.type]}</Text>
      <Text style={styles.itemTitle}>{item.title}</Text>
      {item.subtitle ? <Text style={styles.itemSubtitle}>{item.subtitle}</Text> : null}
      <Text style={styles.message}>{message}</Text>

      <View style={styles.footer}>
        <Text style={styles.source}>{item.source}</Text>
        <AppButton
          label={isSaved ? "Guardado" : "Guardar"}
          icon={isSaved ? "bookmark" : "bookmark-outline"}
          variant="subtle"
          onPress={handleSave}
          style={styles.saveButton}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    padding: 18,
    flexDirection: "row",
    gap: 14,
    marginBottom: 20,
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparentGold,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  heroText: {
    flex: 1,
    gap: 6,
  },
  heroTitle: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 20,
    lineHeight: 25,
  },
  heroCopy: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
  },
  timeline: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: "row",
    gap: 12,
  },
  timelineRail: {
    width: 20,
    alignItems: "center",
  },
  timelineDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.activeGold,
    marginTop: 24,
    borderWidth: 2,
    borderColor: colors.black,
  },
  timelineLine: {
    flex: 1,
    width: 1,
    minHeight: 156,
    backgroundColor: "rgba(185,160,106,0.22)",
  },
  notification: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    padding: 17,
    gap: 8,
    marginBottom: 14,
  },
  notificationTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  badgeText: {
    color: colors.bone,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
  },
  time: {
    color: colors.tertiary,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
  },
  itemType: {
    color: colors.activeGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
    marginTop: 4,
  },
  itemTitle: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 23,
    lineHeight: 29,
  },
  itemSubtitle: {
    color: colors.softGray,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
  },
  message: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 6,
  },
  source: {
    flex: 1,
    color: colors.tertiary,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
  },
  saveButton: {
    minHeight: 40,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.86,
  },
});
