import { sendError } from 'h3';
import type { RegisterUserInput } from '~~/types/user';
import { createUser } from '~~/server/db/users';
import { isValidEmail, isValidPassword } from '~~/utils/validator';
import { userTransformer } from '~~/server/transformers/user';

export default defineEventHandler(async event => {
  const body: RegisterUserInput = await readBody(event);
  const { username, email, password, confirmPassword, name } = body;

  if (!username || !email || !password || !confirmPassword || !name) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage:
          'Request body must contain username, email, password, confirmPassword, and name',
      })
    );
  }

  if (!isValidEmail(email)) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Email is not valid.',
      })
    );
  }

  if (!isValidPassword(password)) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage:
          'Password must be between 8 and 16 characters and cannot contain whitespace.',
      })
    );
  }

  if (password !== confirmPassword) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Passwords do not match',
      })
    );
  }

  const user = await createUser({
    username,
    email,
    password,
    name,
    profileImage: body.profileImage || 'https://i.imgur.com/0mG3nrJ.png',
  });

  return {
    data: userTransformer(user),
  };
});
