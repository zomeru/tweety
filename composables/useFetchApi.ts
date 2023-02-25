export default async (url: string, options: RequestInit = {}) => {
  const { useAuthToken } = useAuth();

  const { headers, ...rest } = options;
  const res = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      Authorization: `Bearer ${useAuthToken().value}`,
    },
  });
  if (res.ok) {
    return res.json();
  }
  const error = await res.json();
  throw new Error(error.message);
};
