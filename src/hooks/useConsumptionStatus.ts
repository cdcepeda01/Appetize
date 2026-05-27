import { useLibrary } from "@/hooks/useLibrary";

export function useConsumptionStatus() {
  const library = useLibrary();

  return {
    statusById: library.consumptionStatusById,
    getStatus: library.getConsumptionStatus,
    setStatus: library.setConsumptionStatus,
    clearStatus: library.clearConsumptionStatus,
  };
}
