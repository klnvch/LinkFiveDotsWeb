import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import './i18n';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

const MenuPage = lazy(() => import('./pages/MenuPage'));
const MultiplayerPage = lazy(() => import('./pages/multiplayer/MultiplayerPage'));
const SinglePlayerPage = lazy(() => import('./pages/singleplayer/SinglePlayerPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));

function App() {
  const FallbackLoader = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setShow(true), 250); // avoid flash on fast loads
      return () => clearTimeout(t);
    }, []);

    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '50vh' }}>
        <Fade in={show} timeout={200}>
          <CircularProgress size={24} />
        </Fade>
      </Box>
    );
  };

  return (
    <>
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/multiplayer/*" element={<MultiplayerPage />} />
          <Route path="/singleplayer/game" element={<SinglePlayerPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
