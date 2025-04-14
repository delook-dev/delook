import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import App from './App';
import ThemeProvider from './lib/theme';

const isExtension = location.protocol === 'chrome-extension:';

export function RouterProvider({ children }: { children: React.ReactNode }) {
  return isExtension ? (
    <HashRouter>{children}</HashRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <App />
        </ThemeProvider>
      </RouterProvider>
    </HelmetProvider>
  </StrictMode>,
);
