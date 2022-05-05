import { diskStorage } from 'multer';
import { customAlphabet } from 'nanoid';
const path = require('path');

type validMimeType =
  | 'image/jpg'
  | 'image/png'
  | 'image/jpeg'
  | 'video/mp4'
  | 'video/x-flv'
  | 'video/x-ms-wmv'
  | 'video/3gpp';

const validFileMime: validMimeType[] = [
  'image/jpg',
  'image/png',
  'image/jpeg',
  'video/mp4',
  'video/x-flv',
  'video/x-ms-wmv',
  'video/3gpp',
];

const idGenerator = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
);

export const saveMediaToStorage = {
  storage: diskStorage({
    destination: './media',
    filename: (req, file, cb) => {
      const fileExtentsion: string = path.extname(file.originalname);
      const fileName: string = idGenerator() + fileExtentsion;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileTypes: validMimeType[] = validFileMime;
    allowedFileTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};
