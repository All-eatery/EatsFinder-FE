export const convertToURLSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
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
