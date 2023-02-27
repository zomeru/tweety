import { MediaFile, Tweet, User } from '@prisma/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TweetResponse, TweetTransformerResponse } from '~~/types/tweets';
import { mediaFileTransformer } from './mediaFiles';
import { userTransformer } from './user';

dayjs.extend(relativeTime);

export const tweetTransformer = (tweet: TweetTransformerResponse) => {
  const data: any = {
    id: tweet.id,
    text: tweet.text,
    postedAt: dayjs(tweet.createdAt).fromNow(),
  };

  if (tweet.mediaFiles)
    data.mediaFiles = !!tweet.mediaFiles
      ? tweet.mediaFiles.map(media => mediaFileTransformer(media as MediaFile))
      : [];

  if (tweet.author)
    data.author = !!tweet.author ? userTransformer(tweet.author as User) : null;

  if (tweet.replies) {
    data.replies = !!tweet.replies ? tweet.replies.map(tweetTransformer) : [];
    data.repliesCount = !!tweet.replies ? tweet.replies.length : 0;
  }

  if (tweet.replyTo)
    data.replyTo = !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null;

  return data as TweetResponse;
};
