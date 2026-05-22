import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { AppTextInput } from "@/components/AppTextInput";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/spacing";
import { fonts } from "@/constants/typography";
import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      await signIn(email, password);
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("No pudimos iniciar sesion", error instanceof Error ? error.message : "Revisa tus datos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.brand}>
        <View style={styles.goldLine} />
        <Text style={styles.title}>Appetize</Text>
        <Text style={styles.subtitle}>Feed your cultural appetite.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Entrar al archivo</Text>
        <Text style={styles.formCopy}>Una sesión demo local para guardar tu curaduría cultural.</Text>
        <AppTextInput label="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="tu@email.com" />
        <AppTextInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" />
        <AppButton
          label={loading ? "Entrando..." : "Entrar en modo demo"}
          onPress={handleSubmit}
          disabled={loading}
        />
        <Link href="/register" style={styles.link}>
          Crear una cuenta nueva
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 30,
  },
  brand: {
    gap: 10,
  },
  goldLine: {
    width: 42,
    height: 2,
    backgroundColor: colors.mutedGold,
  },
  title: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 56,
  },
  subtitle: {
    color: colors.softGray,
    fontFamily: fonts.bodyMedium,
    fontSize: 17,
  },
  form: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.card,
    padding: 20,
    gap: 16,
  },
  formTitle: {
    color: colors.bone,
    fontFamily: fonts.title,
    fontSize: 24,
  },
  formCopy: {
    color: colors.softGray,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 4,
  },
  link: {
    color: colors.mutedGold,
    fontFamily: fonts.bodyMedium,
    textAlign: "center",
    marginTop: 6,
  },
});
