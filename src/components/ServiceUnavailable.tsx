import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Props = {
  missingKeys?: string[];
};

export function ServiceUnavailable({ missingKeys }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDev = import.meta.env.DEV;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        p: 2,
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          {t('serviceUnavailable.title')}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {t('serviceUnavailable.description')}
        </Typography>
        {isDev && missingKeys && missingKeys.length > 0 ? (
          <>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {t('serviceUnavailable.missingEnv')}
            </Typography>
            <Typography
              component="pre"
              sx={{
                textAlign: 'left',
                p: 1,
                bgcolor: 'action.hover',
                borderRadius: 1,
              }}
            >
              {missingKeys.join('\n')}
            </Typography>
          </>
        ) : null}
        <Button
          onClick={() => navigate('/', { replace: true })}
          sx={{ mt: 2 }}
          variant="contained"
        >
          {t('common.ok')}
        </Button>
      </Box>
    </Box>
  );
}
