import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-[70svh] items-center justify-center bg-paper bg-grain text-foreground">
      <Loader2 className="size-6 animate-spin text-signal" aria-label="Loading" />
    </main>
  );
}
