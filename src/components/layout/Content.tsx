import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

const StyledContent = styled(Box)<BoxProps>(
  ({
    theme: {
      palette: { mode },
    },
  }) => ({
    backgroundImage: `url(${
      mode === 'dark' ? '/paper_dark.png' : '/paper_light.png'
    })`,
    backgroundRepeat: 'repeat',
    display: 'flex',
  }),
);

export const Content: FC<BoxProps> = (props) => {
  return <StyledContent flexGrow="1" {...props} />;
};
