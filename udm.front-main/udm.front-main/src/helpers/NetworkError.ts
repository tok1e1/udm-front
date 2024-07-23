import { ErrorResponse } from "../api";
import { AxiosError } from "axios";

export class NetworkError extends Error {
  public readonly errorResponseData: ErrorResponse | undefined;
  public readonly errorResponse:
    | AxiosError<ErrorResponse>["response"]
    | undefined;

  public readonly code: string | undefined;

  constructor(error: AxiosError<ErrorResponse>) {
    super(error.response?.data.message ?? "Network Error");
    this.name = "Network Error";
    this.errorResponseData = error.response?.data;
    this.errorResponse = error.response;

    this.code = error.code;
  }
}
