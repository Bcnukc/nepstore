import { z } from "zod";
import { insertProductSchema } from "@/lib/validator";

// Automatically create a 'Product' type from our Zod schema
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: string; // match your mapping output
  rating: number; // match your mapping output
  numReviews: number;
};
