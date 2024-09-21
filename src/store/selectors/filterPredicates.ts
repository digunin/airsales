import { FilterPredicate, FiltersState, Flight } from '../types';
import { getFlightSummary } from './utils';

export const filterPredicate =
  (filters: FiltersState, ...predicates: FilterPredicate[]) =>
  (flight: Flight) => {
    for (const predicate of predicates) {
      if (!predicate(filters, flight)) return false;
    }
    return true;
  };

export const transfersFilterPredicate: FilterPredicate = (filters, flight) => {
  const { nonstop, oneStop } = filters.transfers;
  if (!!nonstop === !!oneStop) return true;
  const { fromHome } = getFlightSummary(flight);
  const allowedTransfers = nonstop ? 0 : 1;
  if (fromHome.transfers !== allowedTransfers) return false;
  return true;
};

export const priceFilterPredicate: FilterPredicate = (filters, flight) => {
  const price = Number(flight.flight.price.total.amount);
  const { from, to } = filters.price;
  if (from != null) {
    if (price < from) return false;
  }
  if (to != null) {
    if (price > to) return false;
  }
  return true;
};

export const airlinesFilterPredicate: FilterPredicate = (filters, flight) => {
  const { airlines } = filters;
  if (!airlines.length) return true;
  const summary = getFlightSummary(flight);
  return filters.airlines.includes(summary.fromHome.departureSegment.airline.caption);
};
