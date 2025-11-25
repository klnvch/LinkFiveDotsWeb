import React from 'react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UndoIcon from '@mui/icons-material/Undo';
import { MenuViewState } from '@klnvch/link-five-dots-shared';
import { useTranslation } from 'react-i18next';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <Button
      variant="text"
      startIcon={icon}
      onClick={onClick}
      sx={{
        color: 'primary.main',
        borderColor: 'primary.main',
        fontWeight: 'bold',
        '&:hover': {
          borderColor: 'primary.dark',
          backgroundColor: 'rgba(0, 104, 116, 0.04)',
        },
      }}
    >
      {label}
    </Button>
  );
};

interface GameNextActionProps {
  uiState: MenuViewState;
  isVisible: boolean;
  onNew: () => void;
  onUndo?: () => void;
}

export const GameNextAction: React.FC<GameNextActionProps> = ({
  uiState: { newOption, undoOption },
  isVisible,
  onNew,
  onUndo,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
        padding: 2,
        boxShadow: 3,
      }}
    >
      <>
        {isVisible && newOption.isEnabled && (
          <ActionButton
            icon={<AddIcon />}
            label={t('options.new')}
            onClick={onNew}
          />
        )}
        {undoOption.isEnabled && onUndo && (
          <ActionButton
            icon={<UndoIcon />}
            label={t('options.undo')}
            onClick={onUndo}
          />
        )}
      </>
    </Box>
  );
};
