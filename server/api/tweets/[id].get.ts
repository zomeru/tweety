import { Tweet } from '@prisma/client';
import { getTweetById } from '~~/server/db/tweets';
import { tweetTransformer } from '~~/server/transformers/tweet';
import { sendErrorMsg } from '~~/server/utils/sendErrorMsg';

export default defineEventHandler(async event => {
  const { id } = event.context.params as unknown as {
    id: string;
  };

  const tweet = await getTweetById(id, {
    include: {
      author: true,
      mediaFiles: true,
      replyTo: {
        include: {
          author: true,
        },
      },
      replies: {
        include: {
          mediaFiles: true,
          author: true,
          replyTo: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });

  if (!tweet?.id) {
    return sendErrorMsg(event, {
      statusCode: 404,
      statusMessage: 'Tweet not found',
    });
  }

  return {
    tweet: tweetTransformer(tweet),
  };
});
