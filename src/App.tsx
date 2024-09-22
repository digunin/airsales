import React from 'react';
import { useLoadDataQuery } from './api/flightsAPI';
import { SearchSettings } from './components/SearchSettings';
import { Main } from './components/Main';

function App() {
  useLoadDataQuery();

  return (
    <main className="app-container">
      <SearchSettings />
      <Main />
    </main>
  );
}

export default App;
