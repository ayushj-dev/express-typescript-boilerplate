import { CONFIG } from "@/config/config";
import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

/**
 * Function to get Mongo DB instance
 *
 * NOTE: This always returns the same instance
 */
export const getMongoClient = () => {
  if (!client) {
    client = new MongoClient(CONFIG.MONGO_URL);
    client.connect(); // Connect once, reuse always
  }

  return client;
}
