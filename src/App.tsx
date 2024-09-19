import React from 'react';
import { useAppSelector } from './store';
import { selectSortedFlights } from './store/selectors/allFlightsSelector';
import { useLoadDataQuery } from './api/flightsAPI';
import { fromDeaprtureTimeToReturningTime, getFlightSummary } from './store/selectors/getFlightDuration';

function App() {
  useLoadDataQuery();
  const flights = useAppSelector(selectSortedFlights);

  return (
    <div className="app-container">
      <h1>Airsales</h1>
      {flights.slice(0, 5).map((flight, i) => {
        const { fromHome, returnHome } = getFlightSummary(flight);
        return (
          <div key={i} style={{ margin: '1em' }}>
            <p>Вылет</p>
            <p>{fromHome.departureDate}</p>
            <p>{fromHome.arrivalDate}</p>
            <p>{fromHome.duration}</p>
            <p>Возвращение</p>
            <p>{returnHome.departureDate}</p>
            <p>{returnHome.arrivalDate}</p>
            <p>{returnHome.duration}</p>
            <p>Суммарный полет</p>
            <p>{fromHome.duration + returnHome.duration}</p>
            <p>От даты вылета до даты возвращения</p>
            <p>{fromDeaprtureTimeToReturningTime(flight)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
