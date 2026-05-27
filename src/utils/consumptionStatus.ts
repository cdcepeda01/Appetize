import { Ionicons } from "@expo/vector-icons";
import { ConsumptionStatus, CultureType } from "@/types/culture";

type StatusOption = {
  status: ConsumptionStatus;
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const statusCopy: Record<CultureType, StatusOption[]> = {
  movie: [
    { status: "pending", label: "Pendiente", description: "Para ver después", icon: "time-outline" },
    { status: "inProgress", label: "Viendo", description: "En progreso", icon: "play-circle-outline" },
    { status: "completed", label: "Vista", description: "Ya la viste", icon: "checkmark-circle-outline" },
  ],
  book: [
    { status: "pending", label: "Pendiente", description: "Para leer después", icon: "time-outline" },
    { status: "inProgress", label: "Leyendo", description: "En progreso", icon: "book-outline" },
    { status: "completed", label: "Leído", description: "Ya lo leíste", icon: "checkmark-circle-outline" },
  ],
  music: [
    { status: "pending", label: "Pendiente", description: "Para escuchar después", icon: "time-outline" },
    { status: "inProgress", label: "Escuchando", description: "En rotación", icon: "headset-outline" },
    { status: "completed", label: "Escuchado", description: "Ya lo escuchaste", icon: "checkmark-circle-outline" },
  ],
  art: [
    { status: "pending", label: "Pendiente", description: "Para mirar después", icon: "time-outline" },
    { status: "inProgress", label: "Explorando", description: "En observación", icon: "eye-outline" },
    { status: "completed", label: "Contemplada", description: "Ya la miraste", icon: "checkmark-circle-outline" },
  ],
};

export function getConsumptionStatusOptions(type: CultureType) {
  return statusCopy[type];
}

export function getConsumptionStatusLabel(type: CultureType, status?: ConsumptionStatus) {
  if (!status) {
    return "Sin estado";
  }

  return statusCopy[type].find((option) => option.status === status)?.label ?? "Sin estado";
}
