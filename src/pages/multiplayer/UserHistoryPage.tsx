import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../components/layout/Page';
import {
  AppBar,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { BackButton } from '../../components/BackButton';
import { Content } from '../../components/layout/Content';
import { AppBarTitle } from '../../components/AppBarTitle';
import { useUserHistory } from '../../hooks/multiplayer/useUserHistory';
import { useTranslation } from 'react-i18next';
import StatusIcon from '../../components/history/StatusIcon';

interface UserHistoryProps {}

const UserHistoryPage: React.FC<UserHistoryProps> = () => {
  const navigate = useNavigate();
  const handleBack = useCallback(() => navigate(-1), [navigate]);
  const { loading, history } = useUserHistory();
  const { t } = useTranslation();

  return (
    <Page>
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar>
          <BackButton onClick={handleBack} />
          <AppBarTitle translation="history.title" />
        </Toolbar>
      </AppBar>
      <Content>
        <Container maxWidth="sm">
          {loading ? (
            // 1️⃣ Loading state
            <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
          ) : !history?.length ? (
            // 2️⃣ Empty state
            <Typography variant="body1" align="center" color="text.secondary">
              {t('history.noResult')}
            </Typography>
          ) : (
            // 3️⃣ Ready – show list of items
            <List disablePadding>
              {history.map((item) => (
                <ListItem key={item.timeText} sx={{ mb: 1, p: 0 }}>
                  <StatusIcon status={item.status} />
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="medium">
                        {`${item.user1Name} vs ${item.user2Name}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {`${t('settings_dots')}: ${item.sizeText}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${t('time')}: ${item.timeText}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {`${t('duration')}: ${item.durationText}`}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Container>
      </Content>
    </Page>
  );
};

export default UserHistoryPage;
