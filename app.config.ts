import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Appetize",
  slug: "appetize",
  scheme: "appetize",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "dark",
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#0B0B0B",
    },
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
  },
});
