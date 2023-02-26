import { TweetResponse } from '~~/types/tweets';

export interface TweetInput {
  text?: string;
  mediaFiles?: File[];
}

export default () => {
  const postTweet = (tweet: TweetInput) => {
    if (!tweet.text && !tweet.mediaFiles) {
      throw new Error('Tweet caption or media files are required');
    }

    const form = new FormData();

    form.append('text', tweet.text || '');

    if (tweet.mediaFiles) {
      tweet.mediaFiles.forEach((file, index) => {
        form.append(`media_file_${index}`, file);
      });
    }

    return useFetchApi('/api/user/tweets', {
      method: 'POST',
      body: form,
    });
  };

  const getHomeTweets = (): Promise<TweetResponse[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { tweets } = await useFetchApi<{
          tweets: TweetResponse[];
        }>('/api/tweets', {
          method: 'GET',
        });
        resolve(tweets || []);
      } catch (error) {
        console.log('error getTweets - useTweets', error);
        reject(error);
      }
    });
  };

  return {
    postTweet,
    getHomeTweets,
  };
};
