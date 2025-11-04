import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface AppBarTitleProps {
  translation?: string;
}

export const AppBarTitle: React.FC<AppBarTitleProps> = ({
  translation = 'common.appName',
}) => {
  const { t } = useTranslation();

  return (
    <Typography
      variant="h6"
      component="div"
      textAlign="center"
      sx={{
        flexGrow: 1,
        display: 'block',
        color: 'primary.main',
      }}
    >
      {t(translation)}
    </Typography>
  );
};
