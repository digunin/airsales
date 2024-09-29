import React from 'react';
import { useTransfersFilter } from '../../hooks/useTransfersFilter';

export const TransferFilter = () => {
  const { transfersFilter, onestop, nonstop, transferFilterHandler } = useTransfersFilter();
  return (
    <>
      <header>Фильтровать</header>
      <section>
        <div className="checkbox-block">
          <label>
            <input
              checked={transfersFilter[1]}
              disabled={!onestop}
              type="checkbox"
              name="sorting-order"
              onChange={transferFilterHandler([1, !transfersFilter[1]])}
            />
            <span className="checkbox-option">{` - 1 пересадка`}</span>
          </label>
          <label>
            <input
              checked={transfersFilter[0]}
              disabled={!nonstop}
              type="checkbox"
              name="sorting-order"
              onChange={transferFilterHandler([0, !transfersFilter[0]])}
            />
            <span className="checkbox-option">{` - без пересадок`}</span>
          </label>
        </div>
      </section>
    </>
  );
};
