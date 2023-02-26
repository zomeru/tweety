import { Tweet } from '@prisma/client';

export const tweetTransformer = (tweet: Tweet) => {
  return {
    id: tweet.id,
    text: tweet.text,
  };
};
