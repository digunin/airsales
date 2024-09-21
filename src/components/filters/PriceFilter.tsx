import React from 'react';
import { usePriceFilter } from '../../hooks/usePriceFilter';
import { useAppSelector } from '../../store';
import { seletAvailableMinMaxPrice } from '../../store/selectors/filteredSelector';

export const PriceFilter = () => {
  const [minPrice, maxPrice] = useAppSelector(seletAvailableMinMaxPrice);
  const { from, to, onChangePriceFrom, onChangePriceTo } = usePriceFilter(minPrice, maxPrice);
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
