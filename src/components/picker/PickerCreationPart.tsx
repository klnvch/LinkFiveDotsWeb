import { PickerCreationViewState } from '@klnvch/link-five-dots-shared';
import { Button, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface PickerCreationPartProps {
  uiState: PickerCreationViewState;
  onCreate: () => void;
  onDelete: () => void;
}

export const PickerCreationPart: React.FC<PickerCreationPartProps> = ({
  uiState: { text, isEnabled, isCreateButtonVisible, isDeleteButtonVisible },
  onCreate,
  onDelete,
}) => {
  const { t } = useTranslation();

  const items = text.length ? text : [t('room.nameNotSet')];

  return (
    <Stack spacing={2} alignItems="stretch" sx={{ width: '100%', p: 2 }}>
      {isCreateButtonVisible && (
        <Button
          variant="contained"
          color="primary"
          onClick={onCreate}
          disabled={!isEnabled}
        >
          {t('common.create')}
        </Button>
      )}
      {isDeleteButtonVisible && (
        <Button
          variant="contained"
          color="primary"
          onClick={onDelete}
          disabled={!isEnabled}
        >
          {t('common.delete')}
        </Button>
      )}
      <Stack direction="row" sx={{ opacity: isEnabled ? 1 : 0.2 }}>
        <Typography align="left">{`${t('room.name')}:`}</Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ ml: 1, flexGrow: 1, minWidth: 0, width: '100%' }}
        >
          {items.map((s) => (
            <Typography
              key={s}
              align="right"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {s}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
