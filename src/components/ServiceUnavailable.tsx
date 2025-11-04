import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

type Props = {
  missingKeys?: string[];
};

export function ServiceUnavailable({ missingKeys }: Props) {
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
          Service unavailable
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          The application is temporarily unavailable. Please try again later.
        </Typography>
        {isDev && missingKeys && missingKeys.length > 0 ? (
          <>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Missing environment variables:
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
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
          variant="contained"
        >
          Retry
        </Button>
      </Box>
    </Box>
  );
}
