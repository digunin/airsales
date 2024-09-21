import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { FlightCard } from './flight-card/FlightCard';
import { selectFilteredFlights, selectFilters } from '../store/selectors/filteredSelector';

export const FlightsList = () => {
  const flights = useAppSelector(selectFilteredFlights);
  const [cardslength, setCardsLength] = useState(5);
  const filters = useAppSelector(selectFilters);

  const showMoreHandler = () => () => {
    setCardsLength(prev => prev + 5);
  };

  useEffect(() => {
    setCardsLength(5);
  }, [filters]);

  return (
    <section className="flights-list">
      {flights.slice(0, cardslength).map((flight, i) => {
        return <FlightCard key={i} flight={flight} />;
      })}
      <button disabled={flights.length <= cardslength} onClick={showMoreHandler()} className="show-more">
        Показать еще
      </button>
    </section>
  );
};
