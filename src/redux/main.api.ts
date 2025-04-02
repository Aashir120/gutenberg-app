import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export enum BookApiTagTypes {
  Books = "books",
  Analyze = "analyze",
}
type BQFn = BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig["method"];
    body?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
    onUploadProgress?: AxiosRequestConfig["onUploadProgress"];
    onDownloadProgress?: AxiosRequestConfig["onDownloadProgress"];
  },
  unknown,
  unknown
>;
const AxiosBaseQuery = (
  { baseUrl, root }: { baseUrl: string; root?: string } = { baseUrl: "" }
): BQFn => {
  baseUrl = (root ?? import.meta.env.VITE_API_URL) + baseUrl;
  return async ({
    url,
    method,
    body,
    params,
    headers,
    onUploadProgress,
    onDownloadProgress,
  }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers,
        onUploadProgress,
        onDownloadProgress,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

export const BookApi = createApi({
  reducerPath: "BookApi",
  baseQuery: AxiosBaseQuery({
    root: import.meta.env.VITE_API_URL,
    baseUrl: "/",
  }),
  // refetchOnMountOrArgChange: true,
  // keepUnusedDataFor: 0,
  tagTypes: Array.from(Object.values(BookApiTagTypes)),
  endpoints: () => ({}),
});
