import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";

type StatCardProps = {
  value: string | number;
  label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 86,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  value: {
    color: colors.activeGold,
    fontFamily: fonts.title,
    fontSize: 28,
  },
  label: {
    color: colors.softGray,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
  },
});
