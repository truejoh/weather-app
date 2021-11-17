import axios, { AxiosInstance } from 'axios';
import { API_URL } from './config';

class HttpClient {
  httpClient: AxiosInstance;

  constructor(baseURL: string) {
    const httpClient = axios.create({
      baseURL,
    });
    this.httpClient = httpClient;
  }
}

export default new HttpClient(API_URL).httpClient;
