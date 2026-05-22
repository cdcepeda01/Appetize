import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";

type CategoryChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function CategoryChip({ label, selected, onPress }: CategoryChipProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}>
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: colors.charcoal,
  },
  selected: {
    borderColor: colors.mutedGold,
    backgroundColor: colors.transparentGold,
  },
  pressed: {
    opacity: 0.78,
  },
  label: {
    color: colors.softGray,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
  },
  selectedLabel: {
    color: colors.bone,
  },
});
