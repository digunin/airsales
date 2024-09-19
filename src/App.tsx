import React from 'react';
import { useLoadDataQuery } from './api/flightsAPI';

function App() {
  const { data } = useLoadDataQuery();

  return (
    <div className="app-container">
      <h1>Airsales</h1>
      <p>Number of flights: {data?.result.flights.length || '...loading'}</p>
    </div>
  );
}

export default App;
