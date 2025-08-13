"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
const AddToCart = ({
  item,
}: {
  item: Omit<CartItem, "cartId" | "qty"> & { qty?: number };
}) => {
  const router = useRouter();

  const handleAddTocart = async () => {
    const res = await addItemToCart({ ...item, qty: 1 });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(`${item.name} added to the cart`, {
      action: {
        label: "Go to cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddTocart}>
      <Plus className="mr-2" />
      Add to cart
    </Button>
  );
};

export default AddToCart;
