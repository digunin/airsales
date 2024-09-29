import React from 'react';
import { useLoadDataQuery } from './api/flightsAPI';
import { SearchSettings } from './components/SearchSettings';
import { Main } from './components/Main';
import { AppHeader } from './components/AppHeader';
import { useSearchSettings } from './hooks/useSearchSettings';

function App() {
  useLoadDataQuery();
  const { hide, toggleSettingsVisible } = useSearchSettings();
  return (
    <main className="app-container">
      <AppHeader onclick={toggleSettingsVisible} />
      <SearchSettings hide={hide} onClose={toggleSettingsVisible} />
      <Main />
    </main>
  );
}

export default App;
