import { getRefreshToken } from '~~/server/db/refreshTokens';
import { decodeRefreshToken, generateTokens } from '~~/server/utils/jwt';
import { getUserById } from '~~/server/db/users';
import { sendErrorMsg } from '~~/server/utils/sendErrorMsg';

export default defineEventHandler(async event => {
  const refreshToken = getCookie(event, 'refresh_token');

  if (!refreshToken) return sendErrorMsg(event);

  const refreshTokenDB = await getRefreshToken(refreshToken);

  if (!refreshTokenDB) return sendErrorMsg(event);

  const token = decodeRefreshToken(refreshToken);

  try {
    if (!token) return sendErrorMsg(event);

    const user = await getUserById(token.userId);

    if (!user) return sendErrorMsg(event);

    const { accessToken } = generateTokens(user);

    return {
      access_token: accessToken,
    };
  } catch (error) {
    return sendErrorMsg(event, {
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }
});
