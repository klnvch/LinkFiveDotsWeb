import { Routes, Route } from 'react-router-dom';
import './i18n';
import { MenuPage } from './pages/MenuPage';
import { SettingsPage } from './pages/SettingsPage';
import { MultiplayerPage } from './pages/multiplayer/MultiplayerPage';
import { SinglePlayerPage } from './pages/singleplayer/SinglePlayerPage';
import { InfoPage } from './pages/InfoPage';
import HelpPage from './pages/HelpPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/help" element={<HelpPage />} /> 
        <Route path="/multiplayer/*" element={<MultiplayerPage />} />
        <Route path="/singleplayer/game" element={<SinglePlayerPage />} />
      </Routes>
    </>
  );
}

export default App;
