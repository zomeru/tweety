import { isValidEmail } from '~~/utils/validator';
import jwtDecode from 'jwt-decode';
import { UserResponseType } from '~~/types/user';

export default () => {
  const useAuthToken = () => useState('auth_token');
  const useAuthUser = () =>
    useState('auth_user', () => null as unknown as UserResponseType);
  const useAuthLoading = () => useState('auth_loading', () => false);
  const useUserLoading = () => useState('user_loading', () => true);

  const setToken = (newToken: string) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser: UserResponseType) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const setIsUserLoading = (newLoading: boolean) => {
    const userLoading = useUserLoading();
    userLoading.value = newLoading;
  };

  const setAuthLoading = (newLoading: boolean) => {
    const authLoading = useAuthLoading();
    authLoading.value = newLoading;
  };

  const login = async ({
    usernameOrEmail,
    password,
  }: {
    usernameOrEmail: string;
    password: string;
  }) => {
    setAuthLoading(true);
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
        setAuthLoading(false);
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

  const reRefreshToken = () => {
    const authToken = useAuthToken();

    if (!authToken.value) return;

    const jwt = jwtDecode<{
      exp: number;
      iat: number;
      userId: string;
    }>(authToken.value as string);

    const expirationTime = jwt.exp - 60000;

    setTimeout(async () => {
      await refreshToken().then(reRefreshToken);
    }, expirationTime);
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsUserLoading(true);
        await refreshToken().then(async () => {
          await getUser();
        });

        reRefreshToken();

        resolve(true);
      } catch (error) {
        console.log('error initAuth - seAuth', error);
        reject(error);
      } finally {
        setIsUserLoading(false);
      }
    });
  };

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi('/api/auth/logout', {
          method: 'POST',
        });
        setToken('');
        setUser(null as unknown as UserResponseType);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    login,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading,
    useUserLoading,
    logout,
  };
};
