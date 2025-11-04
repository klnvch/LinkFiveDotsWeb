import ArrowBack from '@mui/icons-material/ArrowBack';
import { IconButton, IconButtonProps } from '@mui/material';

interface BackButtonProps {
  onClick: IconButtonProps['onClick'];
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      edge="start"
      color="inherit"
      onClick={onClick}
      aria-label="back"
    >
      <ArrowBack />
    </IconButton>
  );
};
