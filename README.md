# Express Typescript Boilerplate

This is a ready to use express app skeleton integrated with typescript.

> NOTE:
> - This project uses class based architecture.
> - Never push .env files in real world projects, this is a boilerplate.
> - The methods in controllers are arrow functions. This is intentional since we are injecting service as a dependency and we want to preserve `this` binding. Make sure to only use arrow functions for methods in controllers.
> - This repo uses `@/path/to/your/file_name` syntax for file imports for consistency. (Recommended)

---

## Before you start the server
- Make sure to install `valkey` on your system as per your OS from - https://valkey.io/download/ and start it before running the template.
- Make sure that `Postgresql` is also installed and setup.

---

## 🧰 Tools & Technologies

These are the core technologies and infrastructure components used in the project:

| Tool / Tech | Description |
|-------------|-------------|
| [PostgreSQL](https://www.postgresql.org/docs/) | Relational database used for structured data. |
| [MongoDB](https://www.mongodb.com/docs/) | NoSQL document-oriented database. |
| [Valkey (via iovalkey)](https://valkey.io/docs/) | In-memory key-value data store (Redis fork), used for caching or ephemeral data. |

---

## 📦 Libraries & Frameworks

These libraries and frameworks provide the foundation and functionality for the application:

| Library / Framework | Description |
|---------------------|-------------|
| [Express](https://expressjs.com/) | Minimalist web framework for Node.js used to build APIs. |
| [Drizzle ORM](https://orm.drizzle.team/docs) | TypeScript-first SQL ORM used with PostgreSQL and other relational databases. |
| [Helmet](https://helmetjs.github.io/) | Helps secure Express apps by setting various HTTP headers. |
| [CORS](https://www.npmjs.com/package/cors) | Middleware to enable Cross-Origin Resource Sharing. |
| [Zod](https://zod.dev/) | TypeScript-first schema validation library. |
| [dotenv](https://www.npmjs.com/package/dotenv) | Loads environment variables from `.env` files into `process.env`. |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | Used to sign and verify JWT tokens for authentication. |
| [@node-rs/argon2](https://github.com/napi-rs/node-rs/tree/main/crates/argon2) | Native Node.js bindings for the Argon2 password hashing algorithm. |
| [Multer](https://github.com/expressjs/multer) | Middleware for handling `multipart/form-data` for file uploads. |
| [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) | Supports path aliasing in TypeScript projects. |

---

## 🧪 Development & Testing Utilities

| Package | Description |
|---------|-------------|
| [TypeScript](https://www.typescriptlang.org/) | Superset of JavaScript adding strong typing and modern language features. |
| [ts-node](https://typestrong.org/ts-node/) | Runs TypeScript files directly in Node.js. |
| [Mocha](https://mochajs.org/) | Testing framework for running unit and integration tests. |
| [Chai](https://www.chaijs.com/) | Assertion library used with Mocha for expressive test syntax. |
| [Supertest](https://github.com/visionmedia/supertest) | HTTP assertion library for testing Express APIs. |
| [drizzle-kit](https://orm.drizzle.team/docs/cli) | CLI tool for Drizzle ORM used for migrations and schema generation. |
| [@types/*](https://www.npmjs.com/) | Type definitions for libraries used during development for TypeScript support. |


---

## 🗂 Folder Structure
```
express-typescript-boilerplate/
├── docs/              # Documentation files
├── scripts/           # Utility or setup scripts (e.g., DB seeds, build tools)
├── src/               # Application source code
│   ├── app/           # App bootstrap and initialization logic
│   ├── config/        # Environment config and constants
│   ├── constants/     # Global constant values
│   ├── controllers/   # Route handler logic
│   ├── db/            # Database config, migrations, and Drizzle ORM setup
│   ├── exceptions/    # Custom error classes and error-handling logic
│   ├── interfaces/    # TypeScript interfaces for shared typing
│   ├── middlewares/   # Express middlewares (e.g., auth, logging)
│   ├── routes/        # API route definitions and mapping
│   ├── schemas/       # Zod or validation schemas for request bodies
│   ├── services/      # Business logic and domain services
│   ├── types/         # Global type declarations and utility types
│   ├── utils/         # Utility/helper functions
│   ├── valkey/        # Redis (valkey) integration, client and caching
│   └── index.ts       # App entry point
├── .env.development   # Environment variables for development
├── .env.test          # Environment variables for test
├── .gitignore         # Files to ignore in Git
├── LICENSE            # Project license
├── README.md          # Project overview and setup instructions
├── drizzle.config.ts  # Configuration for Drizzle ORM
├── package.json       # Project dependencies and scripts
├── package-lock.json  # Locked versions of installed packages
├── tsconfig.json      # TypeScript compiler configuration
```

---

## 📜 NPM Scripts

Below are the available NPM scripts defined in the `package.json` file:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "NODE_ENV=development ts-node -r tsconfig-paths/register src/index.ts",
  "test": "NODE_ENV=test mocha -r ts-node/esm tests/**/*.test.ts",
  "prod": "NODE_ENV=production npm run start",
  "db:generate": "npx drizzle-kit generate",
  "db:migrate": "npx drizzle-kit migrate",
  "generate-jwt-secret": "ts-node scripts/jwt-secret-generator.ts"
}
```

<div style="height: 8px"></div>

### 🔧 Script Descriptions

| Script                | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `build`               | Compiles the TypeScript project to JavaScript using `tsc`.                 |
| `start`               | Starts the compiled app from `dist/index.js`.                              |
| `dev`                 | Runs the app in development mode using `ts-node` with `tsconfig-paths`.    |
| `start:prod`          | Sets `NODE_ENV=production` and runs the compiled app.                      |
| `test`                | Runs test files using Mocha and `ts-node` in ESM mode.                     |
| `db:generate`         | Generates Drizzle ORM artifacts (e.g., types, schema snapshots).           |
| `db:migrate`          | Applies database migrations using Drizzle Kit.                             |
| `generate-jwt-secret` | Runs a script that generates a secure JWT secret using Node's crypto API.  |

> 💡 Tip: Run scripts using `npm run <script-name>`.
