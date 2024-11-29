"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter()
  return (
    <div className="h-screen flex-col gap-10 w-screen flex items-center justify-center">
      <p className="font-bold text-xl">Landing Page</p>

      <Button onClick={() => router.push("/dashboard")}>
        Dashboard
      </Button>
    </div>
  );
}
