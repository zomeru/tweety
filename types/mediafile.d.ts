import { MediaFile } from '@prisma/client';
import { mediaFileTransformer } from '~~/server/transformers/mediaFiles';

export type MediaFilePrismaInput = Omit<
  MediaFile,
  'id' | 'createdAt' | 'updatedAt'
>;

export type MediaFileResponse = ReturnType<typeof mediaFileTransformer>;
