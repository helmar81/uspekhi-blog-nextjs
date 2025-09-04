"use client";

import Link from "next/link";
import { Suspense } from "react";

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h1 className="text-5xl font-bold font-headline mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-2xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="text-center text-muted-foreground py-20">Loading error page…</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
