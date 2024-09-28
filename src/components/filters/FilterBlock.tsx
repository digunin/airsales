import React from 'react';
import { TransferFilter } from './TransferFilters';
import { PriceFilter } from './price-filter/PriceFilter';
import { AirlinesFilter } from './AirlinesFilter';

export const FilterBlock = () => {
  return (
    <div className="filter-block">
      <TransferFilter />
      <PriceFilter />
      <AirlinesFilter />
    </div>
  );
};
