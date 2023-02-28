declare interface BaseResponse {
  code: number; // 状态码，非0 表示请求有错误
  msg: string;
}

// eslint-disable-next-line no-unused-vars
declare interface BaseDataResponse<T> extends BaseResponse {
  data: T;
}
