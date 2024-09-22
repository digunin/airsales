import { useAppDispatch, useAppSelector } from '../store';
import { selectTransfersFilter } from '../store/selectors/filteredSelector';
import { selectAvailableTransfers } from '../store/selectors/selectComputed';
import { setTransfers } from '../store/slices/filterSlice';
import { FiltersState } from '../store/types';

export const useTransfersFilter = () => {
  const dispatch = useAppDispatch();
  const transferFilterHandler = (newProps: Partial<FiltersState['transfers']>) => () => {
    dispatch(setTransfers(newProps));
  };
  const transfersFilter = useAppSelector(selectTransfersFilter);

  const encodedTransfers = useAppSelector(selectAvailableTransfers);

  const [onestop, nonstop] = encodedTransfers.split('-').map(r => Boolean(+r));

  return {
    transfersFilter,
    onestop,
    nonstop,
    transferFilterHandler,
  };
};
