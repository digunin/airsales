import React from 'react';
import { useAppSelector } from '../store';
import { FlightCard } from './flight-card/FlightCard';
import { selectFilteredFlights } from '../store/selectors/filteredSelector';

export const FlightsList = () => {
  const flights = useAppSelector(selectFilteredFlights);
  return (
    <section className="flights-list">
      {flights.slice(0, 5).map((flight, i) => {
        return <FlightCard key={i} flight={flight} />;
      })}
    </section>
  );
};
