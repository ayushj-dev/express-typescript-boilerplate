export const ERROR_CONSTANTS = {
  ENV: {
    API_PREFIX: 'Must start with /',
    JWT_SECRET: 'JWT_SECRET must be at least 10 characters long',
    JWT_EXPIRY: 'JWT_EXPIRY must be at least 1',
    PORT: {
      LENGTH: "PORT must be exactly 4 characters long",
      REGEX: "PORT must contain only digits"
    },
    WINDOW_SIZE_IN_SECONDS: "WINDOW_SIZE_IN_SECONDS must be a positive number greater than 0 without 0 padding",
    MAX_REQUESTS: "MAX_REQUESTS must be a positive number greater than 0 without 0 padding",
    POSTGRES_MAX_POOL_CONNECTIONS: "POSTGRES_MAX_POOL_CONNECTIONS must be a positive number greater than 0 without 0 padding",
    POSTGRES_IDLE_TIMEOUT_MS: "POSTGRES_IDLE_TIMEOUT_MS must be a positive number greater than 0 without 0 padding",
    POSTGRES_CONNECTION_TIMEOUT_MS: "POSTGRES_CONNECTION_TIMEOUT_MS must be a positive number greater than 0 without 0 padding"
  }
};
