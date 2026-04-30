import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface AuthUser {
  _id: string;
  email: string;
  displayName?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const apiLogin = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  return data;
};

export const apiSignup = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/signup", { email, password });
  return data;
};

export const apiLogout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const apiGetMe = async (): Promise<AuthUser> => {
  const { data } = await api.get<AuthUser>("/auth/me");
  return data;
};

export const apiUpdateProfile = async (displayName: string): Promise<AuthUser> => {
  const { data } = await api.patch<AuthUser>("/auth/me", { displayName });
  return data;
};

// ── Bookings ─────────────────────────────────────────────────────────────────

export interface BookingPayload {
  hotelId: string;
  hotelName: string;
  city: string;
  country: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  paymentMethod: string;
  cardLast4: string;
}

export const apiGetBookings = async () => {
  const { data } = await api.get("/bookings");
  return data;
};

export const apiCreateBooking = async (booking: BookingPayload) => {
  const { data } = await api.post("/bookings", booking);
  return data;
};

export const apiCancelBooking = async (id: string) => {
  const { data } = await api.patch(`/bookings/${id}/cancel`);
  return data;
};

// ── Favorites ─────────────────────────────────────────────────────────────────

export const apiGetFavorites = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/favorites");
  return data;
};

export const apiToggleFavorite = async (hotelId: string): Promise<string[]> => {
  const { data } = await api.post<string[]>(`/favorites/${hotelId}/toggle`);
  return data;
};

export default api;
