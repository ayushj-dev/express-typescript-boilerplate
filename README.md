# Express Typescript Boilerplate

This is a ready to use express app skeleton integrated with typescript.

> NOTE:
> - This project uses class based architecture.
> - Never push .env files in real world projects, this is a boilerplate.
> - The methods in controllers are arrow functions. This is intentional since we are injecting service as a dependency and we want to preserve `this` binding. Make sure to only use arrow functions for methods in controllers.
> - This repo uses `@/path/to/your/file_name` syntax for file imports for consistency. (Recommended)

## Before you start the server
- Make sure to install `valkey` on your system as per your OS from - https://valkey.io/download/ and start it before running the template.
- Make sure that `Postgresql` is also installed and setup.
