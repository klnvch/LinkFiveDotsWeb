import React, { useCallback, useMemo, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Stack,
  Button,
  Typography,
  useColorScheme,
  Container,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GrainIcon from '@mui/icons-material/Grain';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { AppBarTitle } from '../components/AppBarTitle';
import UserNameSettingDialog from '../components/UserNameSettingDialog';
import { ClearDataDialog } from '../components/ClearDataDialog';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { DotsStyleType } from 'LinkFiveDots-shared';
import { Page } from '../components/layout/Page';
import { Content } from '../components/layout/Content';
import { BackButton } from '../components/BackButton';
import { Dot } from '../components/Dot';
import { useDeleteAll } from '../hooks/useDeleteAll';

const switchDotStyle = (style: DotsStyleType): DotsStyleType => {
  switch (style) {
    case DotsStyleType.ORIGINAL:
      return DotsStyleType.CROSS_AND_RING;
    default:
      return DotsStyleType.ORIGINAL;
  }
};

const switchNightMode = (
  mode: 'light' | 'dark' | 'system' | undefined,
): 'light' | 'dark' | 'system' => {
  switch (mode) {
    case 'dark':
      return 'system';
    case 'light':
      return 'dark';
    case 'system':
    default:
      return 'light';
  }
};

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userName, dotsStyleType, setDotsStyleType } = useAppContext();
  const { mode, setMode } = useColorScheme();
  const { t } = useTranslation();
  const deleteAll = useDeleteAll();

  const [isNameSettingOpen, setIsNameSettingOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [lngAnchor, setLngAnchor] = useState<null | HTMLElement>(null);

  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const openUsernameDialog = useCallback(() => setIsNameSettingOpen(true), []);
  const hideUsernameDialog = useCallback(() => setIsNameSettingOpen(false), []);
  const openClearDialog = useCallback(() => setIsClearDialogOpen(true), []);
  const hideClearDialog = useCallback(() => setIsClearDialogOpen(false), []);

  const openLanguageMenu = useCallback(
    ({ currentTarget }: React.MouseEvent<HTMLElement>) =>
      setLngAnchor(currentTarget),
    [],
  );
  const hideLanguageMenu = useCallback(() => setLngAnchor(null), []);

  const changeNightMode = useCallback(
    () => setMode(switchNightMode(mode)),
    [mode, setMode],
  );

  const changeDotStyle = useCallback(
    () => setDotsStyleType(switchDotStyle(dotsStyleType)),
    [dotsStyleType, setDotsStyleType],
  );

  const confirmClearData = useCallback(() => {
    deleteAll();
    setIsClearDialogOpen(false);
  }, [deleteAll]);

  const dotsPreview = useMemo(
    () => (
      <>
        <Dot id={1} />
        <Dot id={2} />
      </>
    ),
    [],
  );

  return (
    <Page>
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar>
          <BackButton onClick={handleBack} />
          <AppBarTitle translation="common.settings" />
        </Toolbar>
      </AppBar>
      <Content>
        <Container maxWidth="sm">
          <Stack spacing={1.5} sx={{ m: 2 }}>
            <Button
              variant="outlined"
              startIcon={<PersonIcon />}
              fullWidth
              onClick={openUsernameDialog}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '100%' }}
              >
                <Typography fontWeight={700}>{t('room.name')}</Typography>
                <Typography
                  color="text.secondary"
                  sx={{ textTransform: 'none' }}
                >
                  {userName ?? t('room.unknownUser')}
                </Typography>
              </Stack>
            </Button>
            <Button
              variant="outlined"
              startIcon={<LanguageIcon />}
              fullWidth
              onClick={openLanguageMenu}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '100%' }}
              >
                <Typography fontWeight={700}>
                  {t('settings.language')}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ textTransform: 'none' }}
                >
                  {t('settings.languageName')}
                </Typography>
              </Stack>
            </Button>
            <LanguageSwitcher anchorEl={lngAnchor} onClose={hideLanguageMenu} />
            <Button
              variant="outlined"
              startIcon={<DarkModeIcon />}
              onClick={changeNightMode}
              fullWidth
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '100%' }}
              >
                <Typography fontWeight={700}>
                  {t('common.nightMode')}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ textTransform: 'none' }}
                >
                  {t(`common.nightModeOption.${mode}`)}
                </Typography>
              </Stack>
            </Button>
            <Button
              variant="outlined"
              startIcon={<GrainIcon />}
              onClick={changeDotStyle}
              fullWidth
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '100%' }}
              >
                <Typography fontWeight={700}>{t('common.dots')}</Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                  }}
                >
                  {dotsPreview}
                </Typography>
              </Stack>
            </Button>
            <Button
              color="error"
              variant="outlined"
              startIcon={<DeleteForeverIcon />}
              fullWidth
              onClick={openClearDialog}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              <Typography fontWeight={700}>
                {t('settings.main_clear_title')}
              </Typography>
            </Button>
          </Stack>
        </Container>
      </Content>
      <UserNameSettingDialog
        open={isNameSettingOpen}
        onDone={hideUsernameDialog}
      />
      <ClearDataDialog
        open={isClearDialogOpen}
        onConfirm={confirmClearData}
        onCancel={hideClearDialog}
      />
    </Page>
  );
};

export default SettingsPage;
