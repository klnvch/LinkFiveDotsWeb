import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DisconnectDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DisconnectDialog: React.FC<DisconnectDialogProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogContent>
        <DialogContentText>{t('room.disconnectDialogText')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{t('common.cancel')}</Button>
        <Button onClick={onConfirm} autoFocus>
          {t('common.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
