import { useLibrary } from "@/hooks/useLibrary";

export function useSaved() {
  const library = useLibrary();

  return {
    items: library.saved,
    hasItem: library.isSaved,
    toggleItem: library.toggleSaved,
  };
}
