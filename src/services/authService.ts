import { getAuthOrNull } from '../firebase';
import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
} from 'firebase/auth';

export function authAnonymously() {
  const auth = getAuthOrNull();
  if (!auth) return;
  signInAnonymously(auth).catch((err) => console.error(err));
}

export function authGoogle() {
  const auth = getAuthOrNull();
  if (!auth) return;
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).catch((err) => console.error(err));
}

export function deleteAccount() {
  const auth = getAuthOrNull();
  auth?.currentUser?.delete()?.catch((err) => console.error(err));
}
