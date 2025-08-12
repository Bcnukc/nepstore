import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

// Price validation reusable rule
const currency = z
  .number()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places (e.g., 49.99)"
  );

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
  tags: z.array(z.string()).optional(),

  // --- CHANGE THIS LINE ---
  updatedAt: z.string().optional(), // Add .optional() here
});

export const signInFormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(2, "Email must be at least 3 characters"),
  password: z.string().min(3, "Password must be at least 3 character"),
});

export const signUpFromSchema = z
  .object({
    name: z.string().min(3, "Name must be least 3 character"),
    email: z.string().min(3, "Email must be at least 3 characters"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z
      .string()
      .min(3, "Confirm password must be at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords donot match",
    path: ["confirmPassword"],
  });
