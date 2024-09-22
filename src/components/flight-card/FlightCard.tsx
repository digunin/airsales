import React, { FC } from 'react';
import { Flight } from '../../store/types';
import { getFlightSummary } from '../../store/selectors/utils';
import { FlightCardHeader } from './FlightCardHeader';
import { FlightLeg } from './FlightLeg';

type FlightCardProps = { flight: Flight };
const currencySymbol = '₽';
export const FlightCard: FC<FlightCardProps> = React.memo(({ flight }) => {
  const { fromHome, returnHome, price } = getFlightSummary(flight);

  return (
    <article className="flight-card">
      <FlightCardHeader price={`${price} ${currencySymbol}`} />
      <FlightLeg summary={fromHome} />
      <div className="separator"></div>
      <FlightLeg summary={returnHome} />
      <button>выбрать</button>
    </article>
  );
});
