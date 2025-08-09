export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  brand: string;
  description: string;
  price: number;
  rating: number;
  numReviews: number;
  stock: number;
  isFeatured: boolean;
  banner?: string | null;
  tags?: string[]; // optional, may be undefined
  createdAt: string;
  updatedAt?: string; // optional since DB doesn't have it
};
