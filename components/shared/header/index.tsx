import Link from "next/link";
import Menu from "./menu"; // We will use our new component here

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Link href="/" className="text-2xl font-bold">
        Logo
      </Link>
      <Menu /> {/* Render the new Menu component */}
    </header>
  );
};

export default Header;
