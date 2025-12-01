import { Button, ButtonProps, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SettingsActionButtonProps {
  startIcon: ButtonProps['startIcon'];
  onClick: ButtonProps['onClick'];
  color?: ButtonProps['color'];
  label: string;
}

const SettingsActionButton: React.FC<SettingsActionButtonProps> = ({
  startIcon,
  label,
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
      <Typography fontWeight={700}>{t(label)}</Typography>
    </Button>
  );
};

export default SettingsActionButton;
