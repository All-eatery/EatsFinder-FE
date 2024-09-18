export interface KotlinResponseType<T> {
  statusCode: 'SUCCESS' | 'ERROR';
  data: T;
  message: string;
}
