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

export const transfersFilterPredicate: FilterPredicate = ({ transfers }, flight) => {
  if (transfers.every(item => !!item) || transfers.every(item => !item)) return true;
  const { fromHome } = getFlightSummary(flight);
  return transfers[fromHome.transfers];
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
