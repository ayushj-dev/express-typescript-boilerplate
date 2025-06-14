
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/sql/schema",
  dbCredentials: {
    url: "postgresql://username:password@localhost:5432/db"
  },
});
