import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EllipsisVertical, ShoppingBag } from "lucide-react";
import Link from "next/link";
import ModeToggle from "../mode-toggle";
import UserButton from "./user-button";

const Menu = () => {
  return (
    <>
      {/* ===== DESKTOP MENU ===== 🖥️ */}
      <nav className="hidden md:flex items-center gap-3">
        <ModeToggle />
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cart">
            <ShoppingBag />
          </Link>
        </Button>
        <UserButton />
      </nav>

      {/* ===== MOBILE (SHEET) MENU ===== 📱 */}
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Main navigation menu
            </SheetDescription>
            <div className="flex flex-col items-start gap-4 mt-6">
              <ModeToggle />
              <Button asChild>
                <Link href="/cart">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Cart
                </Link>
              </Button>
              <UserButton />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
};

export default Menu;
