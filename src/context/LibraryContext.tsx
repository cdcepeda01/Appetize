import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import { ConsumptionStatus, ConsumptionStatusRecord, CultureItem, LibraryItem } from "@/types/culture";

type LibraryContextValue = {
  favorites: LibraryItem[];
  saved: LibraryItem[];
  consumptionStatusById: Record<string, ConsumptionStatusRecord>;
  isFavorite: (itemId: string) => boolean;
  isSaved: (itemId: string) => boolean;
  getConsumptionStatus: (itemId: string) => ConsumptionStatus | undefined;
  toggleFavorite: (item: CultureItem) => Promise<void>;
  toggleSaved: (item: CultureItem) => Promise<void>;
  setConsumptionStatus: (item: CultureItem, status: ConsumptionStatus) => Promise<void>;
  clearConsumptionStatus: (itemId: string) => Promise<void>;
};

export const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);

const favoritesKey = "appetize.library.favorites";
const savedKey = "appetize.library.saved";
const consumptionStatusKey = "appetize.library.consumptionStatus";

export function LibraryProvider({ children }: PropsWithChildren) {
  const [favorites, setFavorites] = useState<LibraryItem[]>([]);
  const [saved, setSaved] = useState<LibraryItem[]>([]);
  const [consumptionStatusById, setConsumptionStatusById] = useState<Record<string, ConsumptionStatusRecord>>({});

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(favoritesKey),
      AsyncStorage.getItem(savedKey),
      AsyncStorage.getItem(consumptionStatusKey),
    ]).then(
      ([storedFavorites, storedSaved, storedConsumptionStatus]) => {
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites) as LibraryItem[]);
        }

        if (storedSaved) {
          setSaved(JSON.parse(storedSaved) as LibraryItem[]);
        }

        if (storedConsumptionStatus) {
          setConsumptionStatusById(JSON.parse(storedConsumptionStatus) as Record<string, ConsumptionStatusRecord>);
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
      consumptionStatusById,
      isFavorite: (itemId) => favoriteIds.has(itemId),
      isSaved: (itemId) => savedIds.has(itemId),
      getConsumptionStatus: (itemId) => consumptionStatusById[itemId]?.status,
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
      setConsumptionStatus: async (item, status) => {
        const nextStatusById = {
          ...consumptionStatusById,
          [item.id]: {
            status,
            updatedAt: new Date().toISOString(),
          },
        };

        setConsumptionStatusById(nextStatusById);
        await AsyncStorage.setItem(consumptionStatusKey, JSON.stringify(nextStatusById));

        if (!savedIds.has(item.id)) {
          const nextSavedItems = [{ ...item, createdAt: new Date().toISOString() }, ...saved];
          setSaved(nextSavedItems);
          await AsyncStorage.setItem(savedKey, JSON.stringify(nextSavedItems));
        }
      },
      clearConsumptionStatus: async (itemId) => {
        const { [itemId]: _removed, ...nextStatusById } = consumptionStatusById;
        setConsumptionStatusById(nextStatusById);
        await AsyncStorage.setItem(consumptionStatusKey, JSON.stringify(nextStatusById));
      },
    }),
    [consumptionStatusById, favoriteIds, favorites, saved, savedIds],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}
