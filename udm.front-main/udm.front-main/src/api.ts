export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  name: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  events: Event[];
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  events: Event[] | null;
  slug: string;
}

export interface Event {
  id: number;
  title: string;
  start_time: string;
  finish_time: string;
  place: string;
  coach: string;
  is_registered: boolean;
}

export interface CurrentUserEvents {
  events: Event[];
}

export interface ErrorResponse {
  message?: string;
}
