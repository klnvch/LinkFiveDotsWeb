import { PickerScreen } from '@klnvch/link-five-dots-shared';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useRoomNavigation(screen: PickerScreen) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (screen.isGame) {
      if (!location.pathname.endsWith('/game')) {
        navigate('game', { replace: true });
      }
    }
  }, [screen, location.pathname, navigate]);
}
