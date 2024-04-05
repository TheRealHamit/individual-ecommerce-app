import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { StateProvider } from './components/StateContext.jsx';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StateProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
