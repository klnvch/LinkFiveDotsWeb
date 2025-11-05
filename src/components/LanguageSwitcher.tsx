import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem, Typography } from '@mui/material';
import { languages } from '../constants/languages';

export type LanguageSwitcherProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  anchorEl,
  onClose,
}) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {languages.map((language) => (
        <MenuItem
          key={language.code}
          onClick={() => handleLanguageChange(language.code)}
          selected={(i18n.language || '').startsWith(language.code)}
        >
          <Typography variant="body1">{language.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
