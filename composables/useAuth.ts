import { isValidEmail } from '~~/utils/validator';

export default () => {
  const useAuthToken = () => useState('auth_token');
  const useAuthUser = () => useState('auth_user');
  const loading = ref(false);
  const loadingUser = ref(true);

  const setToken = (newToken: string) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser: any) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const login = async ({
    usernameOrEmail,
    password,
  }: {
    usernameOrEmail: string;
    password: string;
  }) => {
    loading.value = true;
    const isEmail = isValidEmail(usernameOrEmail);

    let body: any = {
      password,
    };

    if (isEmail) body.email = usernameOrEmail;
    else body.username = usernameOrEmail;

    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body,
        });

        setToken(data.access_token);
        setUser(data.user);
        resolve(true);
      } catch (error) {
        console.log('error login - useAuth', error);
        reject(error);
      } finally {
        loading.value = false;
      }
    });
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh');

        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${useAuthToken().value}`,
          },
        });

        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const initAuth = () => {
    loadingUser.value = true;
    return new Promise(async (resolve, reject) => {
      try {
        await refreshToken().then(async () => {
          await getUser();
        });

        resolve(true);
      } catch (error) {
        console.log('error initAuth - seAuth', error);
        reject(error);
      } finally {
        loadingUser.value = false;
      }
    });
  };

  return {
    login,
    useAuthUser,
    useAuthToken,
    initAuth,
    loading,
    loadingUser,
  };
};
