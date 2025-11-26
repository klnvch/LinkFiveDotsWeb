import { createContext } from 'react';
import { DotsStyle } from '@klnvch/link-five-dots-shared';

export type AppState = {
  userName: string | null;
  userId: string | null;
  dotsStyle: DotsStyle;
};

export type AppContextValue = AppState & {
  setUserName: (name: string | null) => void;
  setDotsStyle: (type: DotsStyle | null) => void;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);
