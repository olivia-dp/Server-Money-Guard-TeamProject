// src/constants/index.js
import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');