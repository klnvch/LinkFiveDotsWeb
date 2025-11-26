import { useEffect, useMemo, useReducer, useCallback } from 'react';
import { readUserName, saveUserName } from '../services/userNameSetting';
import { useUserId } from '../hooks/multiplayer/useUserId';
import { DotsStyle } from '@klnvch/link-five-dots-shared';
import { readDotsStyle, saveDotsStyle } from '../services/dotsStyleSetting';
import {
  AppContext,
  type AppContextValue,
  type AppState,
} from './AppContextBase';

type AppAction =
  | { type: 'setUserName'; payload: string | null }
  | { type: 'setUserId'; payload: string | null }
  | { type: 'setDotsStyle'; payload: DotsStyle | null };

const initialState: AppState = {
  userName: null,
  userId: null,
  dotsStyle: DotsStyle.ORIGINAL,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'setUserName': {
      return { ...state, userName: action.payload };
    }
    case 'setUserId': {
      return { ...state, userId: action.payload };
    }
    case 'setDotsStyle': {
      return { ...state, dotsStyle: action.payload ?? readDotsStyle() };
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

  // Initialize dotsStyle from storage once
  useEffect(() => {
    const stored = readDotsStyle();
    if (stored !== state.dotsStyle) {
      dispatch({ type: 'setDotsStyle', payload: stored });
    }
  }, [state.dotsStyle]);

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

  const setDotsStyle = useCallback((type: DotsStyle | null) => {
    saveDotsStyle(type);
    dispatch({ type: 'setDotsStyle', payload: type });
  }, []);

  const value: AppContextValue = useMemo(
    () => ({ ...state, setUserName, setDotsStyle }),
    [state, setUserName, setDotsStyle],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
