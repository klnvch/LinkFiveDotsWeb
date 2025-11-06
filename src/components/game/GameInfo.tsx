import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {
  formatDuration,
  GameInfoUserViewState,
  GameInfoViewState,
} from '@klnvch/link-five-dots-shared';
import { Dot } from '../Dot';
import { useColors } from '../../hooks/useColors';

function argbToHtmlColor(argbInt: number) {
  // Ensure the input is a 32-bit signed integer
  argbInt = argbInt | 0;

  // Extract the individual color components using bitwise operations
  // Alpha is in the highest 8 bits, Red in the next 8, Green, then Blue
  const red = (argbInt >> 16) & 0xff;
  const green = (argbInt >> 8) & 0xff;
  const blue = argbInt & 0xff;

  // Convert each component to a two-digit hexadecimal string
  const rHex = red.toString(16).padStart(2, '0');
  const gHex = green.toString(16).padStart(2, '0');
  const bHex = blue.toString(16).padStart(2, '0');

  // Concatenate them to form the HTML color string
  return `#${rHex}${gHex}${bHex}`;
}

interface UserProps {
  user: GameInfoUserViewState;
}

const UserName: React.FC<UserProps> = ({ user: { name, canMove, isWon } }) => {
  const selected = canMove || isWon;
  return (
    <Typography variant={'h5'} fontWeight={selected ? 'bold' : 'normal'}>
      {name}
    </Typography>
  );
};

const UserDuration: React.FC<UserProps> = ({
  user: { duration, time, canMove, isWon },
}) => {
  const selected = canMove || isWon;

  const [nowSec, setNowSec] = React.useState<number>(() =>
    Math.floor(Date.now() / 1000),
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setNowSec(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const elapsedTime = time ? nowSec - time : 0;
  const totalDuration = duration + elapsedTime;

  return (
    <Typography variant={'h5'} fontWeight={selected ? 'bold' : 'normal'}>
      {formatDuration(totalDuration)}
    </Typography>
  );
};

interface UserDotProps {
  user: GameInfoUserViewState;
  color: number;
  id: 1 | 2;
}

const UserDot: React.FC<UserDotProps> = ({ user: { isWon }, color, id }) => {
  const htmlColor = argbToHtmlColor(color);
  if (isWon) {
    return <StarIcon fontSize="medium" htmlColor={htmlColor} />;
  } else {
    return <Dot id={id} style={{ justifySelf: 'center' }} />;
  }
};

interface GameInfoProps {
  uiState: GameInfoViewState;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  uiState: { size, user1, user2 },
}) => {
  const { user1Color, user2Color } = useColors();
  return (
    <Box display="flex" alignItems="flex-start" justifyContent="space-between">
      {/* Size in top left */}
      <Paper elevation={1} sx={{ p: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {size}
        </Typography>
      </Paper>

      {/* User details in top right */}
      <Paper elevation={1} sx={{ p: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <UserDuration user={user1} />
          <UserDot user={user1} color={user1Color} id={1} />
          <UserName user={user1} />
          <UserDuration user={user2} />
          <UserDot user={user2} color={user2Color} id={2} />
          <UserName user={user2} />
        </Box>
      </Paper>
    </Box>
  );
};
