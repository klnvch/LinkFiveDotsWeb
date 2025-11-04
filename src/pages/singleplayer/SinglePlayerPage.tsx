import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GamePage } from '../GamePage';
import { useRooms } from '../../hooks/singleplayer/useRooms';
import { SinglePlayerAppBarTitle } from '../../components/SinglePlayerAppBarTitle';

export const SinglePlayerPage: React.FC = () => {
  const { gameViewState, newGame, addDot, undo } = useRooms();
  const navigate = useNavigate();

  const handleCloseGame = () => {
    navigate(-1);
  };

  return (
    <GamePage
      uiState={gameViewState}
      title={<SinglePlayerAppBarTitle gameViewState={gameViewState} />}
      onMoveDone={addDot}
      onClose={handleCloseGame}
      onNew={newGame}
      onUndo={undo}
    />
  );
};
