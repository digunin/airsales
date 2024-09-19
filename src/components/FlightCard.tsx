import React, { FC } from 'react';
import { Flight } from '../store/types';
import { fromDeaprtureTimeToReturningTime, getFlightSummary } from '../store/selectors/getFlightDuration';

type FlightCardProps = { flight: Flight };
export const FlightCard: FC<FlightCardProps> = ({ flight }) => {
  const { fromHome, returnHome } = getFlightSummary(flight);
  return (
    <article className="flight-card">
      <div style={{ margin: '1em' }}>
        <p>Вылет</p>
        <p>{fromHome.departureDate}</p>
        <p>{fromHome.arrivalDate}</p>
        <p>{fromHome.duration}</p>
        <p>Возвращение</p>
        <p>{returnHome.departureDate}</p>
        <p>{returnHome.arrivalDate}</p>
        <p>{returnHome.duration}</p>
        <p>Суммарный полет</p>
        <p>{fromHome.duration + returnHome.duration}</p>
        <p>От даты вылета до даты возвращения</p>
        <p>{fromDeaprtureTimeToReturningTime(flight)}</p>
      </div>
    </article>
  );
};
