import React from 'react';
import { SortingBlock } from './SortingBlock';

export const SearchSettings = () => {
  return (
    <aside className="search-settings">
      <SortingBlock />
      <header>Фильтровать</header>
      <div className="filters-block"></div>
    </aside>
  );
};
