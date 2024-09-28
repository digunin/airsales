import React from 'react';
import { useSortingBlock } from '../hooks/useSortingBlock';

export const SortingBlock = () => {
  const { sortOrderProps, sortModeProps } = useSortingBlock();

  return (
    <div className="sorting-block">
      <header>Сортировать</header>
      <section>
        <div className="radio-block">
          {sortOrderProps.map(item => (
            <label key={item.label}>
              <input checked={item.checked} type="radio" name="sorting-order" onChange={item.onchange} />
              <span className="radio-option" title={item.label}>
                {` - ${item.label}`}
              </span>
            </label>
          ))}
        </div>

        <div className="radio-block">
          {sortModeProps.map(item => (
            <label key={item.label}>
              <input checked={item.checked} type="radio" name="sorting-mode" onChange={item.onchange} />
              <span className="radio-option" title={item.label}>
                {` - ${item.label}`}
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};
