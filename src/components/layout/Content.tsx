import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

const StyledContent = styled(Box)<BoxProps>(
  ({
    theme: {
      palette: { mode },
    },
  }) => ({
    backgroundImage:
      mode === 'dark'
        ? 'url(/images/paper_dark.png)'
        : 'url(/images/paper_light.png)',
    backgroundRepeat: 'repeat',
  }),
);

export const Content: FC<BoxProps> = (props) => {
  return <StyledContent flexGrow="1" {...props} />;
};
