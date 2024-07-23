import { HttpClient } from "./httpClient";
import { ApiService } from "./apiService";

const httpService = new HttpClient();

const apiService = new ApiService(httpService);

export { apiService, httpService };
