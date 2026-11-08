export interface HistoryRow {
  id: string;
  output_type: "email" | "notes" | "tasks" | "translate";
  source_text: string;
  output_text: string;
  created_at: string;
}
