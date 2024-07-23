import axios, { AxiosError, AxiosInstance } from "axios";
import { NetworkError } from "../helpers/NetworkError";
import { ErrorResponse } from "../api";

export class HttpClient {
  http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "http://212.41.9.132:8080",
      withCredentials: true,
    });

    this.http.interceptors.request.use((request) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        request.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "access_token",
        )}`;
      }
      return request;
    });
  }

  public async post<T, R>(url: string, data: T) {
    try {
      const response = await this.http.post<R>(url, data);
      return response.data;
    } catch (error) {
      return Promise.reject(
        new NetworkError(error as unknown as AxiosError<ErrorResponse>),
      );
    }
  }

  public async get<T, R>(url: string, params?: T) {
    try {
      const result = await this.http.get<R>(url, { params });
      return result.data;
    } catch (error) {
      return Promise.reject(
        new NetworkError(error as unknown as AxiosError<ErrorResponse>),
      );
    }
  }
}
