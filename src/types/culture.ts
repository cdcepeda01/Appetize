export type CultureType = "movie" | "book" | "music" | "art";

export type ConsumptionStatus = "pending" | "inProgress" | "completed";

export type CultureItem = {
  id: string;
  type: CultureType;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  coverAsset?: string;
  source: string;
  year?: string;
  tags?: string[];
};

export type LibraryItem = CultureItem & {
  createdAt?: unknown;
};

export type ConsumptionStatusRecord = {
  status: ConsumptionStatus;
  updatedAt: string;
};

export type CuratedContent = {
  featured?: CultureItem;
  movies: CultureItem[];
  books: CultureItem[];
  music: CultureItem[];
  art: CultureItem[];
};

export const cultureLabels: Record<CultureType, string> = {
  movie: "Cine",
  book: "Libros",
  music: "Música",
  art: "Arte",
};
