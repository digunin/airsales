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
              checked={transfersFilter.oneStop}
              disabled={!onestop}
              type="checkbox"
              name="sorting-order"
              onChange={transferFilterHandler({ oneStop: !transfersFilter.oneStop })}
            />
            <span className="checkbox-option">{` - 1 пересадка`}</span>
          </label>
          <label>
            <input
              checked={transfersFilter.nonstop}
              disabled={!nonstop}
              type="checkbox"
              name="sorting-order"
              onChange={transferFilterHandler({ nonstop: !transfersFilter.nonstop })}
            />
            <span className="checkbox-option">{` - без пересадок`}</span>
          </label>
        </div>
      </section>
    </>
  );
};
