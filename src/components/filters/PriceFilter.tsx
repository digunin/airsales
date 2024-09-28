import React, { FC } from 'react';
import { DebouncedField } from '../debounced/DebouncedField';
import { usePriceFilter } from '../../hooks/usePriceFilter';

type PriceFilterProps = {
  delay: number;
};

export const PriceFilter: FC<PriceFilterProps> = ({ delay }) => {
  const allPrice = usePriceFilter();
  return (
    <div className="price-filter">
      <header>Цена</header>
      <section>
        {allPrice.map(price => (
          <DebouncedField
            key={price.label}
            delay={delay}
            type="number"
            label={price.label}
            placeholder={price.placeholder}
            onchange={price.onchange}
          />
        ))}
      </section>
    </div>
  );
};
