import { getDb } from '../firebase';
import {
  ref,
  set,
  onValue,
  off,
  query,
  orderByChild,
  equalTo,
  Unsubscribe,
  DataSnapshot,
  update,
  serverTimestamp,
  get,
} from 'firebase/database';
import {
  roomCreate,
  RoomState,
  roomAddDot,
  Point,
  CreateOnlineRoomInvitation,
  toDescriptors,
  RemoteInvitation,
  FoundRemoteRoom,
  OnlineRoom,
  toOnlineRoom,
  INetworkRoom,
  NetworkUser,
} from '@klnvch/link-five-dots-shared';

const ROOMS_KEY = 'rooms_debug';

const onDbSet = async (key: string, value: any): Promise<void> => {
  const roomRef = ref(getDb(), `${ROOMS_KEY}/${key}`);
  await set(roomRef, value);
};

const onDbUpdate = async (key: string, patch: any): Promise<void> => {
  const roomRef = ref(getDb(), `${ROOMS_KEY}/${key}`);
  await update(roomRef, patch);
};

export const createRoom = async (
  networkUser: NetworkUser | null,
): Promise<string> => {
  return roomCreate(
    networkUser,
    async (invitation: CreateOnlineRoomInvitation) => {
      await onDbSet(invitation.key, {
        state: RoomState.CREATED.ordinal,
        time: serverTimestamp(),
        user1: {
          id: invitation.user1.id,
          name: invitation.user1.name,
        },
      });
    },
  );
};

const updateRoomState = async (
  key: string,
  state: RoomState,
): Promise<void> => {
  const roomRef = ref(getDb(), `${ROOMS_KEY}/${key}/state`);
  await set(roomRef, state.ordinal);
};

export const deleteRoom = async (key: string): Promise<void> => {
  await updateRoomState(key, RoomState.DELETED);
};

export const finishRoom = async (key: string): Promise<void> => {
  await updateRoomState(key, RoomState.FINISHED);
};

export const addDotToRoom = async (
  networkUser: NetworkUser | null,
  room: INetworkRoom,
  p: Point,
): Promise<void> => {
  return roomAddDot(
    networkUser,
    room,
    p,
    onDbSet,
    async (path: string, p: Point) => {
      await onDbSet(path, {
        x: p.x,
        y: p.y,
        t: serverTimestamp(),
      });
    },
  );
};

export const subscribeToInvitations = (
  user2: NetworkUser,
  defaultName: string,
  onRoomsUpdate: (invitations: FoundRemoteRoom[]) => void,
  onSaveKey: (key: string) => void,
): Unsubscribe => {
  const roomsRef = ref(getDb(), ROOMS_KEY);
  const q = query(
    roomsRef,
    orderByChild('state'),
    equalTo(RoomState.CREATED.ordinal),
  );

  return onValue(q, async (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    if (data) {
      const items = Object.entries(data).map(
        ([key, value]: [string, any]) => new RemoteInvitation(key, value),
      );

      const descriptors = await toDescriptors(
        user2,
        items,
        defaultName,
        onDbUpdate,
        onSaveKey,
      );

      onRoomsUpdate(descriptors);
    } else {
      onRoomsUpdate([]);
    }
  });
};

export const unsubscribeFromRooms = (): void => {
  off(ref(getDb(), ROOMS_KEY));
};

export const subscribeToRoom = (
  key: string,
  onUpdate: (room: OnlineRoom) => void,
): Unsubscribe => {
  const roomRef = ref(getDb(), ROOMS_KEY + '/' + key);
  return onValue(roomRef, (snapshot: DataSnapshot) => {
    onUpdate(toOnlineRoom(snapshot.key, snapshot.val()));
  });
};

export const updateUserHistory = async (path: string, value: string) => {
  await set(ref(getDb(), path), value);
};

export const readStringArray = async (path: string): Promise<string[]> => {
  const dbRef = ref(getDb(), path);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data);
    }
  } catch (error) {
    console.error('Error reading data:', error);
  }
  return [];
};
