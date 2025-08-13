"use server";

import { CartItem } from "../types";

export async function addItemToCart(item: Omit<CartItem, "cardId">) {
  return {
    success: true,
    message: "Item added to the cart",
  };
}
