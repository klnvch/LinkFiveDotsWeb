import { StringProvider } from '@klnvch/link-five-dots-shared';
import { useTranslation } from 'react-i18next';

export const useTranslatedStrings = (): StringProvider => {
  const { t } = useTranslation();
  return {
    botName: t('room.botUser'),
    unknownName: t('room.unknownUser'),
  };
};
