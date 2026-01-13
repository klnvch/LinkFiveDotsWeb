import { Box, Paper, Stack, Typography } from '@mui/material';
import StatusIcon from '../../components/history/StatusIcon';
import { useTranslation } from 'react-i18next';
import { OnlineGameShortInfoStatus } from '@klnvch/link-five-dots-shared';

interface HistoryItem {
  timeText: string;
  status: OnlineGameShortInfoStatus;
  user1Name: string;
  user2Name: string;
  sizeText: string;
  durationText: string;
}

export const HistoryItemCard: React.FC<{ item: HistoryItem }> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1,
      }}
    >
      <Box sx={{ px: 2 }}>
        <StatusIcon status={item.status} />
      </Box>
      <Stack>
        <Typography variant="subtitle1" fontWeight="medium">
          {`${item.user1Name} vs ${item.user2Name}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${t('history.dots')}: ${item.sizeText}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${t('history.time')}: ${item.timeText}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${t('history.duration')}: ${item.durationText}`}
        </Typography>
      </Stack>
    </Paper>
  );
};
