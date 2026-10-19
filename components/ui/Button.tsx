import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark";

const styles: Record<Variant, { pill: string; arrow: string }> = {
  light: { pill: "bg-white text-navy", arrow: "bg-navy text-white" },
  dark: { pill: "bg-navy text-white", arrow: "bg-white text-navy" },
};

/**
 * Travelo primary button: pill with a round arrow badge on the right.
 * On hover the label rolls up (a second copy slides in from below) and the arrow turns 45°.
 */
export function ButtonLink({
  variant = "light",
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "children"> & { variant?: Variant; children: string }) {
  const s = styles[variant];
  return (
    <Link
      className={cn(
        "group inline-flex h-[53px] items-center gap-4 rounded-full py-1 pr-1 pl-6 text-[17px] shadow-sm",
        "transition-transform duration-150 ease-out active:scale-[0.97]",
        s.pill,
        className,
      )}
      {...props}
    >
      <span className="relative block h-[1.5em] overflow-hidden">
        <span className="block transition-transform duration-450 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 translate-y-full transition-transform duration-450 ease-out group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span className={cn("flex size-[45px] items-center justify-center rounded-full", s.arrow)}>
        <ArrowUpRight
          size={20}
          strokeWidth={1.5}
          className="transition-transform duration-450 ease-out group-hover:rotate-45"
        />
      </span>
    </Link>
  );
}
