import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Create a connection pool with specific configuration
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'username',
  password: 'password',
  database: 'mydb',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

let db: NodePgDatabase;

/**
 * Function to get PG DB instance
 * 
 * NOTE: This always returns the same instance
 */
export const getPostgresInstance = () => {
  if (!db) {
    db = drizzle(pool);
  }

  return db;
}