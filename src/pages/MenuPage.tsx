import React, { useMemo } from 'react';
import { AppBar, Toolbar, Container, Button, Stack, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AndroidIcon from '@mui/icons-material/Android';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import { GreetingText } from '../components/picker/GreetingText';
import { AppBarTitle } from '../components/AppBarTitle';
import { Page } from '../components/layout/Page';
import { Content } from '../components/layout/Content';

// Reusable Menu Button Component
interface MenuButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'text';
  fullWidth?: boolean;
  'aria-label'?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  onClick,
  children,
  size = 'large',
  variant = 'contained',
  fullWidth = true,
  'aria-label': ariaLabel,
}) => (
  <Button
    variant={variant}
    color="primary"
    size={size}
    fullWidth={fullWidth}
    onClick={onClick}
    aria-label={ariaLabel}
    sx={{ whiteSpace: 'nowrap' }}
  >
    {children}
  </Button>
);

// Game Mode Button Component
interface GameModeButtonProps {
  onClick: () => void;
  label: string;
  icons: React.ReactNode;
  'aria-label'?: string;
}

const GameModeButton: React.FC<GameModeButtonProps> = ({
  onClick,
  label,
  icons,
  'aria-label': ariaLabel,
}) => (
  <MenuButton onClick={onClick} aria-label={ariaLabel}>
    <Stack direction="column" alignItems="center" sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center">
        {icons}
      </Stack>
      {label}
    </Stack>
  </MenuButton>
);

// Icon Button Component
interface IconMenuButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  'aria-label': string;
}

const IconMenuButton: React.FC<IconMenuButtonProps> = ({
  onClick,
  icon,
  'aria-label': ariaLabel,
}) => (
  <MenuButton onClick={onClick} aria-label={ariaLabel}>
    {icon}
  </MenuButton>
);

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Memoize navigation handlers to prevent unnecessary re-renders
  const navigationHandlers = useMemo(
    () => ({
      multiplayer: () => navigate('/multiplayer'),
      singleplayer: () => navigate('/singleplayer/game'),
      settings: () => navigate('/settings'),
      info: () => navigate('/info'),
      help: () => navigate('/help'),
    }),
    [navigate],
  );

  // Memoize icon components to prevent unnecessary re-renders
  const singleplayerIcons = useMemo(
    () => (
      <>
        <PersonIcon sx={{ m: 1 }} />
        <span style={{ margin: '0 4px' }}>×</span>
        <AndroidIcon sx={{ m: 1 }} />
      </>
    ),
    [],
  );

  const multiplayerIcons = useMemo(
    () => (
      <>
        <PersonIcon sx={{ m: 1 }} />
        <span style={{ margin: '0 4px' }}>×</span>
        <PersonIcon sx={{ m: 1 }} />
      </>
    ),
    [],
  );

  return (
    <Page>
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar>
          <AppBarTitle />
        </Toolbar>
      </AppBar>
      <Content>
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={3}>
            <Grid size={12}>
              <GreetingText />
            </Grid>

            {/* Game Mode Buttons */}
            <Grid size={6}>
              <GameModeButton
                onClick={navigationHandlers.singleplayer}
                label={t('common.singleplayer')}
                icons={singleplayerIcons}
                aria-label={`${t(
                  'common.singleplayer',
                )} - Play against computer`}
              />
            </Grid>
            <Grid size={6}>
              <GameModeButton
                onClick={navigationHandlers.multiplayer}
                label={t('common.multiplayer')}
                icons={multiplayerIcons}
                aria-label={`${t('common.multiplayer')} - Play with friends`}
              />
            </Grid>

            {/* Action Buttons */}
            <Grid size={4}>
              <IconMenuButton
                onClick={navigationHandlers.settings}
                icon={<SettingsIcon />}
                aria-label={`${t('common.settings')} - Configure app settings`}
              />
            </Grid>
            <Grid size={4}>
              <IconMenuButton
                onClick={navigationHandlers.info}
                icon={<InfoIcon />}
                aria-label="App information"
              />
            </Grid>
            <Grid size={4}>
              <IconMenuButton
                onClick={navigationHandlers.help}
                icon={<HelpIcon />}
                aria-label="Help and instructions"
              />
            </Grid>
          </Grid>
        </Container>
      </Content>
    </Page>
  );
};

export default MenuPage;
