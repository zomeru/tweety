import { User } from '@prisma/client';

export const userTransformer = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    profileImage: user.profileImage,
  };
};
