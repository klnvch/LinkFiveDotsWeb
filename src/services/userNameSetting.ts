const USER_NAME_KEY = 'userName';

export function readUserName(): string | null {
  try {
    return localStorage.getItem(USER_NAME_KEY) || null;
  } catch {
    return null;
  }
}

export function saveUserName(name: string | null): void {
  try {
    const trimmedName = name?.trim();
    if (trimmedName) {
      localStorage.setItem(USER_NAME_KEY, trimmedName);
    } else {
      localStorage.removeItem(USER_NAME_KEY);
    }
  } catch {
    // ignore
  }
}
