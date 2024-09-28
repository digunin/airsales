import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setSortMode, setSortOrder } from '../store/slices/sortingSlice';
import { SortMode, SortOrder } from '../store/types';

type SortData<T extends SortOrder | SortMode> = {
  type: T;
  label: string;
};

export const useSortingBlock = () => {
  const dispatch = useAppDispatch();
  const sortModeHandler = (sortMode: SortMode) => () => {
    dispatch(setSortMode(sortMode));
  };
  const sortOrderHandler = (sortOrder: SortOrder) => () => {
    dispatch(setSortOrder(sortOrder));
  };

  const mode = useAppSelector(state => state.sortingState.mode);
  const order = useAppSelector(state => state.sortingState.order);

  const sortOrderData: SortData<SortOrder>[] = [
    {
      type: 'asc',
      label: 'по возрастанию',
    },
    {
      type: 'desc',
      label: 'по убыванию',
    },
  ];

  const sortModeData: SortData<SortMode>[] = [
    {
      type: 'price',
      label: 'по цене',
    },
    {
      type: 'duration-from-home',
      label: 'по продолжительности полета туда',
    },
    {
      type: 'duration-return-to-home',
      label: 'по продолжительности полета обратно',
    },
    {
      type: 'duration-total',
      label: 'по продолжительности полета туда и обратно',
    },
    {
      type: 'duration-from-departure-to-returning',
      label: 'от даты вылета до даты возвращения',
    },
  ];

  return useMemo(() => {
    return {
      sortOrderProps: sortOrderData.map(({ type, label }) => {
        return {
          label,
          checked: order === type,
          onchange: sortOrderHandler(type),
        };
      }),
      sortModeProps: sortModeData.map(({ type, label }) => {
        return {
          label,
          checked: mode === type,
          onchange: sortModeHandler(type),
        };
      }),
    };
  }, [mode, order]);
};
