import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { FiltersState } from '../../store/types';
import { setTransfers } from '../../store/slices/filterSlice';
import { selectAvailableTransfers, selectTransfersFilter } from '../../store/selectors/filteredSelector';

export const TransferFilter = () => {
  const dispatch = useAppDispatch();
  const transfers = useAppSelector(selectTransfersFilter);
  const { onestop, nonstop } = useAppSelector(selectAvailableTransfers);

  const transferFilterHandler = (newProps: Partial<FiltersState['transfers']>) => () => {
    dispatch(setTransfers(newProps));
  };

  return (
    <>
      <header>Фильтровать</header>
      <section>
        <div className="checkbox-block">
          <label>
            <input
              checked={transfers.oneStop}
              disabled={!onestop}
              type="checkbox"
              name="sorting-order"
              onChange={transferFilterHandler({ oneStop: !transfers.oneStop })}
            />
            <span className="checkbox-option">{` - 1 пересадка`}</span>
          </label>
          <label>
            <input
              checked={transfers.nonstop}
              disabled={!nonstop}
              type="checkbox"
              name="sorting-order"
              onChange={transferFilterHandler({ nonstop: !transfers.nonstop })}
            />
            <span className="checkbox-option">{` - без пересадок`}</span>
          </label>
        </div>
      </section>
    </>
  );
};
