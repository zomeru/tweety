import { TweetPrismaInput } from '~~/types/tweets';
import { prisma } from '.';

export const createTweet = (tweetData: TweetPrismaInput) => {
  return prisma.tweet.create({
    data: tweetData,
  });
};
