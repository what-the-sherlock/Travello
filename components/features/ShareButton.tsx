"use client";

import { Share2 } from "lucide-react";
import { toast } from "@/components/ui/Toast";

export function ShareButton({ title }: { title: string }) {
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
      return;
    }
    await navigator.clipboard.writeText(url);
    toast("Link copied");
  };
  return (
    <button
      type="button"
      onClick={share}
      aria-label={`Share ${title}`}
      className="flex size-11 items-center justify-center rounded-full bg-white/55 text-navy backdrop-blur-[10px] transition-transform duration-150 active:scale-[0.97]"
    >
      <Share2 size={20} strokeWidth={1.5} />
    </button>
  );
}
