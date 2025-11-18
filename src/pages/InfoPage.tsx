import React, { useCallback, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Typography,
  Container,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Page } from '../components/layout/Page';
import { Content } from '../components/layout/Content';
import { AppBarTitle } from '../components/AppBarTitle';
import { BackButton } from '../components/BackButton';

const APP_ICON = '/ic_launcher_big.png';
const GITHUB_URL = 'https://github.com/klnvch/LinkFiveDotsWeb';

export const InfoPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const appName = t('common.appName');

  const handleBack = useCallback(() => navigate(-1), [navigate]);

  const actions = useMemo(
    () => [
      {
        key: 'github',
        icon: <GitHubIcon />,
        label: t('info.github'),
        onClick: () => window.open(GITHUB_URL, '_blank', 'noopener,noreferrer'),
      },
      {
        key: 'email',
        icon: <EmailIcon />,
        label: t('info.email'),
        onClick: () => {
          const subject = encodeURIComponent(appName);
          const body = encodeURIComponent('Hello!');
          window.location.href = `mailto:link5dots@gmail.com?subject=${subject}&body=${body}`;
        },
      },
      {
        key: 'share',
        icon: <ShareIcon />,
        label: t('info.share'),
        onClick: async () => {
          const data = {
            title: appName,
            url: window.location.origin,
          };
          console.log(JSON.stringify(data.url));
          if (navigator.share) {
            try {
              await navigator.share(data);
            } catch (e: unknown) {
              console.log(e);
            }
          } else {
            await navigator.clipboard.writeText(data.url);
            alert(t('info.copied'));
          }
        },
      },
    ],
    [appName, t],
  );

  return (
    <Page>
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar>
          <BackButton onClick={handleBack} />
          <AppBarTitle translation="info.title" />
        </Toolbar>
      </AppBar>
      <Content>
        <Container maxWidth="sm">
          <Stack alignItems="center" spacing={4} sx={{ py: 6 }}>
            <img
              src={APP_ICON}
              width={96}
              height={96}
              alt="App icon"
              style={{ borderRadius: 16 }}
            />
            <Typography variant="subtitle1" color="text.secondary">
              {t('info.version', { version: __APP_VERSION__ })}
            </Typography>

            <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 560 }}>
              {actions.map(({ key, icon, label, onClick }) => (
                <Button
                  key={key}
                  variant="outlined"
                  startIcon={icon}
                  fullWidth
                  onClick={onClick}
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  <Typography fontWeight={700}>{label}</Typography>
                </Button>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Content>
    </Page>
  );
};

export default InfoPage;
