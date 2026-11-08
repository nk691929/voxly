/** Checks for the sign-in forms. Each returns an error message, or null if fine. */
export function validateEmail(email: string): string | null {
  const e = email.trim();
  if (e.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return "Enter a valid email address.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (password.length > 72) return "Password must be 72 characters or fewer.";
  return null;
}

export function validateCredentials(email: string, password: string): string | null {
  return validateEmail(email) ?? validatePassword(password);
}

/** Checks the "change password" form. */
export function validatePasswordChange(current: string, next: string, confirm: string): string | null {
  if (current.length === 0) return "Enter your current password.";
  if (current.length > 72) return "Your current password is incorrect.";
  const problem = validatePassword(next);
  if (problem) return problem;
  if (next !== confirm) return "The two new passwords do not match.";
  if (next === current) return "Choose a new password that is different from your current one.";
  return null;
}
