"use client";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} Logo`}
        width={48}
        height={48}
        priority
      />

      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p className="text-destructive mb-4">
        Could not find the requested page.
      </p>
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
