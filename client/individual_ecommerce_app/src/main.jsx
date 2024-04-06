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

const shadows = createTheme().shadows;

shadows[25] = "0px 11px 15px -7px rgba(255,255,255,0.2),0px 24px 38px 3px rgba(255,255,255,0.14),0px 9px 46px 8px rgba(255,255,255,0.12)";

let theme = createTheme({
  palette: {
    mode: 'dark',
  }, 
  shadows: shadows
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
