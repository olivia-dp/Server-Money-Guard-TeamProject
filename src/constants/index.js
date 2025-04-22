// src/constants/index.js
import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const TEMP_UPLOAD_DIR = path.resolve('src', 'temp');
export const UPLOADS_DIR = path.resolve('src', 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};
