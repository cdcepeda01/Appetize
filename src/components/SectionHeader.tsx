import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/typography";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <View style={styles.wrap}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 7,
    marginBottom: 16,
  },
  eyebrow: {
    color: colors.mutedGold,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0,
  },
  title: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 26,
    lineHeight: 32,
  },
  description: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
  },
});
