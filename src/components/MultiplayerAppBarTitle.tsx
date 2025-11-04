import React from 'react';
import { AppBarTitle } from './AppBarTitle';
import { NetworkGameAction } from 'LinkFiveDots-shared';

interface MultiplayerAppBarTitleProps {
  title: NetworkGameAction;
}

export const MultiplayerAppBarTitle: React.FC<MultiplayerAppBarTitleProps> = ({
  title,
}) => {
  let translation: string;

  switch (title) {
    case NetworkGameAction.PICKER_CREATING:
    case NetworkGameAction.PICKER_DELETING:
    case NetworkGameAction.PICKER_CONNECTING:
      translation = 'common.connecting';
      break;
    case NetworkGameAction.PICKER_CREATED:
      translation = 'common.pleaseWait';
      break;
    case NetworkGameAction.PICKER_SCANNING:
      translation = 'common.searching';
      break;
    case NetworkGameAction.GAME_DISCONNECTED:
      translation = 'common.disconnected';
      break;
    case NetworkGameAction.GAME_OVER_WIN:
      translation = 'common.gameOverWin';
      break;
    case NetworkGameAction.GAME_OVER_LOSE:
      translation = 'common.gameOverLose';
      break;
    case NetworkGameAction.GAME_MOVE:
      translation = 'common.gameMove';
      break;
    case NetworkGameAction.GAME_WAIT:
      translation = 'common.gameWait';
      break;
    case NetworkGameAction.DEFAULT:
    default:
      translation = 'common.appName';
      break;
  }

  return <AppBarTitle translation={translation} />;
};
