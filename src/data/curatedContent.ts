import { CuratedContent, CultureItem } from "@/types/culture";

export const moods = [
  "Oscuro",
  "Clásico",
  "Romántico",
  "Experimental",
  "Melancólico",
  "Elegante",
  "Latino",
  "Nocturno",
];

export const curatedItems: CultureItem[] = [
  {
    id: "movie-in-the-mood-for-love",
    type: "movie",
    title: "In the Mood for Love",
    subtitle: "Wong Kar-wai, 2000",
    description:
      "Una historia de deseo contenido, pasillos estrechos y silencios que pesan más que una confesión.",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    source: "Selección editorial",
    year: "2000",
    tags: ["Romántico", "Melancólico", "Nocturno", "Elegante"],
  },
  {
    id: "movie-burning",
    type: "movie",
    title: "Burning",
    subtitle: "Lee Chang-dong, 2018",
    description:
      "Un thriller atmosférico sobre obsesión, clase y la incomodidad de no poder explicar lo que intuimos.",
    imageUrl: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=1200&q=80",
    source: "Cine para quedarse pensando",
    year: "2018",
    tags: ["Oscuro", "Experimental", "Melancólico", "Nocturno"],
  },
  {
    id: "movie-roma",
    type: "movie",
    title: "Roma",
    subtitle: "Alfonso Cuarón, 2018",
    description:
      "Memoria íntima y composición precisa: una casa, una ciudad y una vida doméstica filmadas con enorme atención.",
    imageUrl: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=80",
    source: "Archivo latino",
    year: "2018",
    tags: ["Latino", "Clásico", "Melancólico", "Elegante"],
  },
  {
    id: "book-the-savage-detectives",
    type: "book",
    title: "Los detectives salvajes",
    subtitle: "Roberto Bolaño",
    description:
      "Una novela-río sobre literatura, juventud y fuga; perfecta para perderse sin pedir demasiados mapas.",
    imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80",
    source: "Libros para leer con café",
    year: "1998",
    tags: ["Latino", "Experimental", "Nocturno", "Melancólico"],
  },
  {
    id: "book-orlando",
    type: "book",
    title: "Orlando",
    subtitle: "Virginia Woolf",
    description:
      "Un clásico libre, brillante y moderno sobre identidad, tiempo y belleza sin obedecer del todo a ninguna época.",
    imageUrl: "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=1200&q=80",
    source: "Biblioteca elegante",
    year: "1928",
    tags: ["Clásico", "Experimental", "Elegante", "Romántico"],
  },
  {
    id: "book-on-earth",
    type: "book",
    title: "On Earth We're Briefly Gorgeous",
    subtitle: "Ocean Vuong",
    description:
      "Una carta luminosa y dolorosa sobre familia, lenguaje, deseo y lo que queda cuando se escribe desde la herida.",
    imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
    source: "Lecturas íntimas",
    year: "2019",
    tags: ["Melancólico", "Romántico", "Elegante", "Nocturno"],
  },
  {
    id: "music-vespertine",
    type: "music",
    title: "Vespertine",
    subtitle: "Björk",
    description:
      "Un álbum de microtexturas, respiración y electrónica íntima: parece hecho para escucharse con poca luz.",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    source: "Álbumes para desaparecer un rato",
    year: "2001",
    tags: ["Experimental", "Nocturno", "Elegante", "Melancólico"],
  },
  {
    id: "music-el-madrileno",
    type: "music",
    title: "El Madrileño",
    subtitle: "C. Tangana",
    description:
      "Tradición, pop y gesto contemporáneo en un disco que cruza sobremesa, calle y producción de alto brillo.",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    source: "Pulso latino",
    year: "2021",
    tags: ["Latino", "Elegante", "Romántico", "Clásico"],
  },
  {
    id: "music-blonde",
    type: "music",
    title: "Blonde",
    subtitle: "Frank Ocean",
    description:
      "Canciones suspendidas entre memoria y deseo, con una producción mínima que deja mucho espacio al silencio.",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
    source: "Música para volver",
    year: "2016",
    tags: ["Melancólico", "Nocturno", "Romántico", "Elegante"],
  },
  {
    id: "art-hopper-nighthawks",
    type: "art",
    title: "Nighthawks",
    subtitle: "Edward Hopper",
    description:
      "Una escena nocturna que convierte una cafetería iluminada en símbolo de distancia, ciudad y espera.",
    imageUrl: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80",
    source: "Obras para mirar en silencio",
    year: "1942",
    tags: ["Nocturno", "Clásico", "Melancólico", "Elegante"],
  },
  {
    id: "art-kusama-infinity",
    type: "art",
    title: "Infinity Mirror Rooms",
    subtitle: "Yayoi Kusama",
    description:
      "Instalaciones inmersivas donde repetición, luz y reflejo vuelven corporal la idea de infinito.",
    imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80",
    source: "Galería contemporánea",
    year: "1965-presente",
    tags: ["Experimental", "Elegante", "Romántico", "Nocturno"],
  },
  {
    id: "art-botero-dancers",
    type: "art",
    title: "Bailarines",
    subtitle: "Fernando Botero",
    description:
      "Volumen, ironía y una sensualidad reconocible que convierten la escena cotidiana en lenguaje propio.",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80",
    source: "Arte latino",
    year: "1987",
    tags: ["Latino", "Clásico", "Elegante", "Romántico"],
  },
];

export const curatedContent: CuratedContent = {
  featured: curatedItems[0],
  movies: curatedItems.filter((item) => item.type === "movie"),
  books: curatedItems.filter((item) => item.type === "book"),
  music: curatedItems.filter((item) => item.type === "music"),
  art: curatedItems.filter((item) => item.type === "art"),
};
