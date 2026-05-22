import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import { CultureItem, LibraryItem } from "@/types/culture";

type LibraryContextValue = {
  favorites: LibraryItem[];
  saved: LibraryItem[];
  isFavorite: (itemId: string) => boolean;
  isSaved: (itemId: string) => boolean;
  toggleFavorite: (item: CultureItem) => Promise<void>;
  toggleSaved: (item: CultureItem) => Promise<void>;
};

export const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);

const favoritesKey = "appetize.library.favorites";
const savedKey = "appetize.library.saved";

export function LibraryProvider({ children }: PropsWithChildren) {
  const [favorites, setFavorites] = useState<LibraryItem[]>([]);
  const [saved, setSaved] = useState<LibraryItem[]>([]);

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(favoritesKey), AsyncStorage.getItem(savedKey)]).then(
      ([storedFavorites, storedSaved]) => {
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites) as LibraryItem[]);
        }

        if (storedSaved) {
          setSaved(JSON.parse(storedSaved) as LibraryItem[]);
        }
      },
    );
  }, []);

  const favoriteIds = useMemo(() => new Set(favorites.map((item) => item.id)), [favorites]);
  const savedIds = useMemo(() => new Set(saved.map((item) => item.id)), [saved]);

  const value = useMemo<LibraryContextValue>(
    () => ({
      favorites,
      saved,
      isFavorite: (itemId) => favoriteIds.has(itemId),
      isSaved: (itemId) => savedIds.has(itemId),
      toggleFavorite: async (item) => {
        const nextItems = favoriteIds.has(item.id)
          ? favorites.filter((currentItem) => currentItem.id !== item.id)
          : [{ ...item, createdAt: new Date().toISOString() }, ...favorites];

        setFavorites(nextItems);
        await AsyncStorage.setItem(favoritesKey, JSON.stringify(nextItems));
      },
      toggleSaved: async (item) => {
        const nextItems = savedIds.has(item.id)
          ? saved.filter((currentItem) => currentItem.id !== item.id)
          : [{ ...item, createdAt: new Date().toISOString() }, ...saved];

        setSaved(nextItems);
        await AsyncStorage.setItem(savedKey, JSON.stringify(nextItems));
      },
    }),
    [favoriteIds, favorites, saved, savedIds],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}
