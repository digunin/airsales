export type FlightsSorting = 'price-asc' | 'price-desc' | 'duration';

export type FiltersState = {
  transfers: number;
  price: {
    from: number | null;
    to: number | null;
  };
  airlines: string[];
};

export type SortingState = {
  mode: FlightsSorting;
};

type PassangerTypeUID = 'ADULT';
type CurrencyCode = 'RUB';

type FlightSegment = {
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
};

export type AirsalesResponse = {
  result: {
    flights: Flight[];
  };
};
