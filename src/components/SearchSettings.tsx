import React from 'react';
import { SortingBlock } from './SortingBlock';
import { FilterBlock } from './filters/FilterBlock';

export const SearchSettings = () => {
  return (
    <aside className="search-settings">
      <SortingBlock />
      <FilterBlock />
    </aside>
  );
};
