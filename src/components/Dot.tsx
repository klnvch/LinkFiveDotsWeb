import { CSSProperties } from 'react';
import { useAppContext } from '../context/useAppContext';
import { useTheme } from '@mui/material';
import { DotsStyle } from '@klnvch/link-five-dots-shared';

interface DotProps {
  id: 1 | 2;
  style?: CSSProperties | undefined;
}

export const Dot: React.FC<DotProps> = ({ id, style }) => {
  const { dotsStyle } = useAppContext();
  const theme = useTheme();
  const mode = theme.palette.mode;

  switch (true) {
    case id === 1 && dotsStyle === DotsStyle.ORIGINAL && mode === 'light':
      return <img src="/dot/red_dot_light.svg" style={style} />;
    case id === 1 && dotsStyle === DotsStyle.ORIGINAL && mode === 'dark':
      return <img src="/dot/red_dot_dark.svg" style={style} />;
    case id === 2 && dotsStyle === DotsStyle.ORIGINAL && mode === 'light':
      return <img src="/dot/blue_dot_light.svg" style={style} />;
    case id === 2 && dotsStyle === DotsStyle.ORIGINAL && mode === 'dark':
      return <img src="/dot/blue_dot_dark.svg" style={style} />;
    case id === 1 && dotsStyle === DotsStyle.CROSS_AND_RING && mode === 'light':
      return <img src="/dot/red_cross_light.svg" style={style} />;
    case id === 1 && dotsStyle === DotsStyle.CROSS_AND_RING && mode === 'dark':
      return <img src="/dot/red_cross_dark.svg" style={style} />;
    case id === 2 && dotsStyle === DotsStyle.CROSS_AND_RING && mode === 'light':
      return <img src="/dot/blue_circle_light.svg" style={style} />;
    case id === 2 && dotsStyle === DotsStyle.CROSS_AND_RING && mode === 'dark':
      return <img src="/dot/blue_circle_dark.svg" style={style} />;
  }
};
