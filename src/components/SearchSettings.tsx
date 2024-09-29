import React, { FC } from 'react';
import { SortingBlock } from './SortingBlock';
import { FilterBlock } from './filters/FilterBlock';
import iconCross from '../assets/icon-cross.png';

type SearchSettingsProps = { hide: boolean; onClose: () => void };

export const SearchSettings: FC<SearchSettingsProps> = ({ hide, onClose }) => {
  const className = `search-settings${hide ? ' hide' : ''}`;
  return (
    <aside className={className}>
      <SortingBlock />
      <FilterBlock />

      <img className="close-button" role="button" src={iconCross} alt="Закрыть настройки" onClick={onClose} />
    </aside>
  );
};
