export interface ApiToastHandlerParams {
  callback: string | ((errors: unknown) => unknown) | undefined;
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
  onError?: string | ((errors: unknown) => unknown);
  onSuccess?: string | ((data: unknown) => unknown);
}

export interface NextPaginateResponse<DataType = unknown> {
  count: number;
  data: DataType[];
  page: number;
  pageCount: number;
  total: number;
}
