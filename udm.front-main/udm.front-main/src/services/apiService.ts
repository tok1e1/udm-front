import { HttpClient } from "./httpClient";
import {
  Activity,
  LoginRequest,
  SignupRequest,
  User,
  CurrentUserEvents,
} from "../api";

export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getCurrentUser() {
    return this.httpClient.get<void, User>("/user/");
  }

  public getCurrentUserEvents() {
    return this.httpClient.get<void, CurrentUserEvents>("/user/registrations");
  }

  public signup(data: SignupRequest) {
    return this.httpClient.post<SignupRequest, { access_token: string }>(
      "/user/signup",
      data,
    );
  }

  public login(data: LoginRequest) {
    return this.httpClient.post<LoginRequest, { access_token: string }>(
      "/user/login",
      data,
    );
  }

  public logout() {
    return this.httpClient.get<void, void>("/user/logout");
  }

  public getEventInfo(id: string) {
    return this.httpClient.get<{ id: number }, void>(`/event/${id}`);
  }

  public getListOfActivities() {
    return this.httpClient.get<void, Activity[]>("/activity/");
  }

  public getActivityInfo(id: string) {
    return this.httpClient.get<void, Activity>(`/activity/${id}`);
  }

  public registerEvent(eventId: string) {
    return this.httpClient.get<void, void>(`/event/${eventId}/registration`);
  }

  public unregisterEvent(eventId: string) {
    return this.httpClient.get<void, void>(
      `/event/${eventId}/delete-registration`,
    );
  }
}
