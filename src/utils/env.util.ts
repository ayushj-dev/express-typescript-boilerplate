import dotenv from 'dotenv';

/**
 * Getting env passed during npm run command (see package.json > scripts)
 */
const ENV = process.env.NODE_ENV;

/**
 * Configuring dotenv to use correct .env file based on environment passed
 */
dotenv.config({
  path: `.env.${ENV}`
});

export const env = process.env;
