import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { readUserName, saveUserName } from '../services/userNameSetting';
import { useUserId } from '../hooks/multiplayer/useUserId';
import { DotsStyleType } from 'LinkFiveDots-shared';
import {
  readDotsStyleType,
  saveDotsStyleType,
} from '../services/dotsStyleSetting';

type AppState = {
  userName: string | null;
  userId: string | null;
  dotsStyleType: DotsStyleType;
};

type AppAction =
  | { type: 'setUserName'; payload: string | null }
  | { type: 'setUserId'; payload: string | null }
  | { type: 'setDotsStyleType'; payload: DotsStyleType | null };

const initialState: AppState = {
  userName: null,
  userId: null,
  dotsStyleType: DotsStyleType.ORIGINAL,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'setUserName': {
      return { ...state, userName: action.payload };
    }
    case 'setUserId': {
      return { ...state, userId: action.payload };
    }
    case 'setDotsStyleType': {
      return { ...state, dotsStyleType: action.payload ?? readDotsStyleType() };
    }
    default: {
      return state;
    }
  }
}

type AppContextValue = AppState & {
  setUserName: (name: string | null) => void;
  setDotsStyleType: (type: DotsStyleType | null) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const userId = useUserId();

  // Initialize userName from storage once
  useEffect(() => {
    const stored = readUserName();
    if (stored !== state.userName) {
      dispatch({ type: 'setUserName', payload: stored });
    }
  }, []);

  // Initialize dotsStyleType from storage once
  useEffect(() => {
    const stored = readDotsStyleType();
    if (stored !== state.dotsStyleType) {
      dispatch({ type: 'setDotsStyleType', payload: stored });
    }
  }, []);

  // Sync firebaseUserId from auth
  useEffect(() => {
    if (userId !== state.userId) {
      dispatch({ type: 'setUserId', payload: userId });
    }
  }, [userId, state.userId]);

  const setUserName = (name: string | null) => {
    const trimmed = name?.trim() || null;
    saveUserName(trimmed);
    dispatch({ type: 'setUserName', payload: trimmed });
  };

  const setDotsStyleType = (type: DotsStyleType | null) => {
    saveDotsStyleType(type);
    dispatch({ type: 'setDotsStyleType', payload: type });
  };

  const value: AppContextValue = useMemo(
    () => ({ ...state, setUserName, setDotsStyleType }),
    [state, setUserName, setDotsStyleType],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
}
