import axios, { AxiosRequestConfig, Method } from "axios";
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseSuccessInterceptor,
  responseErrorInterceptor,
} from "./interceptor";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

axios.defaults.baseURL = baseURL;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
axios.interceptors.response.use(
  responseSuccessInterceptor,
  responseErrorInterceptor,
);

type ResponseData = _TSFixMe;
type RequestData = {
  [key: string]: _TSFixMe;
};

type UploadCallbackArgs = {
  name: string;
  loaded: number;
  total: number | undefined;
  percent: number;
  completed: boolean;
};

type UploadCallback = (args: UploadCallbackArgs) => void;

const get = (
  url: string,
  headers?: AxiosRequestConfig["headers"] | null,
  params?: AxiosRequestConfig["params"],
): Promise<ResponseData> =>
  axios.get(url, {
    ...(headers ? { headers } : {}),
    ...(params ? { params } : {}),
  });

const post = (
  url: string,
  data?: RequestData,
  headers?: AxiosRequestConfig["headers"],
): Promise<ResponseData> =>
  axios.post(url, data, {
    ...(headers ? { headers } : {}),
  });

const patch = (
  url: string,
  data?: RequestData,
  headers?: AxiosRequestConfig["headers"],
): Promise<ResponseData> =>
  axios.patch(url, data, {
    ...(headers ? { headers } : {}),
  });

const put = (
  url: string,
  data?: RequestData,
  headers?: AxiosRequestConfig["headers"],
): Promise<ResponseData> =>
  axios.put(url, data, {
    ...(headers ? { headers } : {}),
  });

const erase = (url: string): Promise<ResponseData> => axios.delete(url);

const upload = (
  url: string,
  name: string,
  data: FormData,
  onUploadCallback: UploadCallback,
  headers?: AxiosRequestConfig["headers"],
): Promise<ResponseData> =>
  axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(headers && headers),
    },
    onUploadProgress: ({ loaded, total }) => {
      const completed = loaded === total;
      const percent = total ? (loaded / total) * 100 : 0;
      onUploadCallback({ name, loaded, total, percent, completed });
    },
  });

const sendFormData = (
  url: string,
  data: FormData,
  headers?: AxiosRequestConfig["headers"],
): Promise<ResponseData> =>
  axios.patch(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(headers && headers),
    },
  });

const download = (method: Method, url: string): Promise<ResponseData> =>
  axios({ method, responseType: "blob", url });

export default {
  axios,
  get,
  post,
  patch,
  put,
  erase,
  upload,
  sendFormData,
  download,
};
