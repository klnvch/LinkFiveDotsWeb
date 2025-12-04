import { useEffect, useMemo, useReducer, useCallback } from 'react';
import { readUserName, saveUserName } from '../services/userNameSetting';
import { useUser } from '../hooks/useUser';
import { createNetworkUser, DotsStyle } from '@klnvch/link-five-dots-shared';
import { readDotsStyle, saveDotsStyle } from '../services/dotsStyleSetting';
import {
  AppContext,
  type AppContextValue,
  type AppState,
} from './AppContextBase';
import { FirebaseUser } from '../types/user';

type AppAction =
  | { type: 'setUserName'; payload: string | null }
  | { type: 'setUser'; payload: FirebaseUser | null }
  | { type: 'setDotsStyle'; payload: DotsStyle | null };

const initialState: AppState = {
  userName: null,
  userEmail: null,
  networkUser: null,
  isUserAnonymousOrMissing: true,
  dotsStyle: DotsStyle.ORIGINAL,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'setUserName': {
      const id = state.networkUser?.id;
      const userName = action.payload;
      return {
        ...state,
        userName,
        networkUser: createNetworkUser(id, userName) ?? null,
      };
    }
    case 'setUser': {
      const user = action.payload;
      const id = user?.id;
      const userName = state.userName;
      return {
        ...state,
        networkUser: createNetworkUser(id, userName) ?? null,
        isUserAnonymousOrMissing: !user || user.isAnonymous,
        userEmail: user?.email ?? null,
      };
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

  const user = useUser();

  // Initialize userName from storage once
  useEffect(
    () => dispatch({ type: 'setUserName', payload: readUserName() }),
    [],
  );

  // Initialize dotsStyle from storage once
  useEffect(
    () => dispatch({ type: 'setDotsStyle', payload: readDotsStyle() }),
    [],
  );

  // Sync firebaseUserId from auth
  useEffect(() => {
    if (user?.id !== state.networkUser?.id) {
      dispatch({ type: 'setUser', payload: user });
    }
  }, [user, state.networkUser]);

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
