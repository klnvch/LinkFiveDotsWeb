import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';

/**
 * Custom hook to provide the current Firebase userId (uid), handling anonymous sign-in.
 * @returns userId (string | null)
 */
export function useUserId(): string | null {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserId(user.uid);
      } else {
        signInAnonymously(auth).catch((err) => console.error(err));
      }
    });
    return () => unsubscribe();
  }, []);

  return userId;
}
