"use server";

import { prisma } from "@/lib/prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { Product } from "@/types";

export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return data.map((p) => ({
    ...p,
    price: Number(p.price), // convert string to number
    rating: Number(p.rating), // convert string to number
    createdAt: p.createdAt.toISOString(), // convert Date to string
  }));
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
