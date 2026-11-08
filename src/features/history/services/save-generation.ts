import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Saves one result for the signed-in user. The database fills in user_id itself and
 * Row Level Security rejects anything that is not the caller's own row.
 * Returns false instead of throwing, so a save problem never loses the result.
 */
export async function saveGeneration(
  supabase: SupabaseClient,
  row: { outputType: string; sourceText: string; outputText: string },
): Promise<boolean> {
  const { error } = await supabase.from("generations").insert({
    output_type: row.outputType,
    source_text: row.sourceText,
    output_text: row.outputText,
  });
  return !error;
}
