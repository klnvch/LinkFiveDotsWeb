import { StringProvider } from '@klnvch/link-five-dots-shared';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useTranslatedStrings = (): StringProvider => {
  const { t } = useTranslation();
  return useMemo(
    () => ({
      botName: t('room.botUser'),
      unknownName: t('room.unknownUser'),
    }),
    [t],
  );
};
