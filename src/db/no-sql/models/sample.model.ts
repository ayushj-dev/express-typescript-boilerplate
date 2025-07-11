import { z } from "zod";
import { zodObjectId } from "@/utils/mongo.util";
import { mongoClient } from "../mongo";
import { Model } from "@/utils/mongo.util";
import { getCurrentDateTimeinJSDate } from "@/utils/date-time.util";

export const sampleSchema = z.object({
  id: zodObjectId.optional(),
  sample_text: z.string(),
  created_at: z.date().default(() => getCurrentDateTimeinJSDate()),
  updated_at: z.date().default(() => getCurrentDateTimeinJSDate()),
});

export type SampleSchema = z.infer<typeof sampleSchema>;

const db = mongoClient.db("sample");
const collection = db.collection("sample");

export const SampleModel = new Model(collection, sampleSchema);
