import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Authentication Error</h1>
      <p>
        There was a problem signing you in. The authentication code is invalid
        or expired.
      </p>
      <Link href="/auth/login">
        <Button className="mt-4 ">Try Again</Button>
      </Link>
    </div>
  );
}
