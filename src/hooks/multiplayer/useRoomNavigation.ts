import { PickerScreen, PickerScreenGame } from 'LinkFiveDots-shared';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useRoomNavigation(screen: PickerScreen) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (screen == PickerScreenGame.getInstance()) {
      if (!location.pathname.endsWith('/game')) {
        navigate('game', { replace: true });
      }
    }
  }, [screen, location.pathname, navigate]);
}
