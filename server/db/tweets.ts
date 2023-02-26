import { TweetPrismaInput } from '~~/types/tweets';
import { prisma } from '.';
import { Prisma } from '@prisma/client';

export const createTweet = (tweetData: TweetPrismaInput) => {
  return prisma.tweet.create({
    data: tweetData,
  });
};

export const getTweets = (params: Prisma.TweetFindManyArgs) => {
  return prisma.tweet.findMany({
    ...params,
  });
};
