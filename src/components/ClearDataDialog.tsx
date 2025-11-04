import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ClearDataDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ClearDataDialog: React.FC<ClearDataDialogProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{t('settings.main_clear_confirm_title')}</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>{t('common.cancel')}</Button>
        <Button onClick={onConfirm} autoFocus color="error" variant="contained">
          {t('common.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
