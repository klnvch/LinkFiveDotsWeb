import { ConnectException, PickerCommonViewState } from 'LinkFiveDots-shared';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface PickerCommonPartProps {
  uiState: PickerCommonViewState;
}

export const PickerCommonPart: React.FC<PickerCommonPartProps> = ({
  uiState: { inProgress, error },
}) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        px: 2,
      }}
    >
      {inProgress && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
          <LinearProgress sx={{ height: 4 }} />
        </Box>
      )}
      {error instanceof ConnectException && (
        <Typography color="error" sx={{ zIndex: 1 }}>
          {t('room.failedToConnect', { name: error.target })}
        </Typography>
      )}
    </Box>
  );
};
