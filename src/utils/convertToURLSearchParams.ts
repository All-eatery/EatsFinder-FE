import { ParamsProps } from '@/types/paramsType';

export const convertToURLSearchParams = ({ searchParams }: ParamsProps) => {
  const queryParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => queryParams.append(key, val));
    } else if (value !== undefined) {
      queryParams.set(key, value);
    }
  });
  return queryParams;
};
