import React, { useCallback, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useRooms } from '../../hooks/multiplayer/useRooms';
import { PickerPage } from './PickerPage';
import { GamePage } from '../GamePage';
import { DisconnectDialog } from '../../components/game/DisconnectDialog';
import { useRoomNavigation } from '../../hooks/multiplayer/useRoomNavigation';
import { MultiplayerAppBarTitle } from '../../components/MultiplayerAppBarTitle';
import {
  isFirebaseConfigured,
  getMissingFirebaseEnvKeys,
} from '../../firebase';
import { ServiceUnavailable } from '../../components/ServiceUnavailable';
import { useAppContext } from '../../context/useAppContext';
import AuthDialog from '../../components/AuthDialog';
import { authAnonymously, authGoogle } from '../../services/authService';

const MultiplayerPage: React.FC = () => {
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
  const { userId } = useAppContext();
  const navigate = useNavigate();
  const [disconnectOpen, setDisconnectOpen] = useState(false);
  useRoomNavigation(pickerViewState.screen);

  const handleCreateRoom = useCallback(createRoom, [createRoom]);
  const handleRoomClick = useCallback(connectRoom, [connectRoom]);
  const handleAddDot = useCallback(addDot, [addDot]);

  const handleDisconnectConfirm = useCallback(async () => {
    await exitGame();
    navigate('/multiplayer', { replace: true });
    setDisconnectOpen(false);
  }, [exitGame, navigate]);

  const isGameScreen = pickerViewState.screen.isGame;

  const handleCloseGame = useCallback(async () => {
    if (isGameScreen) {
      setDisconnectOpen(true);
    } else {
      await handleDisconnectConfirm();
    }
  }, [handleDisconnectConfirm, isGameScreen]);

  const handleDisconnectCancel = useCallback(
    () => setDisconnectOpen(false),
    [],
  );

  if (!isFirebaseConfigured) {
    return <ServiceUnavailable missingKeys={getMissingFirebaseEnvKeys()} />;
  }

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
            />
          }
        />
      </Routes>
      <AuthDialog
        open={!userId}
        onAnonymousSignIn={authAnonymously}
        onGoogleSignIn={authGoogle}
      />
      <DisconnectDialog
        open={disconnectOpen}
        onCancel={handleDisconnectCancel}
        onConfirm={handleDisconnectConfirm}
      />
    </>
  );
};

export default MultiplayerPage;
