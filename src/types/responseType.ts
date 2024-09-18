export interface KotlinResponseType<T> {
  statusCode: 'SUCCESS' | 'ERROR';
  data: T;
  message: string;
}

export interface NestResponseType {
  statusCode: number;
  error: string;
  message: string;
}
