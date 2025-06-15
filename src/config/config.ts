import { InternalServerError } from "@/exceptions/internal-server-error.exception";
import { Config } from "@/interfaces/config.interface";
import { ConfigSchema } from '@/schemas/config.schema';
import { env } from "@/utils/env.util";

/**
 * This class uses singleton pattern
 */
export class AppConfig implements Config {
  private static instance: AppConfig;

  public readonly NODE_ENV: Config['NODE_ENV'];
  public readonly PORT: Config['PORT'];
  public readonly POSTGRES_URL: Config['POSTGRES_URL'];
  public readonly MONGO_URL: Config['MONGO_URL'];
  public readonly JWT_ACCESS_TOKEN_EXPIRY: Config['JWT_ACCESS_TOKEN_EXPIRY'];
  public readonly JWT_REFRESH_TOKEN_EXPIRY: Config['JWT_REFRESH_TOKEN_EXPIRY'];
  public readonly JWT_ACCESS_TOKEN_SECRET: Config['JWT_ACCESS_TOKEN_SECRET'];
  public readonly JWT_REFRESH_TOKEN_SECRET: Config['JWT_REFRESH_TOKEN_SECRET'];
  public readonly WINDOW_SIZE_IN_SECONDS: Config['WINDOW_SIZE_IN_SECONDS'];
  public readonly MAX_REQUESTS: Config['MAX_REQUESTS'];
  public readonly VALKEY_HOST: Config['VALKEY_HOST'];
  public readonly VALKEY_PORT: Config['VALKEY_PORT'];

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor(env: Config) {
    this.NODE_ENV = env.NODE_ENV;
    this.PORT = env.PORT;
    this.POSTGRES_URL = env.POSTGRES_URL;
    this.MONGO_URL = env.MONGO_URL;
    this.JWT_ACCESS_TOKEN_EXPIRY = env.JWT_ACCESS_TOKEN_EXPIRY;
    this.JWT_REFRESH_TOKEN_EXPIRY = env.JWT_REFRESH_TOKEN_EXPIRY;
    this.JWT_ACCESS_TOKEN_SECRET = env.JWT_ACCESS_TOKEN_SECRET;
    this.JWT_REFRESH_TOKEN_SECRET = env.JWT_REFRESH_TOKEN_SECRET;
    this.WINDOW_SIZE_IN_SECONDS = env.WINDOW_SIZE_IN_SECONDS;
    this.MAX_REQUESTS = env.MAX_REQUESTS;
    this.VALKEY_HOST = env.VALKEY_HOST;
    this.VALKEY_PORT = env.VALKEY_PORT;
  }

  /**
   * Public static method to get the singleton instance
   */
  public static get(): AppConfig {
    if (!AppConfig.instance) {

      const result = ConfigSchema.safeParse(env);

      if (!result.success) {
        console.error('❌ Invalid environment variables:');
        console.error(result.error.format());
        throw new InternalServerError('Invalid environment variables');
      }

      AppConfig.instance = new AppConfig(result.data);
    }

    return AppConfig.instance;
  }
}

export const CONFIG = AppConfig.get();
