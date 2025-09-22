import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { isNoTokenRoute } from "./route-groups";
import Cookies from "js-cookie";
import { errorToast } from "@/app/components/ui/custom/toast";

const getAuthorizationToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("access_token");
    return token ? `Bearer ${token}` : null;
  }
  return null;
};

export function requestInterceptor(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  if (!isNoTokenRoute(config.url as string)) {
    const token = getAuthorizationToken();
    if (token) {
      config.headers.Authorization = token;
    }
  }

  if (!config.headers["Content-Type"] && !(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
}

export function requestErrorInterceptor(
  error: AxiosError,
): Promise<AxiosError> {
  return Promise.reject(error);
}

export function responseSuccessInterceptor(response: AxiosResponse): _TSFixMe {
  const url = response.config.url as string;
  if (
    (url.includes("/auth/login") || url.includes("/auth/register")) &&
    response.config.method === "post" &&
    response.data.access_token
  ) {
    Cookies.set("access_token", response.data.token);
  }

  return response.data;
}

export function responseErrorInterceptor(
  error: AxiosError<
    | {
        errors?: Record<string, _TSFixMe>;
        message?: string;
      }
    | string
  >,
): Promise<_TSFixMe> {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 401:
        if (
          typeof data === "object" &&
          ["invalid_token"].includes((data as _TSFixMe).error)
        ) {
          Cookies.remove("access_token");
          if (typeof window !== "undefined") {
            console.warn("Token expired, redirecting to login");
            errorToast({
              title: "Session expired",
              description: "Your session has expired. Please log in again.",
            });
            Cookies.remove("access_token");
            window.location.href = "/auth/login";
          }
        }
        break;

      case 422:
        if (typeof data === "object" && data.errors) {
          const errorKeys = Object.keys(data.errors);
          if (errorKeys.length > 0) {
            const firstError = data.errors[errorKeys[0]];
            const errorMessage = Array.isArray(firstError)
              ? firstError[0]
              : firstError;
            data.message = `${errorKeys[0]}: ${errorMessage}`;
          }
        }
        break;

      case 500:
        if (typeof data === "object") {
          data.message = "An error occurred while performing this request";
        }
        break;
    }

    return Promise.reject(
      typeof data === "object" ? data : { message: error.message },
    );
  }

  return Promise.reject({ message: error.message || "Network error occurred" });
}
