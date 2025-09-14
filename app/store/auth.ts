import { create } from "zustand";
import Cookies from "js-cookie";
import { User } from "../types/auth";
import client from "../services/client";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: (onComplete?: () => void) => void;
  clearError: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await client.post("/auth/login", { email, password });
      const { data, token } = response;

      if (token) {
        Cookies.set("user", JSON.stringify(data));
        Cookies.set("access_token", token);
      }

      set({
        user: data,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: _TSFixMe) {
      const errorMessage = error.error || error.message || "Login failed";
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  },

  logout: (onComplete) => {
    Cookies.remove("access_token");
    Cookies.remove("user");

    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });

    if (onComplete) onComplete();
  },

  clearError: () => set({ error: null }),

  initializeAuth: () => {
    const token = Cookies.get("access_token");

    if (token) {
      const user = Cookies.get("user");
      set({
        user: user ? JSON.parse(user) : null,
        isAuthenticated: true,
        error: null,
      });
    } else {
      Cookies.remove("access_token");
      Cookies.remove("user");
      set({
        user: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },
}));
