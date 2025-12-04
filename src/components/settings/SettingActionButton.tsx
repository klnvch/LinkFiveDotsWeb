import { Button, ButtonProps, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SettingsActionButtonProps {
  startIcon: ButtonProps['startIcon'];
  onClick: ButtonProps['onClick'];
  color?: ButtonProps['color'];
  primaryLabel: string;
  secondaryText?: string;
}

const SettingsActionButton: React.FC<SettingsActionButtonProps> = ({
  startIcon,
  primaryLabel,
  secondaryText,
  color,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <Button
      color={color}
      variant="outlined"
      startIcon={startIcon}
      fullWidth
      onClick={onClick}
      sx={{ justifyContent: 'flex-start', py: 1.5 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Typography fontWeight={700}>{t(primaryLabel)}</Typography>
        {secondaryText && (
          <Typography color="text.secondary" sx={{ textTransform: 'none' }}>
            {secondaryText}
          </Typography>
        )}
      </Stack>
    </Button>
  );
};

export default SettingsActionButton;
