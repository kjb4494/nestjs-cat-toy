import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  // make root uploads dir
  try {
    console.log('Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log('The folder already exists...');
  }

  // make uploads dir
  try {
    console.log(`Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

// multer storage
const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, callback) {
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      callback(null, folderName);
    },
    filename(req, file, callback) {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString(
        'utf8',
      );
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(file.originalname, ext)}${Date.now()}${ext}`;
      callback(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
