import { StringProvider } from 'LinkFiveDots-shared';
import { useTranslation } from 'react-i18next';

export const useTranslatedStrings = (): StringProvider => {
  const { t } = useTranslation();
  return {
    botName: t('room.botUser'),
    unknownName: t('room.unknownUser'),
  };
};
