import { User } from 'firebase/auth';

export type FirebaseUser = {
  id: User['uid'];
  isAnonymous: User['isAnonymous'];
};
