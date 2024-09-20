import { Flight, FlightLeg, FlightSegment } from '../types';

export const fromHomeFlightDuration = (flight: Flight) => {
  const [leg1] = getFlightLegs(flight);
  return leg1.duration;
};

export const returnToHomeFlightDuration = (flight: Flight) => {
  const [, leg2] = getFlightLegs(flight);
  return leg2.duration;
};

export const totalFlightsDuration = (flight: Flight) => {
  const [leg1, leg2] = getFlightLegs(flight);
  return leg1.duration + leg2.duration;
};

export const fromDeaprtureTimeToReturningTime = (flight: Flight) => {
  const [leg1, leg2] = getFlightLegs(flight);
  const fromHomeDepartureDate = getLegSegments(leg1).departureSegment.departureDate;
  const returnToHomeDate = getLegSegments(leg2).arrivalSegment.arrivalDate;
  const duration = new Date(returnToHomeDate).getTime() - new Date(fromHomeDepartureDate).getTime();
  return Math.trunc(duration / 60000);
};

export const getFlightLegs = (flight: Flight) => {
  return flight.flight.legs.toSorted((leg1, leg2) => {
    return new Date(leg1.segments[0].departureDate).getTime() - new Date(leg2.segments[0].departureDate).getTime();
  });
};

const getLegSegments = (leg: FlightLeg) => {
  const departureSegment = leg.segments.find(s => s.starting) as FlightSegment;
  const arrivalSegment = leg.segments.reduce((segment1, segment2) => {
    const maxDate = compareDates(segment1.arrivalDate, segment2.arrivalDate).lateDate;
    return maxDate === segment1.arrivalDate ? segment1 : segment2;
  }, leg.segments[0]);

  return { departureSegment, arrivalSegment };
};

const compareDates = (date1: string, date2: string) => {
  if (new Date(date1).getTime() > new Date(date2).getTime()) {
    [date1, date2] = [date2, date1];
  }
  return {
    earlyDate: date1,
    lateDate: date2,
  };
};

export const getFlightSummary = (flight: Flight) => {
  const [leg1, leg2] = getFlightLegs(flight);
  const fromHomeSegments = getLegSegments(leg1);
  const returnHomeSegments = getLegSegments(leg2);
  return {
    fromHome: {
      ...fromHomeSegments,
      duration: leg1.duration,
      transfers: leg1.segments.length - 1,
    },
    returnHome: {
      ...returnHomeSegments,
      duration: leg2.duration,
      transfers: leg2.segments.length - 1,
    },
    price: flight.flight.price.total.amount,
  };
};

export const formatDate = (date: string) => {
  const _date = new Date(date);
  return {
    date: _date.toLocaleString('ru', {
      day: '2-digit',
      month: 'short',
      weekday: 'short',
    }),
    time: _date.toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
};

export const formatDuration = (duration: number) => {
  const minutes = duration % 60;
  const fullHours = (duration - minutes) / 60;
  const hours = fullHours % 24;
  const days = (fullHours - hours) / 24;
  let formatted = `${days === 0 ? '' : `${days} д `}`;
  formatted = formatted + `${hours === 0 && formatted == '' ? '' : `${String(hours).padStart(2, '0')} ч `}`;
  formatted = formatted + String(minutes).padStart(2, '0') + ' м';
  return formatted;
};
