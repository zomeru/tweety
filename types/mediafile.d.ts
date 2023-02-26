import { MediaFile } from '@prisma/client';

export type MediaFilePrismaInput = Omit<
  MediaFile,
  'id' | 'createdAt' | 'updatedAt'
>;
