import bcrypt from 'bcrypt';
import { getUserByEmail, getUserByUsername } from '~~/server/db/users';
import { userTransformer } from '~~/server/transformers/user';
import { LoginUserInput } from '~~/types/user';
import { generateTokens, sendRefreshToken } from '~~/server/utils/jwt';
import { createRefreshToken } from '~~/server/db/refreshTokens';

export default defineEventHandler(async event => {
  const body: LoginUserInput = await readBody(event);
  const { email, password, username } = body;

  if (!email && !username) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or email is required',
      })
    );
  }

  if (!password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Password is required',
      })
    );
  }

  const errorMessage = 'Invalid username or password';
  let user;

  // Is the user registered?
  if (email) user = await getUserByEmail(email);
  if (username) user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: errorMessage,
      })
    );
  }

  // Is the password correct?
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: errorMessage,
      })
    );
  }

  // Generate a JWT
  const { accessToken, refreshToken } = generateTokens(user);

  // Save the refresh token to the database
  await createRefreshToken({
    userId: user.id,
    token: refreshToken,
  });

  // Add httpOnly cookie to the response
  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
