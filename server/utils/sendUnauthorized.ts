import { H3Event } from 'h3';

export const sendUnauthorized = (
  event: H3Event,
  options?: {
    statusCode?: number;
    statusMessage?: string;
  }
) => {
  return sendError(
    event,
    createError({
      statusCode: options?.statusCode || 401,
      statusMessage: options?.statusMessage || 'Unauthorized',
    })
  );
};
