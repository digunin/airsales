import React, { FC } from 'react';
import logo from '../../assets/aeroflot-logo.svg';

type FlightCardHeaderProps = {
  price: number | string;
};
export const FlightCardHeader: FC<FlightCardHeaderProps> = ({ price }) => {
  return (
    <header>
      <img src={logo} alt="логотип авиакомпании" />
      <div>
        <p className="price">{price}</p>
        <p className="describe">Стоимость для одного взрослого пассажира</p>
      </div>
    </header>
  );
};
