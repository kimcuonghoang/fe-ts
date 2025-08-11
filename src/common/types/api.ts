export type Params = {
  [key: string]: any;
  search?: string;
  page?: number;
  sort?: string;
  limit?: number;
  order?: string;
  fields?: string;
};

type MeteData = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export interface IResponse<T> {
  data: T;
  message: string;
  success: boolean;
  meta: MeteData;
}
