import { useEffect, useMemo, useReducer, useCallback } from 'react';
import { readUserName, saveUserName } from '../services/userNameSetting';
import { useUserId } from '../hooks/multiplayer/useUserId';
import { DotsStyleType } from 'LinkFiveDots-shared';
import {
  readDotsStyleType,
  saveDotsStyleType,
} from '../services/dotsStyleSetting';
import {
  AppContext,
  type AppContextValue,
  type AppState,
} from './AppContextBase';

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

// AppContextValue comes from AppContextBase

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const userId = useUserId();

  // Initialize userName from storage once
  useEffect(() => {
    const stored = readUserName();
    if (stored !== state.userName) {
      dispatch({ type: 'setUserName', payload: stored });
    }
  }, [state.userName]);

  // Initialize dotsStyleType from storage once
  useEffect(() => {
    const stored = readDotsStyleType();
    if (stored !== state.dotsStyleType) {
      dispatch({ type: 'setDotsStyleType', payload: stored });
    }
  }, [state.dotsStyleType]);

  // Sync firebaseUserId from auth
  useEffect(() => {
    if (userId !== state.userId) {
      dispatch({ type: 'setUserId', payload: userId });
    }
  }, [userId, state.userId]);

  const setUserName = useCallback((name: string | null) => {
    const trimmed = name?.trim() || null;
    saveUserName(trimmed);
    dispatch({ type: 'setUserName', payload: trimmed });
  }, []);

  const setDotsStyleType = useCallback((type: DotsStyleType | null) => {
    saveDotsStyleType(type);
    dispatch({ type: 'setDotsStyleType', payload: type });
  }, []);

  const value: AppContextValue = useMemo(
    () => ({ ...state, setUserName, setDotsStyleType }),
    [state, setUserName, setDotsStyleType],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
