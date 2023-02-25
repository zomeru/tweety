import { prisma } from '.';

interface Token {
  userId: string;
  token: string;
}

export const createRefreshToken = (token: Token) => {
  return prisma.refreshToken.create({
    data: token,
  });
};
