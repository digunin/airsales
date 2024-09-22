import React from 'react';
import { useAirlinesFilter } from '../../hooks/useAirlinesFilter';

export const AirlinesFilter = () => {
  const { allAirlines, airlinesFilter, availableAirlines, onAirlineClickHandler } = useAirlinesFilter();
  return (
    <div className="airlines">
      <header>Авиакомпании</header>
      <section>
        {Object.entries(allAirlines).map(([airline, minPrice]) => {
          return (
            <label className="airlines-label" key={airline}>
              <input
                checked={airlinesFilter.includes(airline)}
                disabled={!availableAirlines.includes(airline)}
                type="checkbox"
                onChange={onAirlineClickHandler(airline)}
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
