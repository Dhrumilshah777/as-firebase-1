"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect user to homepage after 0ms (immediate)
    router.replace("/");
  }, [router]);

  return null; // nothing is rendered because user is redirected
}
