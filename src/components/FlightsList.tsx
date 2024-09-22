import React from 'react';
import { FlightCard } from './flight-card/FlightCard';
import { useFlightsList } from '../hooks/useFlightsList';

export const FlightsList = () => {
  const { cardslength, flights, showMoreHandler } = useFlightsList();
  return (
    <section className="flights-list">
      {flights.slice(0, cardslength).map((flight, i) => {
        return <FlightCard key={i} flight={flight} />;
      })}
      <button disabled={flights.length <= cardslength} onClick={showMoreHandler} className="show-more">
        Показать еще
      </button>
    </section>
  );
};
