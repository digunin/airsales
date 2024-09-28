import React, { useMemo } from 'react';
import { useAirlinesFilter } from '../../hooks/useAirlinesFilter';

export const AirlinesFilter = () => {
  const { airlines, onAirlineClickHandler } = useAirlinesFilter();

  return useMemo(() => {
    return (
      <div className="airlines">
        <header>Авиакомпании</header>
        <section>
          {airlines.map(airline => {
            return (
              <label className="airlines-label" key={airline.name}>
                <input
                  checked={airline.checked}
                  disabled={airline.disabled}
                  type="checkbox"
                  onChange={onAirlineClickHandler(airline.name)}
                />
                <span title={airline.name} className="airline">{` - ${airline.name}`}</span>
                <span> от {airline.minPrice} р</span>
              </label>
            );
          })}
        </section>
      </div>
    );
  }, [airlines, onAirlineClickHandler]);
};
