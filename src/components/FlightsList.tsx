import React from 'react';
import { FlightCard } from './flight-card/FlightCard';
import { useFlightsList } from '../hooks/useFlightsList';

export const FlightsList = () => {
  const { flights, showMoreHandler, showMoreButtonDisabled } = useFlightsList();
  return (
    <section className="flights-list">
      {flights.map((flight, i) => {
        return <FlightCard key={i} flight={flight} />;
      })}
      <button disabled={showMoreButtonDisabled} onClick={showMoreHandler} className="show-more">
        Показать еще
      </button>
    </section>
  );
};
