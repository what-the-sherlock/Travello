import { cn } from "@/lib/utils";

/** Travelo eyebrow: "— · label · —" with a hairline and a tiny rotated dot on each side. */
export function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-[18px] text-label tracking-wide lowercase",
        light ? "text-white" : "text-navy",
      )}
    >
      <Flourish />
      <span>{children}</span>
      <Flourish flip />
    </p>
  );
}

function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <span aria-hidden className={cn("flex items-center opacity-70", flip && "rotate-180")}>
      <span className="h-px w-[60px] bg-current" />
      <span className="size-[3px] rotate-[138deg] rounded-[1px] bg-current" />
    </span>
  );
}
