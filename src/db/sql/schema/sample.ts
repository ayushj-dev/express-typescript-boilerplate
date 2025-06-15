import { sql } from 'drizzle-orm';
import { integer, timestamp, pgTable, varchar } from "drizzle-orm/pg-core";

export const sampleTable = pgTable("sample", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sample_text: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull().$onUpdate(() => sql`now()`)
});
