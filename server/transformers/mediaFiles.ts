import { MediaFile } from '@prisma/client';

export const mediaFileTransformer = (mediaFile: MediaFile) => {
  return {
    id: mediaFile.id,
    url: mediaFile.url,
  };
};
