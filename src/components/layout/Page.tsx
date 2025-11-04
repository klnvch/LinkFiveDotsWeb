import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

export const Page: FC<BoxProps> = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      overflow="hidden"
      {...props}
    />
  );
};
