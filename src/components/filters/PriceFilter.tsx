import React from 'react';
import { usePriceFilter } from '../../hooks/usePriceFilter';

export const PriceFilter = () => {
  const { from, to, minPrice, maxPrice, onChangePriceFrom, onChangePriceTo } = usePriceFilter();
  return (
    <div className="price-filter">
      <header>Цена</header>
      <section>
        <label>
          <p>От</p>
          <input placeholder={minPrice + ''} type="text" value={from} onChange={onChangePriceFrom} />
        </label>
        <label>
          <p>До</p>
          <input placeholder={maxPrice + ''} type="text" value={to} onChange={onChangePriceTo} />
        </label>
      </section>
    </div>
  );
};
