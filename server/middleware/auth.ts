import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '../utils/jwt';
import { sendUnauthorized } from '../utils/sendUnauthorized';
import { getUserById } from '../db/users';
import { userTransformer } from '../transformers/user';

export default defineEventHandler(async event => {
  const endpoints = ['/api/auth/user', '/api/user/tweets'];

  const isHandledByThisMiddleware = endpoints.some(endpoint => {
    const pattern = new UrlPattern(endpoint);
    return pattern.match(event.node.req.url || '');
  });

  if (!isHandledByThisMiddleware) {
    return;
  }

  const token = event.node.req.headers['authorization']?.split(' ')[1];

  if (!token) return sendUnauthorized(event);

  const decoded = decodeAccessToken(token);

  if (!decoded) return sendUnauthorized(event);

  try {
    const user = await getUserById(decoded.userId);

    if (!user) return sendUnauthorized(event);

    event.context.auth = userTransformer(user);
  } catch (error) {
    return sendUnauthorized(event, {
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }
});
