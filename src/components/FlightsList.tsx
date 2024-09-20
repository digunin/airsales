import React from 'react';
import { selectSortedFlights } from '../store/selectors/allFlightsSelector';
import { useAppSelector } from '../store';
import { FlightCard } from './flight-card/FlightCard';

export const FlightsList = () => {
  const flights = useAppSelector(selectSortedFlights);
  return (
    <section className="flights-list">
      {flights.slice(0, 5).map((flight, i) => {
        return <FlightCard key={i} flight={flight} />;
      })}
    </section>
  );
};
