import dotenv from 'dotenv';

import { AppVariables, DBVariables } from './types';

dotenv.config();

/** App config variables */
export const appConfig: AppVariables = {
  express: {
    port: process.env.PORT,
  },
  slack: {
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    oAuthAccessToken: process.env.SLACK_OAUTH_ACCESS_TOKEN,
  },
};

/** DB config variables */
export const dbConfig: DBVariables = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};
