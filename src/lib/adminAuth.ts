"use client";

export const ADMIN_AUTH_KEY = "m5c_admin_authenticated";
export const ADMIN_COOKIE_NAME = "m5c_admin_auth";

export function checkIsAdminAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const isLocalAuth = localStorage.getItem(ADMIN_AUTH_KEY) === "true";
    const hasCookie = document.cookie
      .split(";")
      .some((item) => item.trim().startsWith(`${ADMIN_COOKIE_NAME}=true`));
    return isLocalAuth || hasCookie;
  } catch {
    return false;
  }
}

export function setAdminSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ADMIN_AUTH_KEY, "true");
    document.cookie = `${ADMIN_COOKIE_NAME}=true; path=/; max-age=86400; SameSite=Lax`;
  } catch (e) {
    console.error("Failed to store admin session", e);
  }
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    document.cookie = `${ADMIN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  } catch (e) {
    console.error("Failed to clear admin session", e);
  }
}

export function validateAdminCredentials(user: string, pass: string): boolean {
  return user.trim().toLowerCase() === "admin" && pass === "admin";
}
