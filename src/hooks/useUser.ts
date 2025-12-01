import { useEffect, useState } from 'react';
import { getAuthOrNull } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FirebaseUser } from '../types/user';

function toFirebaseUser(user: User | null): FirebaseUser | null {
  return user ? { id: user.uid, isAnonymous: user.isAnonymous } : null;
}

/**
 * Custom hook to provide the current user
 * @returns user (FirebaseUser | null)
 */
export function useUser(): FirebaseUser | null {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const auth = getAuthOrNull();
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) =>
      setUser(toFirebaseUser(user)),
    );

    return () => unsubscribe();
  }, []);

  return user;
}
