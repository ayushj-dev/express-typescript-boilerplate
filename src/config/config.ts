import dotenv from 'dotenv';
import path from "path";
import { Config } from "../interfaces/config.interface";
import { ConfigSchema } from '../schemas/config.schema';

/**
 * Getting env passed during npm run command (see package.json > scripts)
 */
const ENV = process.env.NODE_ENV;

/**
 * Configuring dotenv to use correct .env file based on environment passed
 */
dotenv.config({
  path: path.resolve(__dirname, `../../.env.${ENV}`)
});

/**
 * This class uses singleton pattern
 */
export class AppConfig implements Config {
  private static instance: AppConfig;

  public readonly NODE_ENV: Config['NODE_ENV'];
  public readonly PORT: Config['PORT'];
  public readonly DATABASE_URL: Config['DATABASE_URL'];
  public readonly JWT_ACCESS_TOKEN_EXPIRY: Config['JWT_ACCESS_TOKEN_EXPIRY'];
  public readonly JWT_REFRESH_TOKEN_EXPIRY: Config['JWT_REFRESH_TOKEN_EXPIRY'];
  public readonly JWT_ACCESS_TOKEN_SECRET: Config['JWT_ACCESS_TOKEN_SECRET'];
  public readonly JWT_REFRESH_TOKEN_SECRET: Config['JWT_REFRESH_TOKEN_SECRET'];

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor(env: Config) {
    this.NODE_ENV = env.NODE_ENV;
    this.PORT = env.PORT;
    this.DATABASE_URL = env.DATABASE_URL;
    this.JWT_ACCESS_TOKEN_EXPIRY = env.JWT_ACCESS_TOKEN_EXPIRY;
    this.JWT_REFRESH_TOKEN_EXPIRY = env.JWT_REFRESH_TOKEN_EXPIRY;
    this.JWT_ACCESS_TOKEN_SECRET = env.JWT_ACCESS_TOKEN_SECRET;
    this.JWT_REFRESH_TOKEN_SECRET = env.JWT_REFRESH_TOKEN_SECRET;
  }

  /**
   * Public static method to get the singleton instance
   */
  public static get(): AppConfig {
    if (!AppConfig.instance) {

      const result = ConfigSchema.safeParse(process.env);

      if (!result.success) {
        console.error('❌ Invalid environment variables:');
        console.error(result.error.format());
        throw new Error('Invalid environment variables');
      }

      AppConfig.instance = new AppConfig(result.data);
    }

    return AppConfig.instance;
  }
}

export const CONFIG = AppConfig.get();
