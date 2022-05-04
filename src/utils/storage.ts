import { diskStorage } from 'multer';

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

export const saveMediaToStorage = {
  storage: diskStorage({
    destination: './media',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileTypes: validMimeType[] = validFileMime;
    allowedFileTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};
