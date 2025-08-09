import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
