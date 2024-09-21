import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { SortMode, SortOrder } from '../store/types';
import { setSortMode, setSortOrder } from '../store/slices/sortingSlice';

export const SortingBlock = () => {
  const dispatch = useAppDispatch();
  const sortModeHandler = (sortMode: SortMode) => () => {
    dispatch(setSortMode(sortMode));
  };
  const sortOrderHandler = (sortOrder: SortOrder) => () => {
    dispatch(setSortOrder(sortOrder));
  };

  const mode = useAppSelector(state => state.sortingState.mode);
  const order = useAppSelector(state => state.sortingState.order);

  return (
    <div className="sorting-block">
      <header>Сортировать</header>
      <section>
        <div className="radio-block">
          <label>
            <input checked={order === 'asc'} type="radio" name="sorting-order" onChange={sortOrderHandler('asc')} />
            <span className="radio-option" title="по возрастанию">
              - по возрастанию
            </span>
          </label>
          <label>
            <input checked={order === 'desc'} type="radio" name="sorting-order" onChange={sortOrderHandler('desc')} />
            <span className="radio-option" title="по убыванию">
              {' '}
              - По убыванию
            </span>
          </label>
        </div>

        <div className="radio-block">
          <label>
            <input checked={mode === 'price'} type="radio" name="sorting-mode" onChange={sortModeHandler('price')} />
            <span className="radio-option" title="по цене">
              {' '}
              - по цене
            </span>
          </label>
          <label>
            <input
              checked={mode === 'duration-from-home'}
              type="radio"
              name="sorting-mode"
              onChange={sortModeHandler('duration-from-home')}
            />{' '}
            <span className="radio-option" title="по продолжительности полета туда">
              {' '}
              - по продолжительности полета туда
            </span>
          </label>
          <label>
            <input
              checked={mode === 'duration-return-to-home'}
              type="radio"
              name="sorting-mode"
              onChange={sortModeHandler('duration-return-to-home')}
            />{' '}
            <span className="radio-option" title="по продолжительности полета обратно">
              {' '}
              - по продолжительности полета обратно
            </span>
          </label>
          <label>
            <input
              checked={mode === 'duration-total'}
              type="radio"
              name="sorting-mode"
              onChange={sortModeHandler('duration-total')}
            />{' '}
            <span className="radio-option" title="по продолжительности полета туда и обратно">
              {' '}
              - по продолжительности полета туда и обратно
            </span>
          </label>
          <label>
            <input
              checked={mode === 'duration-from-departure-to-returning'}
              type="radio"
              name="sorting-mode"
              onChange={sortModeHandler('duration-from-departure-to-returning')}
            />{' '}
            <span className="radio-option" title="от даты вылета до даты возвращения">
              {' '}
              - от даты вылета до даты возвращения
            </span>
          </label>
        </div>
      </section>
    </div>
  );
};
