export interface IMeta {
  limit: number;
  page: number;
  count: number;
}

export type ResponseSuccessType = {
  data: any;
  statusCode?: number;
  message?: string;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
