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
    <>
      <header>Сортировать</header>
      <section>
        <div className="radio-block">
          <label>
            <input checked={order === 'asc'} type="radio" name="sorting-order" onChange={sortOrderHandler('asc')} /> -
            по возрастанию
          </label>
          <label>
            <input checked={order === 'desc'} type="radio" name="sorting-order" onChange={sortOrderHandler('desc')} /> -
            По убыванию
          </label>
        </div>

        <div className="radio-block">
          <label>
            <input checked={mode === 'price'} type="radio" name="sorting-mode" onChange={sortModeHandler('price')} /> -
            по цене
          </label>
          <label>
            <input
              checked={mode === 'duration-from-home'}
              type="radio"
              name="sorting-mode"
              onChange={sortModeHandler('duration-from-home')}
            />{' '}
            - по продолжительности полета туда
          </label>
          <label>
            <input
              checked={mode === 'duration-return-to-home'}
              type="radio"
              name="sorting-mode"
              onChange={sortModeHandler('duration-return-to-home')}
            />{' '}
            - по продолжительности полета обратно
          </label>
          <label>
            <input
              checked={mode === 'duration-total'}
              type="radio"
              name="sorting-mode"
              onChange={sortModeHandler('duration-total')}
            />{' '}
            - по продолжительности полета туда и обратно
          </label>
          <label>
            <input
              checked={mode === 'duration-from-departure-to-returning'}
              type="radio"
              name="sorting-mode"
              onChange={sortModeHandler('duration-from-departure-to-returning')}
            />{' '}
            - от даты вылета до даты возвращения
          </label>
        </div>
      </section>
    </>
  );
};
