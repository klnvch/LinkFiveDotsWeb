import { createContext } from 'react';
import { DotsStyleType } from 'LinkFiveDots-shared';

export type AppState = {
  userName: string | null;
  userId: string | null;
  dotsStyleType: DotsStyleType;
};

export type AppContextValue = AppState & {
  setUserName: (name: string | null) => void;
  setDotsStyleType: (type: DotsStyleType | null) => void;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);
