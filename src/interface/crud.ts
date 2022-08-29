export interface ApiToastHandlerParams {
  callback: string | ((status: number) => string) | undefined;
  defaultMessage: string;
  error?: unknown;
  behavior?: "success" | "error";
}

export interface CrudDTO<T> {
  payload?: T;
  file?: File;
  id?: string;
  requestQuery?: { [key: string]: unknown };
  shouldToast?: boolean;
  onError?: string | ((status: number) => string);
  onSuccess?: string | (() => string);
}

export interface NextPaginateResponse<DataType = unknown> {
  count: number;
  data: DataType[];
  page: number;
  pageCount: number;
  total: number;
}
