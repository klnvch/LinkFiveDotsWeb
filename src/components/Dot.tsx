import { CSSProperties } from 'react';
import { useAppContext } from '../context/useAppContext';
import { useTheme } from '@mui/material';
import RedDotLight from '../../images/dot/red_dot_light.svg';
import RedDotDark from '../../images/dot/red_dot_dark.svg';
import BlueDotLight from '../../images/dot/blue_dot_light.svg';
import BlueDotDark from '../../images/dot/blue_dot_dark.svg';
import RedCrossLight from '../../images/dot/red_cross_light.svg';
import RedCrossDark from '../../images/dot/red_cross_dark.svg';
import BlueCircleLight from '../../images/dot/blue_circle_light.svg';
import BlueCircleDark from '../../images/dot/blue_circle_dark.svg';
import { DotsStyleType } from 'LinkFiveDots-shared';

interface DotProps {
  id: 1 | 2;
  style?: CSSProperties | undefined;
}

export const Dot: React.FC<DotProps> = ({ id, style }) => {
  const { dotsStyleType: type } = useAppContext();
  const theme = useTheme();
  const mode = theme.palette.mode;

  switch (true) {
    case id === 1 && type === DotsStyleType.ORIGINAL && mode === 'light':
      return <img src={RedDotLight} style={style} />;
    case id === 1 && type === DotsStyleType.ORIGINAL && mode === 'dark':
      return <img src={RedDotDark} style={style} />;
    case id === 2 && type === DotsStyleType.ORIGINAL && mode === 'light':
      return <img src={BlueDotLight} style={style} />;
    case id === 2 && type === DotsStyleType.ORIGINAL && mode === 'dark':
      return <img src={BlueDotDark} style={style} />;
    case id === 1 && type === DotsStyleType.CROSS_AND_RING && mode === 'light':
      return <img src={RedCrossLight} style={style} />;
    case id === 1 && type === DotsStyleType.CROSS_AND_RING && mode === 'dark':
      return <img src={RedCrossDark} style={style} />;
    case id === 2 && type === DotsStyleType.CROSS_AND_RING && mode === 'light':
      return <img src={BlueCircleLight} style={style} />;
    case id === 2 && type === DotsStyleType.CROSS_AND_RING && mode === 'dark':
      return <img src={BlueCircleDark} style={style} />;
  }
};
