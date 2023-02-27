import { TweetResponse } from '~~/types/tweets';

export interface TweetInput {
  text?: string;
  mediaFiles?: File[];
  replyTo?: string;
}

export default () => {
  const usePostTweetModalStatus = () =>
    useState('post_tweet_modal_status', () => false);
  const useReplyTweet = () =>
    useState<null | TweetResponse>('reply_tweet', () => null);

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModalStatus();
    postTweetModal.value = false;
  };

  const openPostTweetModal = (tweet?: TweetResponse) => {
    const postTweetModal = usePostTweetModalStatus();
    postTweetModal.value = true;

    setReplyToTweet(tweet || null);
  };

  const setReplyToTweet = (tweet: TweetResponse | null) => {
    const replyTweet = useReplyTweet();
    replyTweet.value = tweet;
  };

  const postTweet = (
    tweet: TweetInput
  ): Promise<{
    tweet: TweetResponse;
    files?: TweetResponse['mediaFiles'];
  }> => {
    if (!tweet.text && !tweet.mediaFiles) {
      throw new Error('Tweet caption or media files are required');
    }

    const form = new FormData();

    form.append('text', tweet.text || '');

    if (tweet.replyTo) form.append('replyTo', tweet.replyTo);

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

  const getHomeTweets = (): Promise<{
    tweets: TweetResponse[];
  }> => {
    return new Promise((resolve, reject) => {
      try {
        const response = useFetchApi<{
          tweets: TweetResponse[];
        }>('/api/tweets', {
          method: 'GET',
        });
        resolve(response);
      } catch (error) {
        console.log('error getTweets - useTweets', error);
        reject(error);
      }
    });
  };

  const getTweetById = (
    tweetId: string
  ): Promise<{
    tweet: TweetResponse;
  }> => {
    return new Promise((resolve, reject) => {
      try {
        const response = useFetchApi<{
          tweet: TweetResponse;
        }>(`/api/tweets/${tweetId}`);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    postTweet,
    getHomeTweets,
    getTweetById,
    usePostTweetModalStatus,
    closePostTweetModal,
    openPostTweetModal,
    useReplyTweet,
  };
};
