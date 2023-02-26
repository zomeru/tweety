import formidable, { Fields, Files, File } from 'formidable';
import { createTweet } from '~~/server/db/tweets';
import { createMediaFile } from '~~/server/db/mediaFiles';
import { tweetTransformer } from '~~/server/transformers/tweet';
import { ResourceApiResponse } from 'cloudinary';

export default defineEventHandler(async event => {
  const form = formidable({});

  const response: {
    fields: Fields;
    files: Files;
  } = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  if (!response.fields.text && !response.files) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Caption or media is required',
      })
    );
  }

  const { fields, files } = response;
  const userId: string = event.context?.auth?.id;

  const tweetData = {
    authorId: userId,
    text: fields.text.toString(),
  };

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async key => {
    const file = files[key] as File;

    const cloudinaryResource = (await uploadToCloudinary(
      file.filepath
    )) as ResourceApiResponse['resources'][0];

    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId,
      tweetId: tweet.id,
    });
  });

  const fileResponse = await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
    fileResponse,
  };
});
