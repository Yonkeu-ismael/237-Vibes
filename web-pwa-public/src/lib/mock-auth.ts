export const AUTH_STORAGE_KEY = "vibes.auth";
export const AUTH_EVENT_NAME = "vibes-auth-changed";

export type MockAuthSession = {
   email: string;
   name?: string;
   loggedInAt?: string;
};

export function isDemoUser(email: string): boolean {
   return email.trim().toLowerCase() === "demo@237vibes.cm";
}

export function readMockSession(): MockAuthSession | null {
   try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as MockAuthSession;
      if (!parsed?.email) return null;
      return parsed;
   } catch {
      return null;
   }
}
