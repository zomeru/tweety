import { prisma } from '.';
import type { UserPrismaInput } from '~~/types/user';
import bcrypt from 'bcrypt';

export const createUser = async (userData: UserPrismaInput) => {
  const saltRounds = 10;
  const finalData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, saltRounds),
  };

  return await prisma.user.create({
    data: finalData,
  });
};
