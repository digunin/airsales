import { useAppDispatch, useAppSelector } from '../store';
import { selectTransfersFilter } from '../store/selectors/filteredSelector';
import { selectAvailableTransfers } from '../store/selectors/selectComputed';
import { setTransfers } from '../store/slices/filterSlice';
import { TransferPayload } from '../store/types';

export const useTransfersFilter = () => {
  const dispatch = useAppDispatch();
  const transferFilterHandler = (newProps: TransferPayload) => () => {
    dispatch(setTransfers(newProps));
  };
  const transfersFilter = useAppSelector(selectTransfersFilter);

  const encodedTransfers = useAppSelector(selectAvailableTransfers);

  const [nonstop, onestop] = encodedTransfers.split('-').map(r => Boolean(+r));

  return {
    transfersFilter,
    onestop,
    nonstop,
    transferFilterHandler,
  };
};
