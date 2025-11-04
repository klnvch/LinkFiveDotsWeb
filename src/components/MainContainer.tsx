import { Container, styled } from '@mui/material';

export const MainContainer = styled(Container)(
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
