import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  production: true,
  baseUrl: process.env['BASE_URL'],
  // APP_VERSION: '0.0.1',
};
