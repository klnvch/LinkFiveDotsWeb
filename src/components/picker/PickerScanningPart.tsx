import {
  FoundRemoteRoom,
  PickerItemViewState,
  PickerScanningViewState,
} from 'LinkFiveDots-shared';
import {
  Button,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PickerScanningPartProps {
  uiState: PickerScanningViewState;
  onScanStart: () => void;
  onScanStop: () => void;
  onRoomClick: (invitation: FoundRemoteRoom) => void;
}

export const PickerScanningPart: React.FC<PickerScanningPartProps> = ({
  uiState: {
    isEnabled,
    isStartScanButtonVisible,
    isCancelScanButtonVisible,
    discoveredItems,
    isEmptyMessageVisible,
  },
  onScanStart,
  onScanStop,
  onRoomClick,
}) => {
  const { t } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<PickerItemViewState | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleItemClick = (room: PickerItemViewState) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRoom(null);
  };

  const handleDialogConfirm = () => {
    if (selectedRoom) {
      onRoomClick(selectedRoom.descriptor);
    }
    setDialogOpen(false);
    setSelectedRoom(null);
  };

  return (
    <Stack spacing={2} alignItems="stretch" sx={{ width: '100%', p: 2 }}>
      {isStartScanButtonVisible && (
        <Button
          variant="contained"
          color="primary"
          onClick={onScanStart}
          disabled={!isEnabled}
        >
          {t('common.scan')}
        </Button>
      )}
      {isCancelScanButtonVisible && (
        <Button
          variant="contained"
          color="primary"
          onClick={onScanStop}
          disabled={!isEnabled}
        >
          {t('common.cancel')}
        </Button>
      )}
      <List>
        {discoveredItems.map((item) => (
          <Paper key={item.id} elevation={1} sx={{ margin: 1 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleItemClick(item)}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: '100%' }}
                >
                  {item.longName.map((s) => (
                    <Typography key={s}>{s}</Typography>
                  ))}
                </Stack>
              </ListItemButton>
            </ListItem>
          </Paper>
        ))}
      </List>
      {isEmptyMessageVisible && (
        <Typography align="center" color="text.secondary">
          {t('common.noRooms')}
        </Typography>
      )}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <DialogContentText>
            {t('room.connectionDialogText', {
              name: selectedRoom?.shortName,
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>{t('common.cancel')}</Button>
          <Button onClick={handleDialogConfirm} autoFocus>
            {t('common.ok')}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
