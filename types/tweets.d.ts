import { Tweet, MediaFile } from '@prisma/client';
import { MediaFileResponse } from './mediafile';
import { UserResponseType } from './user';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type TweetPrismaInput = Pick<Tweet, 'text' | 'authorId'>;

export type TweetOnlyResponse = Optional<
  Omit<Tweet, 'authorId' | 'replyToId' | 'updatedAt'>,
  'createdAt'
>;

export interface TweetTransformerResponse extends TweetOnlyResponse {
  mediaFiles?: MediaFileResponse[];
  author?: UserResponseType | null;
  replies?: TweetTransformerResponse[];
  replyTo?: TweetTransformerResponse | null;
  repliesCount?: number;
  postedAt?: string;
}

export type TweetResponse = Omit<TweetTransformerResponse, 'createdAt'>;
