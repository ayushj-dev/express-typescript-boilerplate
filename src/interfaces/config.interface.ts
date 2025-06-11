import { z } from "zod";
import { ConfigSchema } from "@/schemas/config.schema";

type TConfig = z.infer<typeof ConfigSchema>;

export interface Config extends TConfig { }
