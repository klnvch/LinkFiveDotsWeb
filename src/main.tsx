import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { registerSW } from 'virtual:pwa-register';

export const Main = () => {
  const theme = useMemo(
    () =>
      createTheme({
        mixins: {
          toolbar: {
            minHeight: 56, // Default mobile portrait height
            '@media (min-width:0px) and (orientation: landscape)': {
              minHeight: 48, // Mobile landscape height
            },
            '@media (min-width:600px)': {
              minHeight: 64, // Tablet/Desktop height
            },
          },
        },
        colorSchemes: {
          dark: true,
        },
        palette: {
          primary: {
            main: '#006874',
          },
          secondary: {
            main: '#4A6267',
          },
        },
        typography: {
          button: {
            fontWeight: 700, // Or 'bold'
          },
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>,
);

// Register Service Worker for PWA (auto-updates)
registerSW({ immediate: true });
