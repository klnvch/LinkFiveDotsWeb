import { OnlineGameShortInfoStatus } from '@klnvch/link-five-dots-shared';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CancelIcon from '@mui/icons-material/Cancel';
import BalanceIcon from '@mui/icons-material/Balance';
import PendingIcon from '@mui/icons-material/Pending';
import { useTranslation } from 'react-i18next';

interface StatusIconProps {
  status: OnlineGameShortInfoStatus;
}

/**
 * Renders a small icon that represents the game result.
 */
const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  // Map each status to an icon, color and tooltip text
  const map = {
    [OnlineGameShortInfoStatus.Won.name]: {
      icon: <EmojiEventsIcon />,
      color: theme.palette.success.main,
      label: t('history.status.won'),
    },
    [OnlineGameShortInfoStatus.Lost.name]: {
      icon: <CancelIcon />,
      color: theme.palette.error.main,
      label: t('history.status.lost'),
    },
    [OnlineGameShortInfoStatus.Draw.name]: {
      icon: <BalanceIcon />,
      color: theme.palette.info?.main,
      label: t('history.status.draw'),
    },
    [OnlineGameShortInfoStatus.InProgress.name]: {
      icon: <PendingIcon />,
      color: theme.palette.warning.main,
      label: t('history.status.inProgress'),
    },
  } as const;

  const { icon, color, label } = map[status.name];

  return (
    <Tooltip title={label}>
      <IconButton sx={{ color }}>{icon}</IconButton>
    </Tooltip>
  );
};

export default StatusIcon;
