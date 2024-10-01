import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Loader = ({ className }: { className?: string }) => {
  return (
    <Loader2
      className={cn(className, "animate-spin-fast text-muted-foreground")}
    />
  );
};
