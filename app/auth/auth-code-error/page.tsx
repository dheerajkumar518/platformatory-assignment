import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", textAlign: "center" }}>
      <h1>Authentication Error</h1>
      <p>
        There was a problem signing you in. The authentication code is invalid
        or expired.
      </p>
      <Link href="/auth/login">
        <button style={{ marginTop: 24, padding: "8px 16px" }}>
          Try Again
        </button>
      </Link>
    </div>
  );
}
