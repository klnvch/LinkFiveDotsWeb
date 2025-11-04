import React from 'react';
import { AppBar, Toolbar, Container, Divider } from '@mui/material';
import { MultiplayerAppBarTitle } from '../../components/MultiplayerAppBarTitle';
import {
  FoundRemoteRoom,
  NetworkGameAction,
  PickerViewState,
} from 'LinkFiveDots-shared';
import { PickerCommonPart } from '../../components/picker/PickerCommonPart';
import { PickerCreationPart } from '../../components/picker/PickerCreationPart';
import { PickerScanningPart } from '../../components/picker/PickerScanningPart';
import { Page } from '../../components/layout/Page';
import { Content } from '../../components/layout/Content';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';

interface PickerPageProps {
  uiState: PickerViewState;
  title: NetworkGameAction;
  handleCreateRoom: () => void;
  deleteRoom: () => Promise<void>;
  handleRoomClick: (invitation: FoundRemoteRoom) => Promise<void>;
  scanRooms: () => void;
  cancelScan: () => void;
}

export const PickerPage: React.FC<PickerPageProps> = ({
  uiState: { common, creation, scanning },
  title,
  handleRoomClick,
  handleCreateRoom,
  deleteRoom,
  scanRooms,
  cancelScan,
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Page>
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar>
          <BackButton onClick={handleBack} />
          <MultiplayerAppBarTitle title={title} />
        </Toolbar>
      </AppBar>
      <Content>
        <Container maxWidth="sm">
          <PickerCommonPart uiState={common} />
          <PickerCreationPart
            uiState={creation}
            onCreate={handleCreateRoom}
            onDelete={deleteRoom}
          />
          <Divider sx={{ borderBottomWidth: 5 }} />
          <PickerScanningPart
            uiState={scanning}
            onScanStart={scanRooms}
            onScanStop={cancelScan}
            onRoomClick={handleRoomClick}
          />
        </Container>
      </Content>
    </Page>
  );
};
