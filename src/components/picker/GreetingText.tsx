import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import { UserNameSettingDialog } from '../UserNameSettingDialog';

export const GreetingText: React.FC = () => {
  const { userName } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" component="div">
        {t('common.greetings', {
          name: userName?.trim() || t('room.unknownUser'),
        })}
      </Typography>
      <IconButton
        aria-label="edit-name"
        size="small"
        sx={{ ml: 1 }}
        onClick={openDialog}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <UserNameSettingDialog open={isOpen} onDone={closeDialog} />
    </Box>
  );
};
