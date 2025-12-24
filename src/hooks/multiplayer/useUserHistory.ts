import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/useAppContext';
import { useTranslatedStrings } from '../../services/stringProvider';
import {
  OnlineGameShortInfo,
  readUserHistory,
} from '@klnvch/link-five-dots-shared';
import { readStringArray } from '../../services/roomService';

export const useUserHistory = () => {
  const { networkUser } = useAppContext();
  const stringProvider = useTranslatedStrings();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<OnlineGameShortInfo[]>();

  useEffect(() => {
    if (networkUser) {
      setLoading(true);
      readUserHistory(networkUser, stringProvider, readStringArray)
        .then((data) => {
          setHistory(data);
        })
        .catch((e) => console.error(e))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [networkUser, stringProvider]);

  return {
    loading,
    history,
  };
};
