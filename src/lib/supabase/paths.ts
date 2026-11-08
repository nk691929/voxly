/** Which pages need a signed-in user. Pure functions, easy to test. */
const PROTECTED = ["/workspace", "/history"];
const AUTH_PAGES = ["/login", "/signup"];

function matches(path: string, base: string): boolean {
  return path === base || path.startsWith(`${base}/`);
}

export function isProtectedPath(path: string): boolean {
  return PROTECTED.some((base) => matches(path, base));
}

export function isAuthPath(path: string): boolean {
  return AUTH_PAGES.some((base) => matches(path, base));
}
