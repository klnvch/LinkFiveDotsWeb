import { OnlineGameShortInfoStatus } from '@klnvch/link-five-dots-shared';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import TimerIcon from '@mui/icons-material/Timer';

interface StatusIconProps {
  status: OnlineGameShortInfoStatus;
}

/**
 * Renders a small icon that represents the game result.
 */
const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const theme = useTheme();

  // Map each status to an icon, color and tooltip text
  const map = {
    [OnlineGameShortInfoStatus.Won.name]: {
      icon: <EmojiEventsIcon />,
      color: theme.palette.primary.main,
      label: 'Won',
    },
    [OnlineGameShortInfoStatus.Lost.name]: {
      icon: <CloseIcon />,
      color: theme.palette.error.main,
      label: 'Lost',
    },
    [OnlineGameShortInfoStatus.Draw.name]: {
      icon: <RemoveIcon />,
      color: theme.palette.info?.main,
      label: 'Draw',
    },
    [OnlineGameShortInfoStatus.InProgress.name]: {
      icon: <TimerIcon />,
      color: theme.palette.secondary.main,
      label: 'In‑Progress',
    },
  } as const;

  const { icon, color, label } = map[status.name];

  return (
    <Tooltip title={label}>
      <IconButton sx={{ color, p: 0.5 }}>{icon}</IconButton>
    </Tooltip>
  );
};

export default StatusIcon;
