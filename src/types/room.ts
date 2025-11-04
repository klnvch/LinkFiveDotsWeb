import {
  FoundRemoteRoom,
  GameViewState,
  NetworkGameAction,
  PickerViewState,
  Point,
} from 'LinkFiveDots-shared';

export interface RoomState {
  pickerViewState: PickerViewState;
  gameViewState: GameViewState | null;
  actionTitle: NetworkGameAction;
}

export interface RoomActions {
  createRoom: () => Promise<void>;
  deleteRoom: () => Promise<void>;
  connectRoom: (invitation: FoundRemoteRoom) => Promise<void>;
  addDot: (p: Point) => Promise<void>;
  scanRooms: () => void;
  cancelScan: () => void;
  exitGame: () => Promise<void>;
}
