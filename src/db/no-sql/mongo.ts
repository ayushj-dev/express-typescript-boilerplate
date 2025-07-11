import { CONFIG } from "@/config/config";
import { MongoClient } from "mongodb";

/**
 * Singleton class to initialize and get Mongo DB instance
 *
 * NOTE: This always returns the same instance
 */
class MongoDbClient {
  private static client: MongoClient | null = null;

  private constructor() { }

  public static getInstance() {
    if (MongoDbClient.client) return MongoDbClient.client;

    try {
      MongoDbClient.client = new MongoClient(CONFIG.MONGO_URL); // Connect once, reuse always

      return MongoDbClient.client;
    } catch (error) {
      throw new Error(`Mongo DB client failed to connect to the server, ${error}`);
    }
  }
}

export const mongoClient = MongoDbClient.getInstance();
