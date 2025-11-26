import {
  addDotBotGame,
  createBotGame,
  GameViewState,
  mapToBotGameViewState,
  Point,
  undoBotGame,
} from '@klnvch/link-five-dots-shared';
import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { useTranslatedStrings } from '../../services/stringProvider';
import { useRoom } from './userRoom';

export const useRooms = () => {
  const stringProvider = useTranslatedStrings();
  const { userName } = useAppContext();
  const [room, setRoom] = useRoom();
  const [viewState, setViewState] = useState<GameViewState | null>(null);

  useEffect(() => {
    if (!room) {
      createBotGame(setRoom);
    } else {
      setViewState(mapToBotGameViewState(userName, stringProvider, room));
    }
  }, [room, setRoom, userName, stringProvider]);

  const newGame = useCallback(async () => {
    await createBotGame(setRoom);
  }, [setRoom]);

  const addDot = useCallback(
    async (p: Point) => {
      await addDotBotGame(room, p, setRoom);
    },
    [room, setRoom],
  );

  const undo = useCallback(async () => {
    await undoBotGame(room, setRoom);
  }, [room, setRoom]);

  return { gameViewState: viewState, newGame, addDot, undo };
};
