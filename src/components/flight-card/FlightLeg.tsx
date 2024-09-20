import React, { FC } from 'react';
import { FlightLegSummary } from '../../store/types';

import { FlightRoute } from './FlightRoute';
import { FlightTime } from './FlightTime';

type FlightLegProps = { summary: FlightLegSummary };

export const FlightLeg: FC<FlightLegProps> = ({ summary }) => {
  return (
    <div className="flight-leg">
      <FlightRoute from={summary.departureSegment} to={summary.arrivalSegment} />
      <FlightTime summary={summary} />
      {summary.transfers > 0 && (
        <div className="transfers">
          <div></div>
          <p>Пересадок: {summary.transfers}</p>
          <div></div>
        </div>
      )}
      <p className="airline">Рейс выполняет: {summary.departureSegment.airline.caption}</p>
    </div>
  );
};
