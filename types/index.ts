import {
  insertProductSchema,
  cartItemschema,
  inserCartSchema,
} from "@/lib/validator";
import { z } from "zod";
// Automatically create a 'Product' type from our Zod schema
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: string; // match your mapping output
  rating: number; // match your mapping output
  numReviews: number;
};
export type Cart = z.infer<typeof inserCartSchema>;
export type CartItem = z.infer<typeof cartItemschema>;
