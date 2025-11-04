import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'roomKey';

function saveOnlineGameKey(key: string | null) {
  if (key) {
    localStorage.setItem(LOCAL_STORAGE_KEY, key);
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

export const clearOnlineGameKey = () => saveOnlineGameKey(null);

/**
 * Custom hook to store and retrieve a key string in localStorage.
 * @returns [key, setKey] - The current key and a setter function.
 */
export function useRoomKey(): [
  string | null,
  (key: string) => void,
  () => void,
] {
  const [key, setKeyState] = useState<string | null>(() =>
    localStorage.getItem(LOCAL_STORAGE_KEY),
  );

  useEffect(() => saveOnlineGameKey(key), [key]);

  const setKey = (newKey: string) => setKeyState(newKey);
  const clearKey = () => setKeyState(null);

  return [key, setKey, clearKey];
}
