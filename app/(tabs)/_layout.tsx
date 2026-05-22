import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/typography";

const tabs = {
  home: ["Inicio", "home-outline", "home"] as const,
  explore: ["Explorar", "compass-outline", "compass"] as const,
  favorites: ["Favoritos", "heart-outline", "heart"] as const,
  saved: ["Guardado", "bookmark-outline", "bookmark"] as const,
  profile: ["Perfil", "person-outline", "person"] as const,
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const tab = tabs[route.name as keyof typeof tabs];

        return {
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.black,
            borderTopColor: colors.hairline,
            height: 76,
            paddingTop: 8,
            paddingBottom: 12,
          },
          tabBarActiveTintColor: colors.activeGold,
          tabBarInactiveTintColor: colors.tertiary,
          tabBarLabelStyle: {
            fontFamily: fonts.bodyMedium,
            fontSize: 11,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? tab[2] : tab[1]} color={color} size={21} />
          ),
          title: tab[0],
        };
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="favorites" />
      <Tabs.Screen name="saved" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
