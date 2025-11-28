import { useAppContext } from '../context/useAppContext';
import { useColorScheme } from '@mui/material/styles';
import { clearBotGame } from './singleplayer/userRoom';
import { clearOnlineGameKey } from './multiplayer/useRoomKey';
import { resetLanguage } from '../i18n';
import { deleteAccount } from '../services/authService';

export function useDeleteAll() {
  const { setUserName, setDotsStyle } = useAppContext();
  const { setMode } = useColorScheme();

  return () => {
    setUserName(null);
    setDotsStyle(null);
    resetLanguage();
    setMode(null);
    clearBotGame();
    clearOnlineGameKey();
    deleteAccount();
  };
}
