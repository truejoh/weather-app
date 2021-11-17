import { AxiosResponse } from 'axios';
import httpClient from './httpClient';

export const getLocations = (
  latt: number,
  long: number,
): Promise<AxiosResponse<any, any>> =>
  httpClient.get('/location/search/', {
    params: {
      lattlong: `${latt}, ${long}`,
    },
  });

export const getWeather = (woeid: number): Promise<AxiosResponse<any, any>> =>
  httpClient.get(`/location/${woeid}`);
