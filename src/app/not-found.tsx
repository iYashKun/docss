import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
      <h1 className="text-2xl mb-4">Page not found</h1>
      <p className="mb-4">This page may have moved or no longer exists.</p>
      <Link href="/" className="underline underline-offset-4">
        Return to documentation
      </Link>
    </div>
  );
}
