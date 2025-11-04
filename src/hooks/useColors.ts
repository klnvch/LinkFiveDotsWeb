import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

type Pallete = {
  user1Color: number;
  user2Color: number;
};

const PalleteLight: Pallete = {
  user1Color: 0xffff0000,
  user2Color: 0xff0000ff,
};

const PalleteDark: Pallete = {
  user1Color: 0xffff8080,
  user2Color: 0xff8080ff,
};

export function useColors(): Pallete {
  const theme = useTheme();

  const [pallete, setPallete] = useState<Pallete>(PalleteLight);

  useEffect(() => {
    console.log(theme.palette.mode);
    if (theme.palette.mode === 'dark') {
      setPallete(PalleteDark);
    } else {
      setPallete(PalleteLight);
    }
  }, [theme]);

  return pallete;
}
