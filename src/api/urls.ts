const prod_mode = process.env.NODE_ENV === "production";

export const API_HOST = prod_mode
  ? (process.env.API_HOST as string)
  : (process.env.TEST_API_HOST as string);

export const FLIGHTS_ENDPOINT = process.env.FLIGHTS_ENDPOINT as string;
