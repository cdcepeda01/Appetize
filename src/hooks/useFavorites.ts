import { useLibrary } from "@/hooks/useLibrary";

export function useFavorites() {
  const library = useLibrary();

  return {
    items: library.favorites,
    hasItem: library.isFavorite,
    toggleItem: library.toggleFavorite,
  };
}
