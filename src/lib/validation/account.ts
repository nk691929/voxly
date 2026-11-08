/** The user must type the word DELETE before an account is removed. */
export function isDeleteConfirmed(input: unknown): boolean {
  return typeof input === "string" && input.trim() === "DELETE";
}
