export type TServerResponse<P, E> = {
  payload: TPayload<P> | null;
  error: TErrorResponse<E> | null;
};

export type TPayload<T> = {
  data: T;
  meta: {
    totalData?: any;
    totalRowCount?: number;
    summary?: any;
    gwsShare?: number;
  };
};

type TErrorResponse<T> = {
  statusCode: number;
  message: string;
  data?: { id?: number | string; field?: keyof T; description?: string; data?: string };
};
