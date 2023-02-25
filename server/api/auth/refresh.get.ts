import { getRefreshToken } from '~~/server/db/refreshTokens';
import { decodeRefreshToken, generateTokens } from '~~/server/utils/jwt';
import { getUserById } from '~~/server/db/users';
import { sendUnauthorized } from '~~/server/utils/sendUnauthorized';

export default defineEventHandler(async event => {
  const refreshToken = getCookie(event, 'refresh_token');

  if (!refreshToken) return sendUnauthorized(event);

  const refreshTokenDB = await getRefreshToken(refreshToken);

  if (!refreshTokenDB) return sendUnauthorized(event);

  const token = decodeRefreshToken(refreshToken);

  try {
    if (!token) return sendUnauthorized(event);

    const user = await getUserById(token.userId);

    if (!user) return sendUnauthorized(event);

    const { accessToken } = generateTokens(user);

    return {
      access_token: accessToken,
    };
  } catch (error) {
    return sendUnauthorized(event, {
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }
});
