import { useState, useRef, useCallback, useEffect } from 'react';
import { Unsubscribe } from 'firebase/database';
import { RoomState, RoomActions } from '../../types/room';
import * as roomService from '../../services/roomService';
import {
  createInitialPickerState,
  createNetworkUser,
  FoundRemoteRoom,
  GameViewState,
  getRoomActionTitle,
  INetworkRoom,
  NetworkUser,
  mapToGameViewState,
  NetworkGameAction,
  NetworkRoomState,
  NetworkRoomStateCreated,
  NetworkRoomStateDeleted,
  NetworkRoomStateFinished,
  NetworkRoomStateStarted,
  OnlineRoom,
  PickerState,
  Point,
  toNetworkRoomState,
  toPickerViewState,
  toOnlineRoomLive,
} from '@klnvch/link-five-dots-shared';
import { useRoomKey } from './useRoomKey';
import { useAppContext } from '../../context/useAppContext';
import { useTranslatedStrings } from '../../services/stringProvider';

export const useRooms = (): RoomState & RoomActions => {
  const [key, setKey, clearKey] = useRoomKey();
  const { userId, userName, dotsStyleType } = useAppContext();
  const stringProvider = useTranslatedStrings();
  const [user, setUser] = useState<NetworkUser | null>(null);
  const [onlineRoom, setOnlineRoom] = useState<OnlineRoom | null>(null);
  const [roomState, setRoomState] = useState<NetworkRoomState | null>(null);
  const [room, setRoom] = useState<INetworkRoom | null>(null);
  const [state, setState] = useState<PickerState>(createInitialPickerState());
  const [gameViewState, setGameViewState] = useState<GameViewState | null>(
    null,
  );
  const [actionTitle, setActionTitle] = useState<NetworkGameAction>(
    NetworkGameAction.DEFAULT,
  );
  const scanRef = useRef<Unsubscribe | null>(null);
  const roomRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    if (userId) {
      setUser(createNetworkUser(userId, userName));
    } else {
      setUser(null);
    }
  }, [userId, userName]);

  useEffect(() => {
    console.log('key', key);
    // cleanup previous subscription
    roomRef.current && roomRef.current();
    roomRef.current = null;

    if (key) {
      roomRef.current = roomService.subscribeToRoom(key, setOnlineRoom);
    } else {
      setOnlineRoom(null);
    }

    return () => {
      roomRef.current && roomRef.current();
      roomRef.current = null;
    };
  }, [key]);

  useEffect(() => {
    console.log('onlineRoom', onlineRoom?.toString());
    if (onlineRoom) {
      const onlineRoomLive = toOnlineRoomLive(onlineRoom);
      if (onlineRoomLive) {
        setRoom(onlineRoomLive.room);
        setGameViewState(
          mapToGameViewState(
            dotsStyleType,
            stringProvider.unknownName,
            onlineRoomLive,
          ),
        );
      }
      setRoomState(toNetworkRoomState(onlineRoom, stringProvider.unknownName));
    } else {
      setGameViewState(null);
    }
  }, [dotsStyleType, onlineRoom, stringProvider]);

  useEffect(() => {
    console.log('roomState', roomState?.toString());
    switch (true) {
      case roomState instanceof NetworkRoomStateCreated:
        setState((state) => state.created(roomState.descriptor));
        break;
      case roomState === NetworkRoomStateDeleted.getInstance():
        clearKey();
        setState((state) => state.reset());
        break;
      case roomState instanceof NetworkRoomStateStarted:
        setState((state) => state.connected(roomState.descriptor));
        break;
      case roomState === NetworkRoomStateFinished.getInstance():
        setState((state) => state.disconnected());
        break;
    }
  }, [clearKey, roomState]);

  useEffect(() => {
    user && setActionTitle(getRoomActionTitle(user, state, room));
  }, [user, room, state]);

  const createRoom = useCallback(async () => {
    try {
      setState(state.creating());
      const key = await roomService.createRoom(user);
      setKey(key);
    } catch (err) {
      setState(state.reset());
      console.error(err);
    }
  }, [setKey, state, user]);

  const deleteRoom = useCallback(async () => {
    if (!key) return;
    try {
      setState(state.deleting());
      await roomService.deleteRoom(key);
    } catch (err) {
      console.error(err);
    }
  }, [key, state]);

  const cancelScan = useCallback(() => {
    setState(state.reset());
    if (scanRef.current) {
      scanRef.current();
      scanRef.current = null;
    }
  }, [state]);

  const connectRoom = useCallback(
    async (invitation: FoundRemoteRoom) => {
      cancelScan();
      setState(state.connecting());
      invitation.connect(
        () => {},
        (e) => {
          console.error(e);
        },
      );
    },
    [cancelScan, state],
  );

  const addDot = async (p: Point) => {
    if (!room) return;
    try {
      await roomService.addDotToRoom(user, room, p);
    } catch (err) {
      console.error(err);
    }
  };

  const exitGame = useCallback(async () => {
    if (!key) return;
    try {
      await roomService.finishRoom(key);
    } catch (err) {
      console.error(err);
    } finally {
      setState(state.reset());
    }
  }, [key, state]);

  const scanRooms = useCallback(() => {
    if (!user) return;
    scanRef.current = roomService.subscribeToInvitations(
      user,
      stringProvider.unknownName,
      (invitations: FoundRemoteRoom[]) => {
        setState(state.scanning(invitations));
      },
      setKey,
    );
  }, [user, state, setKey, stringProvider]);

  // Unsubscribe on unmount
  useEffect(() => {
    return () => {
      scanRef.current && scanRef.current();
      scanRef.current = null;
      roomRef.current && roomRef.current();
      roomRef.current = null;
    };
  }, []);

  return {
    createRoom,
    deleteRoom,
    connectRoom,
    addDot,
    exitGame,
    scanRooms,
    cancelScan,
    pickerViewState: toPickerViewState(state),
    gameViewState,
    actionTitle,
  };
};
