import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';
import paperDark from '../../../images/paper_dark.png';
import paperLight from '../../../images/paper_light.png';

const StyledContent = styled(Box)<BoxProps>(
  ({
    theme: {
      palette: { mode },
    },
  }) => ({
    backgroundImage: `url(${mode === 'dark' ? paperDark : paperLight})`,
    backgroundRepeat: 'repeat',
  }),
);

export const Content: FC<BoxProps> = (props) => {
  return <StyledContent flexGrow="1" {...props} />;
};
