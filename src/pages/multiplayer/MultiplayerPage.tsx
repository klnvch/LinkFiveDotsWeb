import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useRooms } from '../../hooks/multiplayer/useRooms';
import { PickerPage } from './PickerPage';
import { GamePage } from '../GamePage';
import { DisconnectDialog } from '../../components/game/DisconnectDialog';
import { useRoomNavigation } from '../../hooks/multiplayer/useRoomNavigation';
import { FoundRemoteRoom, PickerScreenGame, Point } from 'LinkFiveDots-shared';
import { MultiplayerAppBarTitle } from '../../components/MultiplayerAppBarTitle';

export const MultiplayerPage: React.FC = () => {
  const {
    pickerViewState,
    gameViewState,
    actionTitle,
    createRoom,
    deleteRoom,
    connectRoom,
    addDot,
    exitGame,
    scanRooms,
    cancelScan,
  } = useRooms();
  const navigate = useNavigate();
  const [disconnectOpen, setDisconnectOpen] = useState(false);
  useRoomNavigation(pickerViewState.screen);

  const handleCreateRoom = async () => {
    await createRoom();
  };

  const handleRoomClick = async (invitation: FoundRemoteRoom) => {
    await connectRoom(invitation);
  };

  const handleAddDot = async (p: Point) => {
    await addDot(p);
  };

  const handleCloseGame = async () => {
    if (pickerViewState.screen == PickerScreenGame.getInstance()) {
      setDisconnectOpen(true);
    } else {
      await handleDisconnectConfirm();
    }
  };

  const handleDisconnectCancel = () => {
    setDisconnectOpen(false);
  };

  const handleDisconnectConfirm = async () => {
    await exitGame();
    navigate('/multiplayer', { replace: true });
    setDisconnectOpen(false);
  };

  const handleUndoMove = async () => {
    // TODO: Implement undo move functionality
    console.log('Undo move requested');
  };

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <PickerPage
              uiState={pickerViewState}
              title={actionTitle}
              handleRoomClick={handleRoomClick}
              handleCreateRoom={handleCreateRoom}
              deleteRoom={deleteRoom}
              scanRooms={scanRooms}
              cancelScan={cancelScan}
            />
          }
        />
        <Route
          path="game"
          element={
            <GamePage
              uiState={gameViewState}
              title={<MultiplayerAppBarTitle title={actionTitle} />}
              onMoveDone={handleAddDot}
              onClose={handleCloseGame}
              onNew={handleCloseGame}
              onUndo={handleUndoMove}
            />
          }
        />
      </Routes>
      <DisconnectDialog
        open={disconnectOpen}
        onCancel={handleDisconnectCancel}
        onConfirm={handleDisconnectConfirm}
      />
    </>
  );
};
