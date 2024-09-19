import { Flight, FlightLeg } from '../types';

export const fromHomeFlightDuration = (flight: Flight) => {
  const [leg1] = getFlightLegs(flight);
  return leg1.duration;
};

export const returnToHomeFlightDuration = (flight: Flight) => {
  const [, leg2] = getFlightLegs(flight);
  return leg2.duration;
};

export const sumFlightsDuration = (flight: Flight) => {
  const [leg1, leg2] = getFlightLegs(flight);
  return leg1.duration + leg2.duration;
};

export const fromDeaprtureTimeToReturningTime = (flight: Flight) => {
  const [leg1, leg2] = getFlightLegs(flight);
  const fromHomeDepartureDate = getLegDates(leg1).departureDate;
  const returnToHomeDate = getLegDates(leg2).arrivalDate;
  const duration = new Date(returnToHomeDate).getTime() - new Date(fromHomeDepartureDate).getTime();
  return Math.trunc(duration / 60000);
};

export const getFlightLegs = (flight: Flight) => {
  return flight.flight.legs.toSorted((leg1, leg2) => {
    return new Date(leg1.segments[0].departureDate).getTime() - new Date(leg2.segments[0].departureDate).getTime();
  });
};

const getLegDates = (leg: FlightLeg) => {
  const departureDate = leg.segments.find(s => s.starting)!.departureDate;
  const arrivalDate = leg.segments.reduce((maxDate, segment) => {
    maxDate = compareDates(maxDate, segment.departureDate).lateDate;
    return maxDate;
  }, leg.segments[0].departureDate);

  return { departureDate, arrivalDate };
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
  const fromHomeDates = getLegDates(leg1);
  const returnHomeDates = getLegDates(leg2);
  return {
    fromHome: {
      departureDate: fromHomeDates.departureDate,
      arrivalDate: fromHomeDates.arrivalDate,
      duration: leg1.duration,
    },
    returnHome: {
      departureDate: returnHomeDates.departureDate,
      arrivalDate: returnHomeDates.arrivalDate,
      duration: leg2.duration,
    },
  };
};
