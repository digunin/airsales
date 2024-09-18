import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST, FLIGHTS_ENDPOINT } from "./urls";
import { AirsalesResponse } from "../store/types";

export const flightsAPI = createApi({
  reducerPath: "flights",
  baseQuery: fetchBaseQuery({ baseUrl: API_HOST }),
  endpoints: (build) => ({
    loadData: build.query<AirsalesResponse, void>({
      query: () => ({
        url: FLIGHTS_ENDPOINT,
      }),
    }),
  }),
});

export const { useLoadDataQuery } = flightsAPI;
