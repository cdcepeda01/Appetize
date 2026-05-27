import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";

type DemoUser = {
  uid: string;
  email: string | null;
  displayName?: string | null;
};

type AuthContextValue = {
  user: DemoUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const demoUserKey = "appetize.demoUser";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(demoUserKey)
      .then((storedUser) => {
        if (storedUser) {
          setUser(JSON.parse(storedUser) as DemoUser);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signIn: async (email, password) => {
        if (password.trim().length < 4) {
          throw new Error("Usa una contraseña demo de al menos 4 caracteres.");
        }

        const demoUser = createDemoUser(email);
        await AsyncStorage.setItem(demoUserKey, JSON.stringify(demoUser));
        setUser(demoUser);
      },
      register: async (name, email, password) => {
        if (name.trim().length < 2) {
          throw new Error("Escribe tu nombre para personalizar Appetize.");
        }

        if (password.trim().length < 4) {
          throw new Error("Usa una contraseña demo de al menos 4 caracteres.");
        }

        const demoUser = createDemoUser(email, name);
        await AsyncStorage.setItem(demoUserKey, JSON.stringify(demoUser));
        setUser(demoUser);
      },
      logout: async () => {
        await AsyncStorage.removeItem(demoUserKey);
        setUser(null);
        router.replace("/login");
      },
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function createDemoUser(email: string, name?: string): DemoUser {
  const cleanEmail = email.trim().toLowerCase() || "demo@appetize.local";
  const cleanName = name?.trim();

  return {
    uid: `demo-${cleanEmail}`,
    email: cleanEmail,
    displayName: cleanName || cleanEmail.split("@")[0] || "Invitado",
  };
}
