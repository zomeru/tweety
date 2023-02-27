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

export const getRefreshToken = (token: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });
};

export const removeRefreshToken = (token: string) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};
