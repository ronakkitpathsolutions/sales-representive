import React, { Suspense } from 'react';
import Routing from './routing';
import { ThemeProvider } from './components/theme-provider';
import Loading from './components/page-loader';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense fallback={<Loading />}>
        <Routing />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
