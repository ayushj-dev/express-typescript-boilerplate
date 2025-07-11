import { CONFIG } from '@/config/config';
import { app } from '@/app/app';
// import { db } from "@/db/sql/postgres";
import { mongoClient } from './db/no-sql/mongo';
import { logger } from './utils/logger.util';
import { Server } from 'http';

let server: Server;

/**
 * Function to start the server once all the prerequisites are satisfied like connecting to dbs etc.
 */
const startServer = async () => {
  try {
    await mongoClient.connect();
    console.log(`Mongo DB client connected successfully!`);

    server = app.listen(CONFIG.PORT, () => {
      console.log(`Server is running on port ${CONFIG.PORT} in ${CONFIG.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error(error);

    /* Stop the server if any error occurs at the time of boot */
    process.exit(1);
  }
}

/**
 * Function to handle shutdown gracefully
 */
const handleShutdown = async () => {
  console.log(`\n-------- APP SHUTTING DOWN --------\n`);

  // Stop listening to incoming requests
  if (server) {
    server.close((err) => {
      if (err) {
        console.error('Error closing server:', err);
        process.exit(1);
      }

      console.log(`\n Express server closed successfully! \n`)
    });
  }

  // Close mongo db connection
  if (mongoClient) {
    await mongoClient.close();
    console.log('MongoDB client disconnected successfully!');
  }

  console.log(`\n-------- APP SHUTDOWN SUCCESSFULLY --------\n`);

  process.exit(0);
}

/* Starting the server */
startServer();

/**
 * Graceful shutdown on app termination
 *
 * SIGINT: Sent when you press Ctrl+C in the terminal.
 * SIGTERM: The standard signal sent by kill, docker stop, kubectl delete pod, etc.
 */
process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);
