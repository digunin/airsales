import { http, HttpResponse } from 'msw';
import { result } from './flights';
import { FLIGHTS_ENDPOINT } from '../api/urls';

export const handlers = [
  http.get(FLIGHTS_ENDPOINT, () => {
    return HttpResponse.json({ result });
  }),
];
