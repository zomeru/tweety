import { User } from '@prisma/client';
import { userTransformer } from '~~/server/transformers/user';

export interface RegisterUserInput
  extends Omit<User, 'id' | 'updatedAt' | 'createdAt'> {
  confirmPassword: string;
  password: string;
}

export type LoginUserInput = Pick<User, 'email' | 'username' | 'password'>;

export type RegisterUserPrismaInput = Omit<
  RegisterUserInput,
  'confirmPassword'
>;

export type UserResponseType = ReturnType<typeof userTransformer>;
