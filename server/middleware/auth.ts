import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '../utils/jwt';
import { sendErrorMsg } from '../utils/sendErrorMsg';
import { getUserById } from '../db/users';
import { userTransformer } from '../transformers/user';

export default defineEventHandler(async event => {
  const endpoints = [
    '/api/auth/user',
    '/api/auth/logout',
    '/api/user/tweets',
    '/api/tweets',
    '/api/tweets/:id',
  ];

  const isHandledByThisMiddleware = endpoints.some(endpoint => {
    const pattern = new UrlPattern(endpoint);
    return pattern.match(event.node.req.url || '');
  });

  if (!isHandledByThisMiddleware) {
    return;
  }

  const token = event.node.req.headers['authorization']?.split(' ')[1];

  if (!token) return sendErrorMsg(event);

  const decoded = decodeAccessToken(token);

  if (!decoded) return sendErrorMsg(event);

  try {
    const user = await getUserById(decoded.userId);

    if (!user) return sendErrorMsg(event);

    event.context.auth = userTransformer(user);
  } catch (error) {
    return sendErrorMsg(event, {
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }
});
