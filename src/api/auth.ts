export const getUserInfo = async () => {
  const response = await fetch(`/api/auth/userInfo`, {
    method: 'GET',
  });

  const data = await response.json();
  return data.data;
};
