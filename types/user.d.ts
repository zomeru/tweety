import { User } from '@prisma/client';

export interface UserInput
  extends Omit<User, 'id' | 'updatedAt' | 'createdAt'> {
  confirmPassword: string;
  password: string;
}

export type UserPrismaInput = Omit<UserInput, 'confirmPassword'>;
