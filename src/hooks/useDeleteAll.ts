import { useAppContext } from '../context/useAppContext';
import { useColorScheme } from '@mui/material/styles';
import { clearBotGame } from './singleplayer/userRoom';
import { clearOnlineGameKey } from './multiplayer/useRoomKey';
import { resetLanguage } from '../i18n';

export function useDeleteAll() {
  const { setUserName, setDotsStyleType } = useAppContext();
  const { setMode } = useColorScheme();

  return () => {
    setUserName(null);
    setDotsStyleType(null);
    resetLanguage();
    setMode(null);
    clearBotGame();
    clearOnlineGameKey();
  };
}
