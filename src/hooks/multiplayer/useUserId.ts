import { useEffect, useState } from 'react';
import { getAuthOrNull } from '../../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

/**
 * Custom hook to provide the current Firebase userId (uid), handling anonymous sign-in.
 * @returns userId (string | null)
 */
export function useUserId(): string | null {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuthOrNull();
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) =>
      setUserId(user?.uid ?? null),
    );

    return () => unsubscribe();
  }, []);

  return userId;
}
