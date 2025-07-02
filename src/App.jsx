import React from 'react';
import Routing from './routing';
import { ThemeProvider } from './components/theme-provider';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routing />
    </ThemeProvider>
  );
};

export default App;
