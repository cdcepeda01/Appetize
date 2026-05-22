import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";

type AppButtonProps = {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "primary" | "ghost" | "subtle";
  style?: ViewStyle;
  disabled?: boolean;
};

export function AppButton({ label, onPress, icon, variant = "primary", style, disabled }: AppButtonProps) {
  const isGhost = variant === "ghost";
  const isSubtle = variant === "subtle";

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isGhost && styles.ghost,
        isSubtle && styles.subtle,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={isGhost || isSubtle ? colors.bone : colors.black} /> : null}
      <Text style={[styles.label, (isGhost || isSubtle) && styles.ghostLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: radius.md,
    backgroundColor: colors.mutedGold,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 18,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  subtle: {
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  label: {
    color: colors.black,
    fontFamily: fonts.bodyBold,
    fontSize: 15,
  },
  ghostLabel: {
    color: colors.bone,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.82,
  },
});
