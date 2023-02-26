import { MediaFilePrismaInput } from '~~/types/mediafile';
import { prisma } from '.';

export const createMediaFile = (mediaFile: MediaFilePrismaInput) => {
  return prisma.mediaFile.create({
    data: mediaFile,
  });
};
