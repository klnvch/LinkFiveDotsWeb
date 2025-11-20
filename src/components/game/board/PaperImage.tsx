import { useTheme } from '@mui/material';
import { useMemo } from 'react';

interface PaperImageProps {
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export default function PaperImage({ onClick }: PaperImageProps) {
  const theme = useTheme();
  const filter = useMemo(
    () => (theme.palette.mode === 'dark' ? 'invert(1)' : 'none'),
    [theme],
  );
  return (
    <img
      src="/background.png"
      alt=""
      draggable="false"
      aria-hidden="true"
      decoding="async"
      loading="eager"
      style={{
        userSelect: 'none',
        pointerEvents: 'auto',
        filter,
      }}
      onClick={onClick}
    />
  );
}
