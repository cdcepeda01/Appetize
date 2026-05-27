import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";

type PreferencesContextValue = {
  tastePreferences: string[];
  onboardingComplete: boolean;
  loading: boolean;
  saveTastePreferences: (preferences: string[]) => Promise<void>;
  resetOnboarding: () => Promise<void>;
};

type StoredPreferences = {
  tastePreferences: string[];
  onboardingComplete: boolean;
};

export const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

const preferencesKey = "appetize.preferences";
const defaultPreferences = ["Nocturno", "Elegante", "Melancólico"];

export function PreferencesProvider({ children }: PropsWithChildren) {
  const [tastePreferences, setTastePreferences] = useState<string[]>([]);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(preferencesKey)
      .then((storedPreferences) => {
        if (!storedPreferences) {
          return;
        }

        const parsed = JSON.parse(storedPreferences) as StoredPreferences;
        setTastePreferences(parsed.tastePreferences ?? []);
        setOnboardingComplete(Boolean(parsed.onboardingComplete));
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      tastePreferences,
      onboardingComplete,
      loading,
      saveTastePreferences: async (preferences) => {
        const cleanPreferences = preferences.length ? preferences : defaultPreferences;
        const nextPreferences: StoredPreferences = {
          tastePreferences: cleanPreferences,
          onboardingComplete: true,
        };

        await AsyncStorage.setItem(preferencesKey, JSON.stringify(nextPreferences));
        setTastePreferences(cleanPreferences);
        setOnboardingComplete(true);
      },
      resetOnboarding: async () => {
        await AsyncStorage.removeItem(preferencesKey);
        setTastePreferences([]);
        setOnboardingComplete(false);
      },
    }),
    [loading, onboardingComplete, tastePreferences],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
