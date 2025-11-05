import React, { useState, useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/useAppContext';
import { formatUserName } from 'LinkFiveDots-shared';

export type UserNameSettingDialogProps = {
  open: boolean;
  onDone: () => void;
};

export const UserNameSettingDialog: React.FC<UserNameSettingDialogProps> = ({
  open,
  onDone,
}) => {
  const { t } = useTranslation();
  const { userName, setUserName } = useAppContext();
  const [nameInput, setNameInput] = useState<string | null>(userName);

  // Initialize nameInput when dialog opens
  const initializeInput = useCallback(() => {
    setNameInput(userName);
  }, [userName]);

  // Update nameInput when dialog opens
  React.useEffect(() => {
    if (open) {
      initializeInput();
    }
  }, [open, initializeInput]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUserName(e.target.value);
    setNameInput(formatted ?? null);
  }, []);

  const handleSave = useCallback(() => {
    setUserName(nameInput);
    onDone();
  }, [nameInput, setUserName, onDone]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  }, [handleSave]);

  // Memoize dialog props to prevent unnecessary re-renders
  const dialogProps = useMemo(() => ({
    open,
    onClose: onDone,
    maxWidth: 'xs' as const,
    fullWidth: true,
    'aria-labelledby': 'user-name-dialog-title',
  }), [open, onDone]);

  const textFieldProps = useMemo(() => ({
    fullWidth: true,
    value: nameInput ?? '',
    onChange: handleInputChange,
    onKeyPress: handleKeyPress,
    placeholder: t('room.unknownUser'),
    variant: 'outlined' as const,
    margin: 'normal' as const,
    autoFocus: true,
    inputProps: {
      'aria-describedby': 'user-name-dialog-description',
    },
  }), [nameInput, handleInputChange, handleKeyPress, t]);

  return (
    <Dialog {...dialogProps}>
      <DialogTitle id="user-name-dialog-title">
        {t('room.name')}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField {...textFieldProps} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
          aria-label={t('common.ok')}
        >
          {t('common.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserNameSettingDialog;
