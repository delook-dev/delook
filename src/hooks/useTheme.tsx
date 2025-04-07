import { useContext } from 'react';

import { ThemeProviderContext } from '@/lib';

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
}
