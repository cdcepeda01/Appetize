import { useMemo } from "react";
import { curatedContent, curatedItems } from "@/data/curatedContent";

export function useCuratedContent() {
  return useMemo(
    () => ({
      content: curatedContent,
      items: curatedItems,
      loading: false,
      error: null,
    }),
    [],
  );
}
