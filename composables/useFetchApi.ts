export default <T>(url: string, options: any = {}): T => {
  const { useAuthToken } = useAuth();

  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`,
    },
  }) as T;
};
