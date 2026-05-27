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
    package: "com.cdcepeda01.appetize",
    adaptiveIcon: {
      backgroundColor: "#0B0B0B",
    },
  },
  plugins: ["expo-router"],
  extra: {
    eas: {
      projectId: "b44bc898-42e5-4b26-afe2-ea9358b70171",
    },
  },
  experiments: {
    typedRoutes: true,
  },
});
