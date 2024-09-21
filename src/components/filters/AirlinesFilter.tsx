import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectAirlinesWithPrice,
  selectAvailableAirlines,
  selectFilters,
} from '../../store/selectors/filteredSelector';
import { toggleAirline } from '../../store/slices/filterSlice';

export const AirlinesFilter = () => {
  const dispatch = useAppDispatch();
  const allAirlines = useAppSelector(selectAirlinesWithPrice);
  const { airlines } = useAppSelector(selectFilters);
  const availableAirlines = useAppSelector(selectAvailableAirlines);
  return (
    <div className="airlines">
      <header>Авиакомпании</header>
      <section>
        {allAirlines.map(([airline, minPrice]) => {
          return (
            <label className="airlines-label" key={airline}>
              <input
                checked={airlines.includes(airline)}
                disabled={!availableAirlines.includes(airline)}
                type="checkbox"
                onChange={() => {
                  dispatch(toggleAirline(airline));
                }}
              />
              <span title={airline} className="airline">{` - ${airline}`}</span>
              <span> от {minPrice} р</span>
            </label>
          );
        })}
      </section>
    </div>
  );
};
