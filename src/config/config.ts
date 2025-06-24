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
  public readonly API_PREFIX: Config['API_PREFIX'];
  public readonly PORT: Config['PORT'];
  public readonly POSTGRES_URL: Config['POSTGRES_URL'];
  public readonly POSTGRES_HOST: Config['POSTGRES_HOST'];
  public readonly POSTGRES_PORT: Config['POSTGRES_PORT'];
  public readonly POSTGRES_USER: Config['POSTGRES_USER'];
  public readonly POSTGRES_PASSWORD: Config['POSTGRES_PASSWORD'];
  public readonly POSTGRES_DATABASE: Config['POSTGRES_DATABASE'];
  public readonly POSTGRES_MAX_POOL_CONNECTIONS: Config['POSTGRES_MAX_POOL_CONNECTIONS'];
  public readonly POSTGRES_IDLE_TIMEOUT_MS: Config['POSTGRES_IDLE_TIMEOUT_MS'];
  public readonly POSTGRES_CONNECTION_TIMEOUT_MS: Config['POSTGRES_CONNECTION_TIMEOUT_MS'];
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
    /* Express App related variables */
    this.NODE_ENV = env.NODE_ENV;
    this.API_PREFIX = env.API_PREFIX;
    this.PORT = env.PORT;

    /* SQL related varialbes */
    this.POSTGRES_URL = env.POSTGRES_URL;
    this.POSTGRES_HOST = env.POSTGRES_HOST;
    this.POSTGRES_PORT = env.POSTGRES_PORT;
    this.POSTGRES_USER = env.POSTGRES_USER;
    this.POSTGRES_PASSWORD = env.POSTGRES_PASSWORD;
    this.POSTGRES_DATABASE = env.POSTGRES_DATABASE;
    this.POSTGRES_MAX_POOL_CONNECTIONS = env.POSTGRES_MAX_POOL_CONNECTIONS;
    this.POSTGRES_IDLE_TIMEOUT_MS = env.POSTGRES_IDLE_TIMEOUT_MS;
    this.POSTGRES_CONNECTION_TIMEOUT_MS = env.POSTGRES_CONNECTION_TIMEOUT_MS;

    /* NoSQL related varialbes */
    this.MONGO_URL = env.MONGO_URL;

    /* JWT related varialbes */
    this.JWT_ACCESS_TOKEN_EXPIRY = env.JWT_ACCESS_TOKEN_EXPIRY;
    this.JWT_REFRESH_TOKEN_EXPIRY = env.JWT_REFRESH_TOKEN_EXPIRY;
    this.JWT_ACCESS_TOKEN_SECRET = env.JWT_ACCESS_TOKEN_SECRET;
    this.JWT_REFRESH_TOKEN_SECRET = env.JWT_REFRESH_TOKEN_SECRET;

    /* Rate limiting related varialbes */
    this.WINDOW_SIZE_IN_SECONDS = env.WINDOW_SIZE_IN_SECONDS;
    this.MAX_REQUESTS = env.MAX_REQUESTS;

    /* Valkey related varialbes */
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
