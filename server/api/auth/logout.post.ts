import { sendErrorMsg } from '~~/server/utils/sendErrorMsg';
import { sendRefreshToken } from '~~/server/utils/jwt';
import { removeRefreshToken } from '~~/server/db/refreshTokens';

export default defineEventHandler(async event => {
  try {
    const refreshToken = getCookie(event, 'refresh_token');

    if (!refreshToken) {
      return sendErrorMsg(event);
    }

    await removeRefreshToken(refreshToken);
  } catch (error) {
    return sendErrorMsg(event, {
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }

  sendRefreshToken(event, '');
  return {
    success: true,
  };
});
