import { CultureItem } from "@/types/culture";
import { categoryLabels } from "@/utils/categoryLabels";

type DetailProfile = {
  creatorLabel: string;
  yearLabel: string;
  experienceLabel: string;
  experienceValue: string;
  contextLabel: string;
  contextValue: string;
  whyTitle: string;
  whyBody: string;
  guide: Array<{ label: string; value: string }>;
};

const typeContext = {
  movie: "mirar con atención a su atmósfera, su ritmo visual y las decisiones que deja resonando después de verla",
  book: "leer con calma, volver a sus frases y notar cómo construye una sensibilidad propia",
  music: "escuchar de principio a fin, siguiendo su arquitectura sonora y los cambios de energía entre canciones",
  art: "observar sin prisa, atendiendo a su composición, escala, gesto y la sensación que instala en el cuerpo",
};

export function buildDetailCopy(item: CultureItem) {
  const tags = item.tags?.join(", ") || "curaduría editorial";
  const typeLabel = categoryLabels[item.type].toLowerCase();
  const creator = item.subtitle ? ` de ${item.subtitle}` : "";
  const year = item.year ? ` (${item.year})` : "";

  return [
    `${item.title}${creator}${year} entra en Appetize como una pieza de ${typeLabel} seleccionada por su capacidad de sostener una experiencia más amplia que una recomendación rápida. ${item.description ?? ""}`,
    `La sugerencia es ${typeContext[item.type]}. Sus coordenadas editoriales son ${tags}, una mezcla que ayuda a ubicarla dentro del archivo personal sin reducirla a una etiqueta única.`,
    `Puede funcionar como una recomendación para hoy o como algo para guardar y revisar después. ${item.source} la coloca dentro de una ruta cultural pensada para descubrir, comparar y construir gusto con continuidad.`,
  ];
}

export function getDetailProfile(item: CultureItem): DetailProfile {
  const tags = item.tags ?? [];
  const primaryTone = tags[0] ?? "Editorial";
  const secondaryTone = tags[1] ?? "Contemplativo";

  if (item.type === "movie") {
    return {
      creatorLabel: "Director/a",
      yearLabel: "Año",
      experienceLabel: "Ritmo visual",
      experienceValue: `${primaryTone} · ${secondaryTone}`,
      contextLabel: "Tono",
      contextValue: tags.slice(0, 3).join(" · ") || "Cine de autor",
      whyTitle: "Por qué verla",
      whyBody:
        "Porque propone una experiencia visual y emocional que funciona mejor cuando se mira sin prisa, dejando que sus silencios, encuadres y decisiones narrativas respiren.",
      guide: [
        { label: "Momento ideal", value: "Noche tranquila, sin interrupciones." },
        { label: "Atención", value: "Observa el uso del espacio, la luz y el ritmo." },
        { label: "Después", value: "Guárdala si te deja pensando más que explicando." },
      ],
    };
  }

  if (item.type === "book") {
    return {
      creatorLabel: "Autor/a",
      yearLabel: "Publicación",
      experienceLabel: "Ritmo de lectura",
      experienceValue: tags.includes("Experimental") ? "Lento y atento" : "Pausado",
      contextLabel: "Sensibilidad",
      contextValue: tags.slice(0, 3).join(" · ") || "Literatura contemporánea",
      whyTitle: "Por qué leerlo",
      whyBody:
        "Porque abre una forma de mirar el mundo desde el lenguaje. Es una lectura para subrayar, dejar reposar y volver a visitar cuando cambie el ánimo.",
      guide: [
        { label: "Momento ideal", value: "Lectura lenta, café o silencio." },
        { label: "Atención", value: "Busca frases que revelen una mirada propia." },
        { label: "Después", value: "Anota qué imagen o idea se queda contigo." },
      ],
    };
  }

  if (item.type === "music") {
    return {
      creatorLabel: "Artista",
      yearLabel: "Año",
      experienceLabel: "Tipo de escucha",
      experienceValue: tags.includes("Nocturno") ? "Escucha nocturna" : "Álbum completo",
      contextLabel: "Mood sonoro",
      contextValue: tags.slice(0, 3).join(" · ") || "Álbum esencial",
      whyTitle: "Por qué escucharlo",
      whyBody:
        "Porque funciona como una arquitectura emocional completa. Más que una canción aislada, conviene escucharlo como un recorrido con entrada, tensión y salida.",
      guide: [
        { label: "Momento ideal", value: "Audífonos, caminata o luz baja." },
        { label: "Atención", value: "Sigue cambios de textura, voz y producción." },
        { label: "Después", value: "Vuelve al track que más cambió tu energía." },
      ],
    };
  }

  return {
    creatorLabel: "Artista",
    yearLabel: "Año / periodo",
    experienceLabel: "Tipo de mirada",
    experienceValue: tags.includes("Experimental") ? "Contemplación activa" : "Observación lenta",
    contextLabel: "Lenguaje visual",
    contextValue: tags.slice(0, 3).join(" · ") || "Obra contemplativa",
    whyTitle: "Por qué contemplarla",
    whyBody:
      "Porque la obra instala una relación entre imagen, cuerpo y tiempo. Vale la pena mirarla más de una vez, dejando que cambie la primera impresión.",
    guide: [
      { label: "Momento ideal", value: "Pantalla amplia o pausa sin distracciones." },
      { label: "Atención", value: "Mira composición, escala, gesto y vacío." },
      { label: "Después", value: "Pregúntate qué parte de la imagen insiste." },
    ],
  };
}
