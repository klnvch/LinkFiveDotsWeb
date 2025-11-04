import React from 'react';
import { GameViewState } from 'LinkFiveDots-shared';
import { AppBarTitle } from './AppBarTitle';

interface SinglePlayerAppBarTitleProps {
  gameViewState: GameViewState | null;
}

export const SinglePlayerAppBarTitle: React.FC<
  SinglePlayerAppBarTitleProps
> = ({ gameViewState }) => {
  let translation: string;
  switch (true) {
    case gameViewState?.infoViewState?.user1?.isWon === true:
      translation = 'common.gameOverWin';
      break;
    case gameViewState?.infoViewState?.user2?.isWon === true:
      translation = 'common.gameOverLose';
      break;
    case gameViewState?.infoViewState?.user1?.canMove === true:
      translation = 'common.gameMove';
      break;
    case gameViewState?.infoViewState?.user2?.canMove === true:
      translation = 'common.gameWait';
      break;
    default:
      translation = 'common.appName';
      break;
  }
  return <AppBarTitle translation={translation} />;
};
