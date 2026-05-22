import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";

type ProfileChipProps = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function ProfileChip({ label, icon = "sparkles-outline" }: ProfileChipProps) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon} size={14} color={colors.activeGold} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    paddingHorizontal: 13,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  label: {
    color: colors.bone,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
  },
});
