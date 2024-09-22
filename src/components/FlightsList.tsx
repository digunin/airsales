import React, { FC } from 'react';
import { FlightCard } from './flight-card/FlightCard';
import { Flight } from '../store/types';

type FlightsListProps = {
  flights: Flight[];
};

const createReactKey = (flight: Flight) => {
  return flight.flightToken;
};

export const FlightsList: FC<FlightsListProps> = React.memo(
  ({ flights }) => {
    return (
      <>
        {flights.map(flight => {
          return <FlightCard key={createReactKey(flight)} flight={flight} />;
        })}
      </>
    );
  },
  (prev, cur) => JSON.stringify(prev) === JSON.stringify(cur),
);
