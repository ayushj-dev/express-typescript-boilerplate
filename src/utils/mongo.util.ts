import { Collection, ObjectId, Document, Filter, UpdateFilter, InsertOneModel, UpdateResult, UpdateOptions, AnyBulkWriteOperation, BulkWriteResult } from "mongodb";
import { z, ZodObject } from "zod";
import { logger } from "./logger.util";
import { getCurrentDateTimeinJSDate } from "./date-time.util";

/*
--- Custom Zod ObjectId Type ---
This is a reusable Zod schema for MongoDB's ObjectId.
*/
export const zodObjectId = z.custom<ObjectId | string>((val) => {
  if (typeof val === 'string') return ObjectId.isValid(val);
  if (val instanceof ObjectId) return true;
  return false;
},
  {
    message: "Invalid ObjectId",
  }
);

/**
 * Model class to mimic mongoose's mongoose.model() functionality
 */
export class Model {
  protected readonly collection: Collection<Document>;
  protected readonly schema: ZodObject<any>;

  constructor(collection: Collection<Document>, schema: ZodObject<any>) {
    this.collection = collection;
    this.schema = schema;
  }

  /**
   * Inserts a new document into the collection after validating it with the Zod schema.
   * Automatically adds `_id`, `created_at`, and `updated_at` timestamps.
   *
   * @param data The raw data for the document to be created.
   *
   * @returns The `_id` of the newly inserted document.
   */
  async create(data: unknown): Promise<ObjectId> {
    try {
      // Validate the incoming data against the schema
      const validatedData: Document = this.schema.parse(data) as Document;

      // Insert the document into the MongoDB collection
      const result = await this.collection.insertOne(validatedData);

      logger.info(`Document inserted with _id: ${result.insertedId}`);

      return result.insertedId;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during creation:", error.errors);
        throw new Error(`Invalid data for creation: ${error.message}`);
      }
      logger.error("Database error during creation:", error);
      throw error;
    }
  }

  /**
   * Inserts multiple documents into the collection after validating each with the Zod schema.
   *
   * @param data An array of raw data objects for the documents to be created.
   *
   * @returns The result of the bulk insert operation, including inserted IDs.
   */
  async bulkCreate(data: unknown[]): Promise<BulkWriteResult> {
    try {
      if (!Array.isArray(data)) {
        throw new Error("Bulk create data must be an array.");
      }

      const operations: AnyBulkWriteOperation<Document>[] = [];
      const validatedDocuments: Document[] = []; // This array is not directly used for bulkWrite, but kept for clarity if needed elsewhere

      // Validate each document and prepare insert operations
      for (const item of data) {
        try {
          const validatedItem: Document = this.schema.parse(item) as Document;
          validatedDocuments.push(validatedItem);
          operations.push({
            insertOne: {
              document: validatedItem,
            } as InsertOneModel<Document>
          });
        } catch (validationError) {
          if (validationError instanceof z.ZodError) {
            logger.error("Validation error during bulk creation for an item:", validationError.errors);
            // You might choose to throw immediately or collect all errors
            throw new Error(`Invalid data for bulk creation: ${validationError.message}`);
          }
          throw validationError; // Re-throw other types of errors
        }
      }

      // Perform the bulk insert operation
      const result = await this.collection.bulkWrite(operations as AnyBulkWriteOperation<Document>[], { ordered: false }); // ordered: false for better performance if order doesn't matter

      logger.info(`Bulk insert completed. Inserted count: ${result.insertedCount}`);

      // MongoDB's bulkWrite result might not directly return InsertManyResult,
      // but it will have similar properties for inserted documents.
      // We'll cast it to match the expected return type for clarity.
      return result;

    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during bulk creation:", error.errors);
        throw new Error(`Invalid data for bulk creation: ${error.message}`);
      }
      logger.error("Database error during bulk creation:", error);
      throw error;
    }
  }

  /**
   * Finds a single document by its `_id`.
   *
   * @param id The string representation of the document's ObjectId.
   *
   * @returns The found document, or null if not found.
   */
  async findById(id: string): Promise<Document | null> {
    try {
      // Validate the provided ID using the custom ObjectId Zod schema
      const validatedId = zodObjectId.parse(id);
      const objectId = typeof validatedId === 'string' ? new ObjectId(validatedId) : validatedId;

      // Find the document by _id
      const document = await this.collection.findOne({ _id: objectId } as Filter<Document>);
      return document;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error for ID in findById:", error.errors);
        throw new Error(`Invalid ID format: ${error.message}`);
      }
      logger.error("Database error in findById:", error);
      throw error;
    }
  }

  /**
   * Updates a document by its `_id` with partial data.
   * Automatically updates the `updated_at` timestamp.
   *
   * @param id The string representation of the document's ObjectId.
   *
   * @param updates A partial object containing the fields to update.
   */
  async updateById(id: string, updates: Partial<Document>): Promise<void> {
    try {
      // Validate the ID
      const validatedId = zodObjectId.parse(id);
      const objectId = typeof validatedId === 'string' ? new ObjectId(validatedId) : validatedId;

      // Validate the updates against a partial version of the schema
      // This allows updating only specific fields while still enforcing their types.
      const partialSchema = z.object(this.schema.shape).partial() as ZodObject<any>;
      const validatedUpdates = partialSchema.parse(updates);

      // Construct the update operation, ensuring updated_at is always updated
      const updateFilter: UpdateFilter<Document> = {
        $set: {
          ...validatedUpdates,
          updated_at: getCurrentDateTimeinJSDate(),
        } as Partial<Document>, // Cast to Partial<TSchema> for type compatibility with $set
      };

      // Perform the update operation
      const result = await this.collection.updateOne({ _id: objectId } as Filter<Document>, updateFilter);
      if (result.matchedCount === 0) {
        logger.warn(`No document found with _id: ${id} for update.`);
      } else {
        logger.info(`Document with _id: ${id} updated.`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during update:", error.errors);
        throw new Error(`Invalid update data: ${error.message}`);
      }
      logger.error("Database error during update:", error);
      throw error;
    }
  }

  /**
   * Deletes a document by its `_id`.
   *
   * @param id The string representation of the document's ObjectId.
   */
  async deleteById(id: string): Promise<void> {
    try {
      // Validate the ID
      const validatedId = zodObjectId.parse(id);
      const objectId = typeof validatedId === 'string' ? new ObjectId(validatedId) : validatedId;

      // Perform the delete operation
      const result = await this.collection.deleteOne({ _id: objectId } as Filter<Document>);
      if (result.deletedCount === 0) {
        logger.warn(`No document found with _id: ${id} for deletion.`);
      } else {
        logger.info(`Document with _id: ${id} deleted.`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error for ID in deleteById:", error.errors);
        throw new Error(`Invalid ID format: ${error.message}`);
      }
      logger.error("Database error in deleteById:", error);
      throw error;
    }
  }

  /**
   * Finds documents based on a given filter.
   *
   * @param filter The filter object to query documents.
   *
   * @returns An array of found documents.
   */
  async find(filter: Filter<Document> = {}): Promise<Document[]> {
    try {
      // No need to validate the filter with Zod directly unless you have specific filter schema
      // MongoDB driver handles typical query operators.
      return await this.collection.find(filter).toArray();
    } catch (error) {
      logger.error("Database error in find:", error);
      throw error;
    }
  }

  /**
   * Finds a single document based on a given filter.
   *
   * @param filter The filter object to query for a single document.
   *
   * @returns The found document, or null if not found.
   */
  async findOne(filter: Filter<Document>): Promise<Document | null> {
    try {
      // No need to validate the filter with Zod directly unless you have specific filter schema
      return await this.collection.findOne(filter);
    } catch (error) {
      logger.error("Database error in findOne:", error);
      throw error;
    }
  }

  /**
   * Updates a single document based on a given filter with a MongoDB update filter.
   * This method is flexible and allows any valid MongoDB update operators (e.g., $set, $inc, $push).
   * It automatically adds/updates `updated_at` to the $set operator (if $set is used).
   *
   * @param filter The filter object to specify which single document to update.
   * @param updateFilter The MongoDB update filter object (e.g., { $set: { name: "New Name" }, $inc: { age: 1 } }).
   * @param options Optional MongoDB update options.
   *
   * @returns The result of the update operation.
   */
  async updateOne(filter: Filter<Document>, updateFilter: UpdateFilter<Document>, options?: UpdateOptions): Promise<UpdateResult> {
    try {
      // Create a mutable copy to ensure updated_at is applied
      const finalUpdateFilter: UpdateFilter<Document> = { ...updateFilter };

      // Ensure $set exists and add/update `updated_at`
      if (!finalUpdateFilter.$set) {
        finalUpdateFilter.$set = {};
      }
      (finalUpdateFilter.$set as Document).updated_at = getCurrentDateTimeinJSDate();

      // --- Zod Validation for $set fields (optional but good practice) ---
      // If you want to validate only the fields within the $set operator against your schema.
      // This assumes your schema defines the top-level document fields.
      if (finalUpdateFilter.$set) {
        try {
          const partialSchema = z.object(this.schema.shape).partial() as ZodObject<any>;
          // Only validate the direct fields being set, not operators within the $set value.
          // For example, if $set contains {$set: { 'address.street': 'Main' }},
          // we are validating 'address.street' as a string if 'address' is an object in schema.
          const fieldsToValidate = Object.fromEntries(
            Object.entries(finalUpdateFilter.$set).filter(([key]) => !key.startsWith('$'))
          );
          partialSchema.parse(fieldsToValidate);
        } catch (zodError) {
          if (zodError instanceof z.ZodError) {
            logger.error("Validation error for $set fields during updateOne:", zodError.errors);
            throw new Error(`Invalid data in $set operator for updateOne: ${zodError.message}`);
          }
          throw zodError; // Re-throw other errors
        }
      }
      // --- End Zod Validation for $set fields ---

      // Perform the updateOne operation
      const result = await this.collection.updateOne(filter, finalUpdateFilter, options);

      if (result.matchedCount === 0) {
        logger.warn(`No document matched the filter for updateOne.`);
      } else {
        logger.info(`Document matched: ${result.matchedCount}, modified: ${result.modifiedCount} by updateOne.`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during updateOne:", error.errors);
        throw new Error(`Invalid update data for updateOne: ${error.message}`);
      }
      logger.error("Database error during updateOne:", error);
      throw error;
    }
  }

  /**
   * Updates multiple documents based on a given filter with a MongoDB update filter.
   * This method is flexible and allows any valid MongoDB update operators (e.g., $set, $inc, $push).
   * It automatically adds/updates `updated_at` to the $set operator (if $set is used).
   *
   * @param filter The filter object to specify which documents to update.
   * @param updateFilter The MongoDB update filter object (e.g., { $set: { name: "New Name" }, $inc: { age: 1 } }).
   * @param options Optional MongoDB update options.
   *
   * @returns The result of the update operation.
   */
  async updateMany(filter: Filter<Document>, updateFilter: UpdateFilter<Document>, options?: UpdateOptions): Promise<UpdateResult> {
    try {
      // Create a mutable copy to ensure updated_at is applied
      const finalUpdateFilter: UpdateFilter<Document> = { ...updateFilter };

      // Ensure $set exists and add/update `updated_at`
      if (!finalUpdateFilter.$set) {
        finalUpdateFilter.$set = {};
      }
      (finalUpdateFilter.$set as Document).updated_at = getCurrentDateTimeinJSDate();

      // --- Zod Validation for $set fields (optional but good practice) ---
      // If you want to validate only the fields within the $set operator against your schema.
      // This assumes your schema defines the top-level document fields.
      if (finalUpdateFilter.$set) {
        try {
          const partialSchema = z.object(this.schema.shape).partial() as ZodObject<any>;
          // Only validate the direct fields being set, not operators within the $set value.
          const fieldsToValidate = Object.fromEntries(
            Object.entries(finalUpdateFilter.$set).filter(([key]) => !key.startsWith('$'))
          );
          partialSchema.parse(fieldsToValidate);
        } catch (zodError) {
          if (zodError instanceof z.ZodError) {
            logger.error("Validation error for $set fields during updateMany:", zodError.errors);
            throw new Error(`Invalid data in $set operator for updateMany: ${zodError.message}`);
          }
          throw zodError; // Re-throw other errors
        }
      }
      // --- End Zod Validation for $set fields ---

      // Perform the updateMany operation
      const result = await this.collection.updateMany(filter, finalUpdateFilter, options);

      if (result.matchedCount === 0) {
        logger.warn(`No documents matched the filter for updateMany.`);
      } else {
        logger.info(`Documents matched: ${result.matchedCount}, modified: ${result.modifiedCount} by updateMany.`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error("Validation error during updateMany:", error.errors);
        throw new Error(`Invalid update data for updateMany: ${error.message}`);
      }
      logger.error("Database error during updateMany:", error);
      throw error;
    }
  }
}
