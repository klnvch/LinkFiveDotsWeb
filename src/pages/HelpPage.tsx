import { AppBar, Toolbar, Container, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBarTitle } from '../components/AppBarTitle';
import { BackButton } from '../components/BackButton';
import { Content } from '../components/layout/Content';
import { Page } from '../components/layout/Page';
import { useTranslation } from 'react-i18next';

const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <Page>
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar>
          <BackButton onClick={handleBack} />
          <AppBarTitle translation="help.title" />
        </Toolbar>
      </AppBar>
      <Content>
        <Container maxWidth="sm">
          <div style={{ padding: 24, maxWidth: 700, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
              {t('help.mainTitle')}
            </Typography>
            <Typography sx={{ mb: 2 }}>{t('help.intro')}</Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {t('help.rulesTitle')}
            </Typography>
            <ul>
              {(t('help.rules', { returnObjects: true }) as string[]).map(
                (rule, idx) => (
                  <li key={idx}>{rule}</li>
                ),
              )}
            </ul>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {t('help.modesTitle')}
            </Typography>
            <ul>
              <li>{t('help.singlePlayer')}</li>
              <li>{t('help.multiPlayer')}</li>
            </ul>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {t('help.howToTitle')}
            </Typography>
            <ul>
              {(t('help.howToList', { returnObjects: true }) as string[]).map(
                (item, idx) => (
                  <li key={idx}>{item}</li>
                ),
              )}
            </ul>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {t('help.tipsTitle')}
            </Typography>
            <ul>
              {(t('help.tips', { returnObjects: true }) as string[]).map(
                (tip, idx) => (
                  <li key={idx}>{tip}</li>
                ),
              )}
            </ul>
          </div>
        </Container>
      </Content>
    </Page>
  );
};

export default HelpPage;
