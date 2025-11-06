import { IRoom, jsonToRoom, roomToJson } from '@klnvch/link-five-dots-shared';
import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'botGame';

function readBotGame(): IRoom | null {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return jsonToRoom(stored);
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

function saveBotGame(room: IRoom | null) {
  try {
    if (room) {
      const json = roomToJson(room);
      localStorage.setItem(LOCAL_STORAGE_KEY, json);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch (e) {
    console.log(e);
  }
}

export const clearBotGame = () => saveBotGame(null);

export function useRoom() {
  const [value, setValue] = useState<IRoom | null>(readBotGame);
  useEffect(() => saveBotGame(value), [value]);
  return [value, setValue] as const;
}
