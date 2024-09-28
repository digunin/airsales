import React, { FC } from 'react';
import { FlightCard } from './flight-card/FlightCard';
import { Flight } from '../store/types';

type FlightsListProps = {
  flights: Flight[];
};

const createReactKey = (flight: Flight) => {
  return flight.flightToken;
};

export const FlightsList: FC<FlightsListProps> = ({ flights }) => {
  return (
    <>
      {flights.map(flight => {
        return <FlightCard key={createReactKey(flight)} flight={flight} />;
      })}
    </>
  );
};
