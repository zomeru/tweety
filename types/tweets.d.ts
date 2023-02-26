import { Tweet } from '@prisma/client';

export type TweetPrismaInput = Pick<Tweet, 'text' | 'authorId'>;
