import { getAuthOrNull } from '../firebase';
import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  deleteUser,
  reauthenticateWithPopup,
  signOut,
  linkWithPopup,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export async function authAnonymously() {
  const auth = getAuthOrNull();
  if (!auth) return;

  try {
    await signInAnonymously(auth);
  } catch (e) {
    console.log(e);
  }
}

export async function authGoogle() {
  const auth = getAuthOrNull();
  if (!auth) return;

  try {
    const user = auth.currentUser;
    switch (user?.isAnonymous) {
      case true: {
        // TODO: 'auth/credential-already-in-use'
        await linkWithPopup(user, googleProvider);
        break;
      }
      case undefined: {
        await signInWithPopup(auth, googleProvider);
        break;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export async function deleteAccount() {
  const auth = getAuthOrNull();
  if (!auth) return;

  try {
    const user = auth.currentUser;
    switch (user?.isAnonymous) {
      case true: {
        await signOut(auth);
        break;
      }
      case false: {
        await reauthenticateWithPopup(user, googleProvider);
        await deleteUser(user);
        break;
      }
    }
  } catch (e) {
    console.log(e);
  }
}
