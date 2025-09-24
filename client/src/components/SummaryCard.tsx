import { Summary } from "../types";
import { SummaryCardManager } from "./SummaryCard/SummaryCardManager";

interface SummaryCardProps {
  summary: Summary | null;
  loading: boolean;
  error: string | null;
}

export function SummaryCard(props: SummaryCardProps) {
  return <SummaryCardManager {...props} />;
}
