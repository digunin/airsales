import React, { FC } from 'react';
import { FlightSegment } from '../../store/types';

type FlightRouteProps = {
  from: FlightSegment;
  to: FlightSegment;
};
export const FlightRoute: FC<FlightRouteProps> = ({ from, to }) => {
  return (
    <div className="route">
      <span>{(from.departureCity?.caption || '').split(' ')[0]}, </span>
      <span>{from.departureAirport?.caption || ''} </span>
      <span className="airport-uid">({from.departureAirport?.uid || ''})</span>
      <span> → </span>
      <span>{(to.arrivalCity?.caption || '').split(' ')[0]}, </span>
      <span>{to.arrivalAirport?.caption || ''} </span>
      <span className="airport-uid">({to.arrivalAirport?.uid || ''})</span>
    </div>
  );
};
