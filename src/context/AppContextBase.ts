import { createContext } from 'react';
import { DotsStyle, NetworkUser } from '@klnvch/link-five-dots-shared';

export type AppState = {
  userName: string | null;
  networkUser: NetworkUser | null;
  isUserAnonymousOrMissing: boolean;
  dotsStyle: DotsStyle;
};

export type AppContextValue = AppState & {
  setUserName: (name: string | null) => void;
  setDotsStyle: (type: DotsStyle | null) => void;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);
