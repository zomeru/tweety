export default <T>(url: string, options: any = {}): T => {
  const { useAuthToken } = useAuth();

  return $fetch(url, {
    ...options,
    method: options?.method || 'GET',
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`,
    },
  }) as T;
};
