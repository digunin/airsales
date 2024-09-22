export type SortMode =
  | 'price'
  | 'duration-from-home'
  | 'duration-return-to-home'
  | 'duration-total'
  | 'duration-from-departure-to-returning';

export type SortOrder = 'asc' | 'desc';

export type FiltersState = {
  transfers: {
    nonstop: boolean;
    oneStop: boolean;
  };
  price: {
    from: number | null;
    to: number | null;
  };
  airlines: string[];
};

export type SortingState = {
  mode: SortMode;
  order: SortOrder;
};

type CurrencyCode = 'RUB';

export type FlightSegment = {
  departureAirport: {
    uid: string;
    caption: string;
  };
  departureCity: {
    uid: string;
    caption: string;
  };
  arrivalAirport: {
    uid: string;
    caption: string;
  };
  arrivalCity: {
    uid: string;
    caption: string;
  };
  arrivalDate: string;
  departureDate: string;
  starting: boolean;
  airline: {
    uid: string;
    caption: string;
    airlineCode: string;
  };
};

export type FlightLeg = {
  duration: number;
  segments: FlightSegment[];
};

export type Flight = {
  flight: {
    carrier: {
      caption: string;
    };
    price: {
      total: {
        amount: string;
        currencyCode: CurrencyCode;
      };
    };
    legs: FlightLeg[];
  };
  flightToken: string;
};

export type AirsalesResponse = {
  result: {
    flights: Flight[];
  };
};

export type FlightLegSummary = {
  departureSegment: FlightSegment;
  arrivalSegment: FlightSegment;
  duration: number;
  transfers: number;
};

export type FilterPredicate = (filters: FiltersState, flight: Flight) => boolean;
