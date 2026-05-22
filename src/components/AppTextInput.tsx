import { TextInput, TextInputProps, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";

type AppTextInputProps = TextInputProps & {
  label: string;
};

export function AppTextInput({ label, ...props }: AppTextInputProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.softGray}
        autoCapitalize="none"
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    color: colors.mutedGold,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0,
  },
  input: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairline,
    color: colors.bone,
    fontFamily: fonts.body,
    fontSize: 15,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
  },
});
