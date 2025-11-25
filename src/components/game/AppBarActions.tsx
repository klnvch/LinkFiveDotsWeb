import React, { useCallback, useMemo, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MenuViewState } from '@klnvch/link-five-dots-shared';
import { useTranslation } from 'react-i18next';

interface AppBarActionsProps {
  uiState: MenuViewState;
  onNew: () => void;
  onUndo?: () => void;
}

export const AppBarActions: React.FC<AppBarActionsProps> = ({
  uiState: { newOption, undoOption },
  onNew,
  onUndo,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget),
    [],
  );

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleNew = useCallback(() => {
    onNew();
    handleClose();
  }, [handleClose, onNew]);

  const handleUndo = useCallback(() => {
    onUndo?.();
    handleClose();
  }, [handleClose, onUndo]);

  const isUndoVisible = useMemo(
    () => undoOption.isVisible && onUndo,
    [onUndo, undoOption.isVisible],
  );

  if (!newOption.isVisible && !isUndoVisible) return null;

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleClick}
        aria-label="more"
        aria-controls={anchorEl ? 'game-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="game-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {newOption.isVisible && (
          <MenuItem onClick={handleNew} disabled={!newOption.isEnabled}>
            {t('options.new')}
          </MenuItem>
        )}
        {isUndoVisible && (
          <MenuItem onClick={handleUndo} disabled={!undoOption.isEnabled}>
            {t('options.undo')}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
