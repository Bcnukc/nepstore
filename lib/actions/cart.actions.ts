"use server";
import { CartItem } from "@/types";
import { cookies } from "next/headers";

import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "../prisma";
import { cartItemschema } from "../validator";
import { error } from "console";

export async function addItemToCart(data: CartItem) {
  try {
    //check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) {
      throw new Error("Cart session not found");
    }

    console.log({
      "Session Cart ID": sessionCartId,
    });

    //Get session aND user ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    //Get cart from database

    const cart = await getMyCart();

    //Parse and validae submitted item data

    const item = cartItemschema.parse(data);

    //ensure the product exists
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    // Debug everything
    console.log({
      "Session Cart ID": sessionCartId,
      "User ID": userId,
      "Item Requested": item,
      "Product Found": product,
      cart,
    });

    return {
      success: true,
      message: "Testing cart",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

//Get User cart from database

export async function getMyCart() {
  //check for session cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) {
    return undefined;
  }
  //Get session and user Id
  const session = await auth();
  const userId = session?.user?.id;

  //Get user cart from databases

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) {
    return undefined;
  }

  //convert Decimal values to strings for compatibility with AddToCart componet

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
