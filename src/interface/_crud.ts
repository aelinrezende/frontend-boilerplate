export interface DTO<T> {
  resource: string;
  data?: T;
  file?: File;
  id?: string;
  requestQuery?: { [key: string]: any };
}

export interface NextPaginateResponse<DataType = any> {
  count: number;
  data: DataType[];
  page: number;
  pageCount: number;
  total: number;
}
