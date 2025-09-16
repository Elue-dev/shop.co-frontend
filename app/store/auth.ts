import { create } from "zustand";
import Cookies from "js-cookie";
import { Account } from "../types/auth";
import client from "../services/client";
import { ErrorWrapper } from "../services/wrapper";

interface AuthState {
  account: Account | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: ({
    name,
    email,
    first_name,
    last_name,
    type,
    password,
  }: RegisterFields) => Promise<void>;
  requestActivation: (id: string) => Promise<void>;
  activate: (id: string, otp: string) => Promise<void>;
  logout: (onComplete?: () => void) => void;
  clearError: () => void;
  initializeAuth: () => void;
}

interface RegisterFields {
  name: string;
  email: string;
  first_name: string;
  password: string;
  last_name: string;
  type: "buyer" | "seller";
}

export const useAuthStore = create<AuthState>((set) => ({
  account: null,
  token: null,
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
        account: data,
        token: token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: _TSFixMe) {
      const errorMessage = error.error || error.message || "Login failed";
      set({
        account: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      throw new ErrorWrapper(errorMessage);
    }
  },

  register: async ({
    name,
    email,
    first_name,
    last_name,
    type,
    password,
  }: RegisterFields) => {
    set({ isLoading: true, error: null });

    try {
      const response = await client.post("/auth/register", {
        name,
        email,
        first_name,
        last_name,
        type,
        password,
      });
      const { data, token } = response;

      if (token) {
        Cookies.set("user", JSON.stringify(data));
        Cookies.set("access_token", token);
      }

      set({
        account: data,
        token: token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: _TSFixMe) {
      set({
        account: null,
        isAuthenticated: false,
        isLoading: false,
        error: error,
      });
      throw new ErrorWrapper(error);
    }
  },

  requestActivation: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await client.post("/auth/activate/request", { id });

      set({
        isLoading: false,
        error: null,
      });
    } catch (error: _TSFixMe) {
      const errorMessage =
        error.error || error.message || "Activation request failed";
      console.log({ "error.error": error.error });
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  activate: async (id: string, token: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await client.post("/auth/activate", { id, token });

      set({
        account: response.data,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: _TSFixMe) {
      const errorMessage = error.error || error.message || "Activation failed";
      console.log({ "error.error": error.error });
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  logout: (onComplete) => {
    Cookies.remove("access_token");
    Cookies.remove("user");

    set({
      account: null,
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
        account: user ? JSON.parse(user) : null,
        isAuthenticated: true,
        error: null,
      });
    } else {
      Cookies.remove("access_token");
      Cookies.remove("user");
      set({
        account: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },
}));
