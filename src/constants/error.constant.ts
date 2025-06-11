export const ERRORS = {
  ENV: {
    JWT_SECRET: 'JWT_SECRET must be at least 10 characters long',
    JWT_EXPIRY: 'JWT_EXPIRY must be at least 1',
    PORT: {
      LENGTH: "PORT must be exactly 4 characters long",
      REGEX: "PORT must contain only digits"
    },
    WINDOW_SIZE_IN_SECONDS: "WINDOW_SIZE_IN_SECONDS can only be a positive number greater than 0 without 0 padding",
    MAX_REQUESTS: "MAX_REQUESTS can only be a positive number greater than 0 without 0 padding"
  }
};
