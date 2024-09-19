import React from 'react';
import { useLoadDataQuery } from './api/flightsAPI';
import { FlightsList } from './components/FlightsList';
import { SearchSettings } from './components/SearchSettings';

function App() {
  useLoadDataQuery();

  return (
    <main className="app-container">
      <SearchSettings />
      <FlightsList />
    </main>
  );
}

export default App;
