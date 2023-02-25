import { prisma } from '.';
import type { RegisterUserPrismaInput } from '~~/types/user';
import bcrypt from 'bcrypt';

export const createUser = (userData: RegisterUserPrismaInput) => {
  const saltRounds = 10;
  const finalData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, saltRounds),
  };

  return prisma.user.create({
    data: finalData,
  });
};

export const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};
