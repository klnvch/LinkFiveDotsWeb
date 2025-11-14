import React from 'react';
import { Box, AppBar, Toolbar } from '@mui/material';
import { GameInfo } from '../components/game/GameInfo';
import { GameBoard } from '../components/game/board/GameBoard';
import { AppBarActions } from '../components/game/AppBarActions';
import { GameNextAction } from '../components/game/GameNextAction';
import { GameViewState, Point } from '@klnvch/link-five-dots-shared';
import { Page } from '../components/layout/Page';
import { Content } from '../components/layout/Content';
import { BackButton } from '../components/BackButton';

interface GamePageProps {
  uiState: GameViewState | null;
  title: React.ReactNode;
  onMoveDone: (p: Point) => void;
  onClose: () => void;
  onNew: () => void;
  onUndo: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({
  uiState,
  title,
  onMoveDone,
  onClose,
  onNew,
  onUndo,
}) => {
  if (!uiState) return;

  const { infoViewState, boardViewState, menuViewState, isOver } = uiState;

  return (
    <Page>
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar>
          <BackButton onClick={onClose} />
          {title}
          <AppBarActions
            uiState={menuViewState}
            onNew={onNew}
            onUndo={onUndo}
          />
        </Toolbar>
      </AppBar>
      <Content>
        <Box position="absolute" width="100%" padding="8px" zIndex="2">
          <GameInfo uiState={infoViewState} />
        </Box>
        <GameBoard uiState={boardViewState} onMoveDone={onMoveDone} />
      </Content>
      <Box sx={{ height: 80 }}>
        <GameNextAction
          uiState={menuViewState}
          isVisible={isOver}
          onNew={onNew}
          onUndo={onUndo}
        />
      </Box>
    </Page>
  );
};
