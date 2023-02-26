export interface TweetInput {
  text?: string;
  mediaFiles?: File[];
}

export default () => {
  // TODO: add type

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

  return {
    postTweet,
  };
};
