import { Tweet, MediaFile } from '@prisma/client';
import { MediaFileResponse } from './mediafile';
import { UserResponseType } from './user';

export type TweetPrismaInput = Pick<Tweet, 'text' | 'authorId'>;

export type TweetOnlyResponse = Omit<
  Tweet,
  'authorId' | 'replyToId' | 'updatedAt'
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
