import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { RuntimeConfig } from 'nuxt/schema';
import { H3Event } from 'h3';
import type { DecodedToken } from '~~/types/token';

const generateAccessToken = (user: User, config: RuntimeConfig) => {
  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: '7d',
  });
};

const generateRefreshToken = (user: User, config: RuntimeConfig) => {
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: '30d',
  });
};

export const decodeAccessToken = (token: string): DecodedToken | null => {
  const config = useRuntimeConfig();

  try {
    return jwt.verify(token, config.jwtAccessSecret) as DecodedToken;
  } catch (error) {
    return null;
  }
};

export const decodeRefreshToken = (token: string): DecodedToken | null => {
  const config = useRuntimeConfig();

  try {
    return jwt.verify(token, config.jwtRefreshSecret) as DecodedToken;
  } catch (error) {
    return null;
  }
};

export const generateTokens = (user: User) => {
  const config = useRuntimeConfig();

  const accessToken = generateAccessToken(user, config);
  const refreshToken = generateRefreshToken(user, config);

  return {
    accessToken,
    refreshToken,
  };
};

export const sendRefreshToken = (event: H3Event, token: string) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
  });
};
