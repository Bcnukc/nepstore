"use server";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { prisma } from "../prisma";
import { cartItemschema, inserCartSchema } from "../validator";
import { revalidatePath } from "next/cache";

const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(0.15 * itemsPrice), //
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

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

    if (!cart) {
      //Create new cart Object
      const newCart = inserCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      //Add to prisma
      await prisma.cart.create({
        data: newCart,
      });

      //Revalidate product page

      revalidatePath(`/product/${product.slug}`);

      return { success: true, message: "Item added to cart successfully" };
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
