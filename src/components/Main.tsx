import React from 'react';
import { useFlightsList } from '../hooks/useFlightsList';
import { FlightsList } from './FlightsList';

export const Main = () => {
  const { flights, showMoreHandler, showMoreButtonDisabled } = useFlightsList();
  return (
    <section className="flights-list">
      <FlightsList flights={flights} />
      <button disabled={showMoreButtonDisabled} onClick={showMoreHandler} className="show-more">
        Показать еще
      </button>
    </section>
  );
};
