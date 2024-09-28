import React from 'react';
import { PriceField } from './PriceField';
import { usePriceFilter } from '../../../hooks/usePriceFilter';

export const PriceFilter = () => {
  const { minPrice, maxPrice, onChangePriceFrom, onChangePriceTo } = usePriceFilter();
  return (
    <div className="price-filter">
      <header>Цена</header>
      <section>
        <PriceField label="От" placeholder={`${minPrice || ''}`} onchange={onChangePriceFrom} />
        <PriceField label="До" placeholder={`${maxPrice || ''}`} onchange={onChangePriceTo} />
      </section>
    </div>
  );
};
